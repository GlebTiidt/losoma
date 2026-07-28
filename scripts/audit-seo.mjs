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

const errors = [];
const pages = [];
const serviceCanonicals = new Set([
  "https://losoma.de/hausmeisterservice",
  "https://losoma.de/treppenhausreinigung",
  "https://losoma.de/gewerbliche-reinigung",
  "https://losoma.de/grundreinigung",
  "https://losoma.de/industriereinigung",
  "https://losoma.de/winterdienst",
  "https://losoma.de/garten-landschaftspflege",
  "https://losoma.de/fassaden-hoehenarbeiten",
  "https://losoma.de/solaranlagenreinigung",
]);

function hasType(node, expectedType) {
  const types = Array.isArray(node?.["@type"]) ? node["@type"] : [node?.["@type"]];
  return types.includes(expectedType);
}

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
  const breadcrumb = graphNodes.find((node) => hasType(node, "BreadcrumbList"));
  if (!isHome && !breadcrumb) {
    errors.push(`${relative}: missing BreadcrumbList`);
  }

  if (breadcrumb) {
    const items = breadcrumb.itemListElement ?? [];
    if (items.length < 2) errors.push(`${relative}: BreadcrumbList needs at least two items`);
    items.forEach((item, index) => {
      if (!hasType(item, "ListItem") || item.position !== index + 1 || !item.name || (!item.item && index < items.length - 1)) {
        errors.push(`${relative}: invalid BreadcrumbList item ${index + 1}`);
      }
    });
  }

  if (graphNodes.some((node) => hasType(node, "FAQPage"))) {
    errors.push(`${relative}: FAQPage is retired from Google Search and must not be emitted`);
  }

  if (isHome) {
    const organization = graphNodes.find((node) => hasType(node, "HomeAndConstructionBusiness"));
    const website = graphNodes.find((node) => hasType(node, "WebSite"));
    const webpage = graphNodes.find((node) => hasType(node, "WebPage"));
    if (!organization || !hasType(organization, "Organization")) {
      errors.push(`${relative}: homepage needs Organization + HomeAndConstructionBusiness`);
    } else {
      for (const field of ["name", "url", "logo", "image", "telephone", "email", "address", "areaServed", "contactPoint", "hasOfferCatalog", "sameAs"]) {
        if (!organization[field]) errors.push(`${relative}: organization missing ${field}`);
      }
      const socialProfiles = Array.isArray(organization.sameAs) ? organization.sameAs : [];
      for (const profile of [
        "https://www.linkedin.com/in/maxim-soga-575478264/",
        "https://www.instagram.com/losomagebaudeservice/",
      ]) {
        if (!socialProfiles.includes(profile)) errors.push(`${relative}: organization sameAs missing ${profile}`);
      }
    }
    if (!website) errors.push(`${relative}: homepage missing WebSite`);
    if (!webpage) errors.push(`${relative}: homepage missing WebPage`);
  }

  if (serviceCanonicals.has(canonical)) {
    const service = graphNodes.find((node) => hasType(node, "Service"));
    const webpage = graphNodes.find((node) => hasType(node, "WebPage"));
    if (!service) {
      errors.push(`${relative}: service page missing Service`);
    } else {
      for (const field of ["name", "serviceType", "description", "url", "provider", "areaServed", "image", "mainEntityOfPage"]) {
        if (!service[field]) errors.push(`${relative}: Service missing ${field}`);
      }
    }
    if (!webpage?.mainEntity?.["@id"]?.endsWith("#service")) {
      errors.push(`${relative}: WebPage mainEntity must reference its Service`);
    }
  }

  if (canonical === "https://losoma.de/blog") {
    if (!graphNodes.some((node) => hasType(node, "CollectionPage"))) errors.push(`${relative}: blog index missing CollectionPage`);
    if (!graphNodes.some((node) => hasType(node, "ItemList"))) errors.push(`${relative}: blog index missing ItemList`);
  }

  if (canonical === "https://losoma.de/blog/hausmeister-vs-externer-spezialist") {
    const article = graphNodes.find((node) => hasType(node, "BlogPosting"));
    if (!article) {
      errors.push(`${relative}: article page missing BlogPosting`);
    } else {
      for (const field of ["headline", "description", "image", "datePublished", "dateModified", "author", "publisher", "mainEntityOfPage"]) {
        if (!article[field]) errors.push(`${relative}: BlogPosting missing ${field}`);
      }
    }
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
