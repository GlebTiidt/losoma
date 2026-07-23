import { cp, copyFile, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { transform } from "esbuild";

const rootDir = new URL("../", import.meta.url);
const outputDir = new URL("../dist/", import.meta.url);
const generatedAssetsDir = new URL("../assets/generated/", import.meta.url);
const staticAssetsDir = new URL("../assets/static/", import.meta.url);
const vendorAssetsDir = new URL("../assets/vendor/", import.meta.url);
const blogPagesDir = new URL("../blog/", import.meta.url);
const apiDir = new URL("api/", rootDir);
const isVercelBuild = process.env.LOSOMA_BUILD_TARGET === "vercel";

// Every page is a root-level .html file — auto-discover them so new service pages
// (hausmeisterservice.html, …) ship without editing this list.
const rootEntries = await readdir(rootDir);
const htmlPages = rootEntries.filter((name) => name.endsWith(".html"));
const files = [
  ...htmlPages,
  "robots.txt",
  "sitemap.xml",
  ...(!isVercelBuild ? [".htaccess"] : [])
];
const apiFiles = !isVercelBuild ? ["contact.php", "health.php"] : [];

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

for (const file of files) {
  await copyFile(new URL(`../${file}`, import.meta.url), new URL(file, outputDir));
}

for (const asset of [
  { name: "styles.css", loader: "css" },
  { name: "script.js", loader: "js" },
]) {
  const source = await readFile(new URL(`../${asset.name}`, import.meta.url), "utf8");
  const result = await transform(source, {
    loader: asset.loader,
    minify: true,
    legalComments: "none",
    target: "es2020",
  });

  await writeFile(new URL(asset.name, outputDir), result.code);
}

await mkdir(new URL("api/", outputDir), { recursive: true });

for (const file of apiFiles) {
  await copyFile(new URL(file, apiDir), new URL(`api/${file}`, outputDir));
}

// Blog routes keep their nested, SEO-friendly URLs (`/blog` and
// `/blog/<article-slug>`) instead of flattening article filenames at the root.
await cp(blogPagesDir, new URL("blog/", outputDir), {
  recursive: true
});

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
