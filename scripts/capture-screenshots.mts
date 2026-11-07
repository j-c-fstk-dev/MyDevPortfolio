/**
 * Captures a screenshot of every project that has a live site and saves it to
 * public/projects/<slug>.jpg, then records which ones exist in
 * src/data/screenshots.json so the site shows them.
 *
 *   npm run screenshots              # all projects with a live URL
 *   npm run screenshots -- bass-forest beregen   # only these slugs
 *
 * Needs Playwright's Chromium once: npx playwright install chromium
 */
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright";
import { getContent } from "../src/data/portfolio.ts";

const root = join(import.meta.dirname, "..");
const outDir = join(root, "public", "projects");
const manifest = join(root, "src", "data", "screenshots.json");

const only = process.argv.slice(2);
const targets = getContent("en").projects.filter(
  (p) => p.live && (only.length === 0 || only.includes(p.slug))
);

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });

for (const project of targets) {
  process.stdout.write(`${project.slug.padEnd(24)} ${project.live} ... `);
  try {
    await page.goto(project.live!, { waitUntil: "networkidle", timeout: 45_000 });
    await page.waitForTimeout(1500); // let entrance animations settle
    await page.screenshot({ path: join(outDir, `${project.slug}.jpg`), type: "jpeg", quality: 82 });
    console.log("ok");
  } catch (error) {
    console.log(`failed (${(error as Error).message.split("\n")[0]})`);
  }
}
await browser.close();

// The manifest lists every screenshot on disk, including older captures.
const files = (await readdir(outDir)).filter((f) => f.endsWith(".jpg")).map((f) => f.replace(/\.jpg$/, ""));
await writeFile(manifest, JSON.stringify(files.sort(), null, 2) + "\n");
console.log(`\n${files.length} screenshot(s) listed in src/data/screenshots.json`);
