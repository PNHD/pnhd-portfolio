import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const dataFiles = [
  "src/data/portfolio-refresh.ts",
  "src/data/portfolio-page1-extra.ts",
  "src/data/portfolio-legacy-extra.ts",
];

const read = (path) => readFileSync(join(root, path), "utf8");
const hrefPattern = /href:\s*"(https:\/\/dribbble\.com\/shots\/[^"]+)"/g;
const imagePattern = /image:\s*"(https:\/\/cdn\.dribbble\.com\/[^"]+)"/g;

const hrefs = dataFiles.flatMap((path) => [...read(path).matchAll(hrefPattern)].map((m) => m[1]));
const images = dataFiles.flatMap((path) => [...read(path).matchAll(imagePattern)].map((m) => m[1]));
const uniqueHrefs = new Set(hrefs);
const uniqueImages = new Set(images);

const config = read("src/data/portfolio-refresh.ts");
const expectedMatch = config.match(/dribbbleShotCount:\s*(\d+)/);
const expected = expectedMatch ? Number(expectedMatch[1]) : NaN;

const errors = [];
if (!Number.isInteger(expected)) errors.push("Could not read portfolioEvidence.dribbbleShotCount");
if (hrefs.length !== expected) errors.push(`Expected ${expected} Dribbble shot links, found ${hrefs.length}`);
if (uniqueHrefs.size !== hrefs.length) errors.push(`Duplicate Dribbble shot links found: ${hrefs.length - uniqueHrefs.size}`);
if (images.length !== expected) errors.push(`Expected ${expected} Dribbble thumbnails, found ${images.length}`);
if (uniqueImages.size !== images.length) errors.push(`Duplicate Dribbble thumbnails found: ${images.length - uniqueImages.size}`);

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const srcFiles = walk(join(root, "src")).filter((path) => /\.(ts|tsx|css)$/.test(path));
const srcText = srcFiles.map((path) => readFileSync(path, "utf8")).join("\n");
const srcLower = srcText.toLowerCase();

for (const forbidden of [
  "ui8",
  "nova-ui-kit",
  "meditation-app",
  "analytics-dashboard",
  "3d-landing-page",
]) {
  if (srcLower.includes(forbidden)) errors.push(`Forbidden stale portfolio token found in src: ${forbidden}`);
}

if (srcLower.includes("marketing")) {
  errors.push("User-facing src still contains marketing positioning");
}

if (existsSync(join(root, "src/app/work/[slug]/page.tsx"))) {
  errors.push("Placeholder case-study route still exists");
}

const requiredCases = [
  ["src/app/projects/wwm-build-lab/page.tsx", "/projects/wwm-build-lab", "/projects/wwm-build-lab.png"],
  ["src/app/projects/thien-kim/page.tsx", "/projects/thien-kim", "/projects/thien-kim-cover.svg"],
  ["src/app/projects/wwm-homestead/page.tsx", "/projects/wwm-homestead", "/projects/wwm-homestead.png"],
];

for (const [path, , localMedia] of requiredCases) {
  if (!existsSync(join(root, path))) {
    errors.push(`Required project case study missing: ${path}`);
    continue;
  }
  if (!read(path).includes(localMedia)) {
    errors.push(`Case study does not use its local project media: ${path}`);
  }
}

const projects = read("src/data/independent-projects.ts");
if (!projects.includes("https://www.tiktok.com/@tieu.thienkim")) {
  errors.push("Thiên Kim TikTok output link missing");
}
for (const [, caseHref] of requiredCases) {
  if (!projects.includes(`caseHref: "${caseHref}"`)) {
    errors.push(`Independent project case-study link missing: ${caseHref}`);
  }
}

const projectThumbs = [...projects.matchAll(/thumbnail:\s*"([^"]+)"/g)].map((m) => m[1]);
if (projectThumbs.length !== 3) {
  errors.push(`Expected 3 independent-project thumbnails, found ${projectThumbs.length}`);
}
if (new Set(projectThumbs).size !== projectThumbs.length) {
  errors.push("Independent-project thumbnails must be unique");
}
for (const thumb of projectThumbs) {
  if (!thumb.startsWith("/")) {
    errors.push(`Independent-project thumbnail must be a local public asset: ${thumb}`);
    continue;
  }
  const file = join(root, "public", thumb.slice(1));
  if (!existsSync(file)) errors.push(`Independent-project thumbnail file missing: ${thumb}`);
}

const sitemap = read("src/app/sitemap.ts");
for (const [, caseHref] of requiredCases) {
  if (!sitemap.includes(caseHref)) errors.push(`Sitemap missing case-study route: ${caseHref}`);
}

const llmsPath = join(root, "public/llms.txt");
if (!existsSync(llmsPath)) {
  errors.push("public/llms.txt is missing");
} else {
  const llms = readFileSync(llmsPath, "utf8");
  const llmsLower = llms.toLowerCase();
  for (const stale of ["nova-ui-kit", "meditation-app", "analytics-dashboard", "3d-landing-page"]) {
    if (llmsLower.includes(stale)) errors.push(`Stale llms.txt token found: ${stale}`);
  }
  if (!llms.includes("# Dang Pham — Visual / Digital Designer")) {
    errors.push("llms.txt positioning is not aligned with the current portfolio");
  }
  for (const [, caseHref] of requiredCases) {
    if (!llms.includes(caseHref)) errors.push(`llms.txt missing case-study route: ${caseHref}`);
  }
}

if (errors.length) {
  console.error("Portfolio audit FAILED");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Portfolio audit PASS");
console.log(`- ${hrefs.length}/${expected} Dribbble shots mapped`);
console.log(`- ${uniqueHrefs.size} unique shot URLs`);
console.log(`- ${uniqueImages.size} unique Dribbble thumbnails`);
console.log(`- ${projectThumbs.length} independent projects have unique local thumbnails`);
console.log(`- ${requiredCases.length} full independent-project case-study routes present and media-backed`);
console.log("- sitemap and llms.txt include every case-study route");
console.log("- public agent metadata is aligned with current Visual / Digital positioning");
console.log("- user-facing marketing positioning absent from src");
console.log("- Thiên Kim TikTok output link present");
console.log("- stale placeholder case-study tokens absent from checked surfaces");
