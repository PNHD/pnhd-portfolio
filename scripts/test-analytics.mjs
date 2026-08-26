import { spawnSync } from "node:child_process";
import {
  existsSync,
  readFileSync,
  statSync,
} from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outPath = join(root, "out");
const posthogVersion = JSON.parse(
  readFileSync(join(root, "node_modules", "posthog-js", "package.json"), "utf8"),
).version;
const requests = [];
const browserDiagnostics = [];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function parseBody(raw, contentType) {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {}

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const form = new URLSearchParams(raw);
    const data = form.get("data");
    if (!data) return Object.fromEntries(form);
    for (const candidate of [data, Buffer.from(data, "base64").toString("utf8")]) {
      try {
        return JSON.parse(candidate);
      } catch {}
    }
  }
  return raw;
}

function eventObjects() {
  const result = [];
  const visit = (value) => {
    if (!value) return;
    if (typeof value === "string") {
      try {
        visit(JSON.parse(value));
      } catch {}
      return;
    }
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }
    if (typeof value !== "object") return;
    if (typeof value.event === "string") result.push(value);
    if (Array.isArray(value.batch)) visit(value.batch);
  };
  requests.forEach((request) => visit(request.payload));
  return result;
}

function cors(response, origin) {
  response.setHeader("Access-Control-Allow-Origin", origin || "*");
  response.setHeader("Vary", "Origin");
  response.setHeader("Access-Control-Allow-Credentials", "true");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
}

const sink = createServer((request, response) => {
  const chunks = [];
  request.on("data", (chunk) => chunks.push(chunk));
  request.on("end", () => {
    const raw = Buffer.concat(chunks).toString("utf8");
    const contentType = request.headers["content-type"] || "";
    requests.push({
      method: request.method,
      path: request.url,
      payload: parseBody(raw, contentType),
    });

    cors(response, request.headers.origin);
    if (request.method === "OPTIONS") {
      response.writeHead(204);
      response.end();
      return;
    }

    const escapedVersion = posthogVersion.replace(/\./g, "\\.");
    const extension = request.url?.match(
      new RegExp(
        `^/static/${escapedVersion}/(web-vitals|exception-autocapture|dead-clicks-autocapture)\\.js$`,
      ),
    );
    if (extension) {
      response.setHeader("Content-Type", "application/javascript");
      response.end(
        readFileSync(join(root, "node_modules", "posthog-js", "dist", `${extension[1]}.js`)),
      );
      return;
    }

    if (request.url?.startsWith("/array/") && request.url.endsWith("/config.js")) {
      response.setHeader("Content-Type", "application/javascript");
      response.end("window.__PosthogExtensions__ = window.__PosthogExtensions__ || {};\n");
      return;
    }

    if (
      request.url?.startsWith("/flags") ||
      request.url?.startsWith("/decide") ||
      (request.url?.startsWith("/array/") && request.url.endsWith("/config"))
    ) {
      response.setHeader("Content-Type", "application/json");
      response.end(
        JSON.stringify({
          config: { enable_collect_everything: false, session_recording: false },
          featureFlags: {},
          featureFlagPayloads: {},
          errorsWhileComputingFlags: false,
          sessionRecording: false,
        }),
      );
      return;
    }

    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify({ status: 1 }));
  });
});

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

function resolveStaticFile(pathname) {
  const relative = decodeURIComponent(pathname) === "/"
    ? "index.html"
    : decodeURIComponent(pathname).replace(/^\/+/, "");
  for (const candidate of [relative, `${relative}.html`, join(relative, "index.html")]) {
    const filePath = resolve(outPath, normalize(candidate));
    if (!filePath.startsWith(outPath) || !existsSync(filePath)) continue;
    if (statSync(filePath).isFile()) return filePath;
  }
  return null;
}

const staticServer = createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const filePath = resolveStaticFile(url.pathname);
  if (!filePath) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }
  response.writeHead(200, {
    "Content-Type": mimeTypes[extname(filePath).toLowerCase()] || "application/octet-stream",
    "Cache-Control": "no-store",
  });
  response.end(readFileSync(filePath));
});

function listen(server) {
  return new Promise((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => resolveListen(server.address().port));
  });
}

function close(server) {
  return new Promise((resolveClose) => server.close(resolveClose));
}

function chromeExecutable() {
  const candidates = [
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ];
  return candidates.find((candidate) => candidate && existsSync(candidate));
}

async function waitForEventCount(eventName, count) {
  const deadline = Date.now() + 5000;
  while (Date.now() < deadline) {
    if (eventObjects().filter((event) => event.event === eventName).length >= count) return;
    await new Promise((resolveWait) => setTimeout(resolveWait, 50));
  }
  throw new Error(
    `Timed out waiting for ${count} ${eventName} event(s)\n` +
      `Sink requests: ${JSON.stringify(requests.map(({ method, path }) => ({ method, path })))}\n` +
      `Browser diagnostics: ${JSON.stringify(browserDiagnostics)}`,
  );
}

