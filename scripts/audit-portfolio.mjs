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

for (const required of [
  "src/app/projects/wwm-build-lab/page.tsx",
  "src/app/projects/thien-kim/page.tsx",
]) {
  if (!existsSync(join(root, required))) errors.push(`Required project case study missing: ${required}`);
}

const projects = read("src/data/independent-projects.ts");
if (!projects.includes("https://www.tiktok.com/@tieu.thienkim")) {
  errors.push("Thiên Kim TikTok output link missing");
}
if (!projects.includes('/projects/wwm-build-lab') || !projects.includes('/projects/thien-kim')) {
  errors.push("Mini case-study links missing from independent project data");
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
console.log("- user-facing marketing positioning absent from src");
console.log("- WWM Build Lab and Thiên Kim case-study routes present");
console.log("- Thiên Kim TikTok output link present");
console.log("- stale UI8 / placeholder case-study tokens absent from src");
