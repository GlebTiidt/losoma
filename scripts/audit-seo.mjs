import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const ignoredDirectories = new Set([".git", "dist", "node_modules"]);

function collectHtmlFiles(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || ignoredDirectories.has(entry.name)) continue;
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) collectHtmlFiles(absolutePath, files);
    if (entry.isFile() && entry.name.endsWith(".html")) files.push(absolutePath);
  }
  return files;
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&nbsp;", " ")
    .replace(/<[^>]+>/g, "")
    .trim();
}

const errors = [];
const pages = [];

for (const file of collectHtmlFiles(root)) {
  const relative = path.relative(root, file);
  const html = fs.readFileSync(file, "utf8");
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const robots = html.match(/<meta name="robots" content="([^"]+)"/)?.[1] ?? "";
  const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
  const schemas = [];

  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      schemas.push(JSON.parse(match[1]));
    } catch (error) {
      errors.push(`${relative}: invalid JSON-LD (${error.message})`);
    }
  }

  if (!canonical?.startsWith("https://losoma.de/")) {
    errors.push(`${relative}: missing or non-production canonical`);
  }

  if (ogImage && !ogImage.startsWith("https://losoma.de/")) {
    errors.push(`${relative}: og:image must be absolute`);
  }

  const graphNodes = schemas.flatMap((schema) => schema["@graph"] ?? [schema]);
  const isHome = canonical === "https://losoma.de/";
  if (!isHome && !graphNodes.some((node) => node["@type"] === "BreadcrumbList")) {
    errors.push(`${relative}: missing BreadcrumbList`);
  }

  const htmlQuestions = Array.from(
    html.matchAll(/<button class="faq-item_trigger"[\s\S]*?<span>(.*?)<\/span>[\s\S]*?<div class="faq-item_panel"[\s\S]*?<p>(.*?)<\/p>/g),
    (match) => ({ name: decodeHtml(match[1]), text: decodeHtml(match[2]) }),
  );
  const faqNode = graphNodes.find((node) => node["@type"] === "FAQPage");
  const schemaQuestions = faqNode?.mainEntity ?? [];

  if (htmlQuestions.length !== schemaQuestions.length) {
    errors.push(`${relative}: FAQ count differs (HTML ${htmlQuestions.length}, schema ${schemaQuestions.length})`);
  } else {
    htmlQuestions.forEach((question, index) => {
      const schemaQuestion = schemaQuestions[index];
      if (question.name !== schemaQuestion?.name || question.text !== schemaQuestion?.acceptedAnswer?.text) {
        errors.push(`${relative}: FAQ item ${index + 1} differs between HTML and schema`);
      }
    });
  }

  if (/index\s*,\s*follow/i.test(robots) && canonical) {
    pages.push({ relative, canonical });
  }
}

const canonicalUrls = pages.map((page) => page.canonical);
const duplicateCanonicals = canonicalUrls.filter((url, index) => canonicalUrls.indexOf(url) !== index);
if (duplicateCanonicals.length) {
  errors.push(`duplicate canonicals: ${[...new Set(duplicateCanonicals)].join(", ")}`);
}

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const sitemapUrls = Array.from(sitemap.matchAll(/<loc>(.*?)<\/loc>/g), (match) => match[1]);
for (const url of canonicalUrls) {
  if (!sitemapUrls.includes(url)) errors.push(`sitemap.xml: missing ${url}`);
}
for (const url of sitemapUrls) {
  if (!canonicalUrls.includes(url)) errors.push(`sitemap.xml: URL has no indexable canonical page: ${url}`);
}

const robotsTxt = fs.readFileSync(path.join(root, "robots.txt"), "utf8");
if (!/^User-agent:\s*\*/mi.test(robotsTxt) || !/^Sitemap:\s*https:\/\/losoma\.de\/sitemap\.xml$/mi.test(robotsTxt)) {
  errors.push("robots.txt: expected global user-agent and production sitemap directive");
}

if (errors.length) {
  console.error(`SEO audit failed (${errors.length}):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`SEO audit passed: ${pages.length} indexable pages, ${sitemapUrls.length} sitemap URLs.`);