let browser;
try {
  const sinkPort = await listen(sink);
  const buildCommand = process.platform === "win32"
    ? [process.env.ComSpec || "cmd.exe", ["/d", "/s", "/c", "npm.cmd run build"]]
    : ["npm", ["run", "build"]];
  const build = spawnSync(buildCommand[0], buildCommand[1], {
    cwd: root,
    env: {
      ...process.env,
      NEXT_PUBLIC_POSTHOG_KEY: "phc_local_analytics_regression",
      NEXT_PUBLIC_POSTHOG_HOST: `http://127.0.0.1:${sinkPort}`,
      NEXT_PUBLIC_POSTHOG_ENABLED: "true",
      NEXT_PUBLIC_POSTHOG_TEST_MODE: "true",
    },
    stdio: "inherit",
  });
  if (build.error) throw build.error;
  assert(build.status === 0, `Analytics test build failed with exit ${build.status}`);

  const sitePort = await listen(staticServer);
  const site = `http://127.0.0.1:${sitePort}`;
  const executablePath = chromeExecutable();
  assert(executablePath, "Chrome/Chromium not found; set PLAYWRIGHT_CHROMIUM_EXECUTABLE");
  browser = await chromium.launch({
    executablePath,
    headless: true,
    args: ["--disable-blink-features=AutomationControlled"],
  });

  const browserContextOptions = {
    viewport: { width: 1280, height: 800 },
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
      "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
  };
  const context = await browser.newContext(browserContextOptions);
  const page = await context.newPage();
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning" || message.text().includes("PostHog")) {
      browserDiagnostics.push({ type: message.type(), text: message.text() });
    }
  });
  page.on("requestfailed", (request) => {
    browserDiagnostics.push({
      type: "requestfailed",
      url: request.url(),
      error: request.failure()?.errorText,
    });
  });
  const taggedUrl =
    `${site}/?utm_source=cv&utm_medium=resume&utm_campaign=analytics-regression` +
    "&utm_content=initial&private_probe=LEAK_PRIVATE_QUERY#drop-me";
  await page.goto(taggedUrl, { waitUntil: "domcontentloaded" });
  await waitForEventCount("$pageview", 1);
  await page.waitForTimeout(300);

  let pageviews = eventObjects().filter((event) => event.event === "$pageview");
  assert(pageviews.length === 1, `Expected one initial pageview, observed ${pageviews.length}`);
  const initial = pageviews[0].properties;
  assert(initial.utm_source === "cv", "Initial pageview lost utm_source");
  assert(initial.utm_medium === "resume", "Initial pageview lost utm_medium");
  assert(initial.utm_campaign === "analytics-regression", "Initial pageview lost utm_campaign");
  assert(initial.utm_content === "initial", "Initial pageview lost utm_content");
  assert(initial.$current_url === `${site}/`, `$current_url was not sanitized: ${initial.$current_url}`);

  await page.evaluate(() => {
    window.__analyticsNavigationProbe = true;
  });
  await page.locator('a[href="/work"]').first().click();
  await page.waitForURL(`${site}/work`);
  assert(
    await page.evaluate(() => window.__analyticsNavigationProbe === true),
    "The navigation test performed a document reload instead of an App Router transition",
  );
  await waitForEventCount("$pageview", 2);
  await page.waitForTimeout(300);
  pageviews = eventObjects().filter((event) => event.event === "$pageview");
  assert(pageviews.length === 2, `Expected one client-navigation pageview, observed ${pageviews.length - 1}`);
  assert(pageviews[1].properties.$current_url === `${site}/work`, "Client navigation URL was not clean");
  assert(pageviews[1].properties.utm_campaign === "analytics-regression", "Client navigation lost UTM attribution");
  assert(
    pageviews.every((event) => event.properties.$is_identified === false),
    "A pageview was marked as identified",
  );
  await context.close();

  const interactionStart = eventObjects().length;
  const interactionContext = await browser.newContext(browserContextOptions);
  const interactionPage = await interactionContext.newPage();
  await interactionPage.goto(`${site}/`, { waitUntil: "domcontentloaded" });
  await waitForEventCount("$pageview", 3);
  await interactionPage.waitForTimeout(900);
  await interactionPage.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await waitForEventCount("scroll_depth", 2);
  await interactionPage.locator('a[data-analytics-event="work_opened"]').first().click();
  await waitForEventCount("work_opened", 1);
  await interactionContext.close();

  const interactionEvents = eventObjects().slice(interactionStart);
  const depths = interactionEvents
    .filter((event) => event.event === "scroll_depth")
    .map((event) => event.properties.depth)
    .sort();
  assert(depths.join(",") === "50,90", `Expected scroll depths 50,90; observed ${depths.join(",")}`);
  const workOpened = interactionEvents.find((event) => event.event === "work_opened");
  assert(workOpened?.properties.project_slug, "work_opened did not include project_slug");
  assert(workOpened?.properties.project_name, "work_opened did not include project_name");

  const events = eventObjects();
  assert(!events.some((event) => event.event === "$identify"), "$identify event was emitted");
  assert(!events.some((event) => event.event === "$snapshot"), "Session Replay snapshot was emitted");
  assert(!JSON.stringify(requests).includes("LEAK_PRIVATE_QUERY"), "Private query value leaked to PostHog");
  const source = readFileSync(join(root, "src", "lib", "analytics.ts"), "utf8");
  assert(!/\.identify\s*\(/.test(source), "Analytics source calls identify()");

  console.log("Analytics regression PASS");
  console.log("- exactly one initial pageview");
  console.log("- exactly one client-navigation pageview");
  console.log("- UTM properties preserved with clean $current_url values");
  console.log("- work_opened and scroll_depth interaction paths captured");
  console.log("- anonymous-only, no identify(), no replay snapshots, no private query leak");
} finally {
  if (browser) await browser.close().catch(() => {});
  await Promise.allSettled([close(sink), close(staticServer)]);
}
