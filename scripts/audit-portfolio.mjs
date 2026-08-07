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
  if (srcLower.includes(forbidden)) errors.push(`Forbidden stale portfolio token found: ${forbidden}`);
}

if (srcLower.includes("marketing")) {
  errors.push("User-facing src still contains marketing positioning");
}

if (existsSync(join(root, "src/app/work/[slug]/page.tsx"))) {
  errors.push("Placeholder case-study route still exists");
}

const requiredCases = [
  "src/app/projects/wwm-build-lab/page.tsx",
  "src/app/projects/thien-kim/page.tsx",
  "src/app/projects/co-giao-ai/page.tsx",
  "src/app/projects/claude-ui-lab/page.tsx",
  "src/app/projects/wwm-homestead/page.tsx",
];
for (const required of requiredCases) {
  if (!existsSync(join(root, required))) errors.push(`Required project case study missing: ${required}`);
}

const projects = read("src/data/independent-projects.ts");
for (const requiredUrl of [
  "https://www.tiktok.com/@tieu.thienkim",
  "https://nexus-react.pages.dev/",
  "https://wwm-homestead.pages.dev",
]) {
  if (!projects.includes(requiredUrl)) errors.push(`Required independent-project output link missing: ${requiredUrl}`);
}

for (const requiredCaseHref of [
  "/projects/wwm-build-lab",
  "/projects/thien-kim",
  "/projects/co-giao-ai",
  "/projects/claude-ui-lab",
  "/projects/wwm-homestead",
]) {
  if (!projects.includes(requiredCaseHref)) errors.push(`Case-study link missing from project data: ${requiredCaseHref}`);
}

const claudeCase = read("src/app/projects/claude-ui-lab/page.tsx");
if (!claudeCase.includes("https://helixkit.pages.dev/")) errors.push("Helix Kit live link missing from Claude UI Lab case study");
if (!claudeCase.includes("/projects/nexus-react.png") || !claudeCase.includes("/projects/helix-kit.png")) {
  errors.push("Claude UI Lab must show both live-site screenshots");
}

const thienKimCase = read("src/app/projects/thien-kim/page.tsx");
for (const frame of [
  "/projects/thien-kim-green.jpg",
  "/projects/thien-kim-tuscany.jpg",
  "/projects/thien-kim-cover.svg",
]) {
  if (!thienKimCase.includes(frame)) errors.push(`Thiên Kim case study missing video frame: ${frame}`);
}

const wwmCase = read("src/app/projects/wwm-build-lab/page.tsx");
if (!wwmCase.includes("/projects/wwm-build-lab.png")) errors.push("WWM Build Lab case study must show the live-product screenshot");

const homesteadCase = read("src/app/projects/wwm-homestead/page.tsx");
if (!homesteadCase.includes("/projects/wwm-homestead.png")) errors.push("WWM Homestead case study must show the live-product screenshot");

const coGiaoCase = read("src/app/projects/co-giao-ai/page.tsx");
if (!coGiaoCase.includes("/projects/co-giao-ai.svg")) errors.push("Cô Giáo AI case study must show its system map");

const projectThumbs = [...projects.matchAll(/thumbnail:\s*"([^"]+)"/g)].map((m) => m[1]);
if (projectThumbs.length !== 5) {
  errors.push(`Expected 5 independent-project thumbnails, found ${projectThumbs.length}`);
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

for (const visualAsset of [
  "/projects/thien-kim-green.jpg",
  "/projects/thien-kim-tuscany.jpg",
  "/projects/thien-kim-cover.svg",
  "/projects/nexus-react.png",
  "/projects/helix-kit.png",
  "/projects/co-giao-ai.svg",
  "/projects/wwm-build-lab.png",
  "/projects/wwm-homestead.png",
]) {
  const file = join(root, "public", visualAsset.slice(1));
  if (!existsSync(file)) errors.push(`Case-study visual asset missing: ${visualAsset}`);
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
console.log(`- ${requiredCases.length} detailed project case studies present`);
console.log("- all independent project case studies contain visual evidence");
console.log("- Thiên Kim shows three distinct clean AI-video frames");
console.log("- user-facing marketing positioning absent from src");
console.log("- stale UI8 / placeholder case-study tokens absent from src");
