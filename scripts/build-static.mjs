import { cp, copyFile, mkdir, readdir, rm } from "node:fs/promises";

const rootDir = new URL("../", import.meta.url);
const outputDir = new URL("../dist/", import.meta.url);
const generatedAssetsDir = new URL("../assets/generated/", import.meta.url);
const staticAssetsDir = new URL("../assets/static/", import.meta.url);
const vendorAssetsDir = new URL("../assets/vendor/", import.meta.url);

// Every page is a root-level .html file — auto-discover them so new service pages
// (hausmeisterservice.html, …) ship without editing this list.
const rootEntries = await readdir(rootDir);
const htmlPages = rootEntries.filter((name) => name.endsWith(".html"));
const files = [
  ...htmlPages,
  "styles.css",
  "script.js",
  "robots.txt",
  "_headers",
  "_redirects"
];

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

for (const file of files) {
  await copyFile(new URL(`../${file}`, import.meta.url), new URL(file, outputDir));
}

await cp(generatedAssetsDir, new URL("assets/generated/", outputDir), {
  recursive: true,
  filter: (source) => !source.endsWith("/manifest.json")
});

await cp(staticAssetsDir, new URL("assets/static/", outputDir), {
  recursive: true
});

await cp(vendorAssetsDir, new URL("assets/vendor/", outputDir), {
  recursive: true
});
