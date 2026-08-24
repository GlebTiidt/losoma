import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const ignoredDirectories = new Set([".git", "dist", "node_modules", "reports"]);

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
const organizationId = "https://losoma.de/#organization";
const organizationName = "Losoma Gebäudeservice";
const websiteId = "https://losoma.de/#website";
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
const structuredServiceCanonicals = new Set([
  "https://losoma.de/hausmeisterservice",
  "https://losoma.de/treppenhausreinigung",
  "https://losoma.de/gewerbliche-reinigung",
  "https://losoma.de/grundreinigung",
  "https://losoma.de/industriereinigung",
]);

function hasType(node, expectedType) {
  const types = Array.isArray(node?.["@type"]) ? node["@type"] : [node?.["@type"]];
  return types.includes(expectedType);
}

function findPageNode(nodes) {
  return nodes.find((node) =>
    ["WebPage", "ContactPage", "CollectionPage"].some((type) => hasType(node, type)),
  );
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
  const webpage = findPageNode(graphNodes);
  const expectedWebpageId = canonical ? `${canonical}#webpage` : "";
  if (!webpage) {
    errors.push(`${relative}: missing WebPage-compatible node`);
  } else {
    for (const field of ["name", "description", "inLanguage", "isPartOf"]) {
      if (!webpage[field]) errors.push(`${relative}: page schema missing ${field}`);
    }
    if (webpage["@id"] !== expectedWebpageId) {
      errors.push(`${relative}: page schema @id must be ${expectedWebpageId}`);
    }
    if (webpage.url !== canonical) {
      errors.push(`${relative}: page schema url must match canonical`);
    }
    if (webpage.inLanguage !== "de-DE") {
      errors.push(`${relative}: page schema inLanguage must be de-DE`);
    }
    if (webpage.isPartOf?.["@id"] !== websiteId) {
      errors.push(`${relative}: page schema isPartOf must reference ${websiteId}`);
    }
  }
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
    if (!organization || !hasType(organization, "Organization")) {
      errors.push(`${relative}: homepage needs Organization + HomeAndConstructionBusiness`);
    } else {
      for (const field of ["name", "url", "logo", "image", "telephone", "email", "vatID", "owner", "address", "legalAddress", "areaServed", "contactPoint", "hasOfferCatalog", "sameAs"]) {
        if (!organization[field]) errors.push(`${relative}: organization missing ${field}`);
      }
      if (organization["@id"] !== organizationId) errors.push(`${relative}: organization @id is stale`);
      if (organization.name !== organizationName) errors.push(`${relative}: organization name is stale`);
      if (organization.legalName) errors.push(`${relative}: unconfirmed organization legalName must not be emitted`);
      const socialProfiles = Array.isArray(organization.sameAs) ? organization.sameAs : [];
      const instagram = "https://www.instagram.com/losomagebaudeservice/";
      const maximLinkedIn = "https://www.linkedin.com/in/maxim-soga-575478264/";
      if (!socialProfiles.includes(instagram)) errors.push(`${relative}: organization sameAs missing ${instagram}`);
      if (socialProfiles.includes(maximLinkedIn)) errors.push(`${relative}: personal LinkedIn must belong to Maxim, not the organization`);
      const owners = Array.isArray(organization.owner) ? organization.owner : [];
      const maxim = owners.find((owner) => owner?.["@id"] === "https://losoma.de/#maxim-soga");
      const alexandr = owners.find((owner) => owner?.["@id"] === "https://losoma.de/#alexandr-lozinschi");
      if (maxim?.name !== "Maxim Soga" || maxim?.jobTitle !== "Inhaber" || maxim?.sameAs !== maximLinkedIn) {
        errors.push(`${relative}: Maxim owner data is missing or stale`);
      }
      if (alexandr?.name !== "Alexandr Lozinschi" || alexandr?.jobTitle !== "Mitinhaber") {
        errors.push(`${relative}: Alexandr owner data is missing or stale`);
      }
    }
    if (!website) errors.push(`${relative}: homepage missing WebSite`);
    if (!webpage) errors.push(`${relative}: homepage missing WebPage`);
  }

  if (serviceCanonicals.has(canonical)) {
    const headingLevels = Array.from(html.matchAll(/<h([1-6])\b[^>]*>/gi), (match) => Number(match[1]));
    const h1Count = headingLevels.filter((level) => level === 1).length;
    if (h1Count !== 1) {
      errors.push(`${relative}: service page needs exactly one H1, found ${h1Count}`);
    }
    if (headingLevels[0] !== 1) {
      errors.push(`${relative}: first heading must be H1`);
    }
    for (let index = 1; index < headingLevels.length; index += 1) {
      const previousLevel = headingLevels[index - 1];
      const currentLevel = headingLevels[index];
      if (currentLevel > previousLevel + 1) {
        errors.push(`${relative}: heading hierarchy skips from H${previousLevel} to H${currentLevel}`);
      }
    }

    const service = graphNodes.find((node) => hasType(node, "Service"));
    if (!service) {
      errors.push(`${relative}: service page missing Service`);
    } else {
      for (const field of ["name", "serviceType", "category", "description", "url", "provider", "audience", "areaServed", "image", "mainEntityOfPage"]) {
        if (!service[field]) errors.push(`${relative}: Service missing ${field}`);
      }
      if (service["@id"] !== `${canonical}#service`) errors.push(`${relative}: Service @id is stale`);
      if (service.url !== canonical) errors.push(`${relative}: Service url must match canonical`);
      if (service.provider?.["@id"] !== organizationId) errors.push(`${relative}: Service provider is stale`);
      if (service.mainEntityOfPage?.["@id"] !== expectedWebpageId) errors.push(`${relative}: Service mainEntityOfPage is stale`);
      if (!service.audience?.audienceType) errors.push(`${relative}: Service audience needs audienceType`);
      if (service.areaServed?.name !== "Berlin") errors.push(`${relative}: Service areaServed must include confirmed Berlin`);
    }
    if (webpage?.mainEntity?.["@id"] !== `${canonical}#service`) {
      errors.push(`${relative}: WebPage mainEntity must reference its Service`);
    }
  }

  if (structuredServiceCanonicals.has(canonical)) {
    const approachLead = html.match(/<(\w+)[^>]*class="quality-claim_title"[^>]*>([\s\S]*?)<\/\1>/);
    const approachText = approachLead?.[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() ?? "";
    if (approachLead?.[1].toLowerCase() !== "p") {
      errors.push(`${relative}: Unser Ansatz lead must be paragraph text, not a heading`);
    }
    if (!/<div[^>]*class="quality-claim is-expanded-intro"/.test(html)) {
      errors.push(`${relative}: Unser Ansatz introduction must be a neutral content container`);
    }
    const approachPointTags = Array.from(
      html.matchAll(/<(\w+)[^>]*class="quality-point_title"[^>]*>/g),
      (match) => match[1].toLowerCase(),
    );
    if (!approachPointTags.length || approachPointTags.some((tag) => tag !== "p")) {
      errors.push(`${relative}: Unser Ansatz point titles must be paragraph text, not headings`);
    }
    if (/<article[^>]*class="quality-point"/.test(html)) {
      errors.push(`${relative}: Unser Ansatz text points must not use article semantics`);
    }
    if (!approachText || approachText.endsWith(".")) {
      errors.push(`${relative}: Unser Ansatz lead must exist without a terminal period`);
    }
    if (!/<h2[^>]*class="service-details_title"/.test(html)) {
      errors.push(`${relative}: detailed service section needs its H2`);
    }
    const detailHeadingCount = (html.match(/<h3[^>]*class="service-detail_title"/g) ?? []).length;
    if (detailHeadingCount < 3) {
      errors.push(`${relative}: detailed service section needs at least three H3 blocks`);
    }
    if (!/<ul[^>]*class="service-detail_list"/.test(html)) {
      errors.push(`${relative}: detailed service content needs a semantic list`);
    }
    const faqCount = (html.match(/<article[^>]*class="faq-item"/g) ?? []).length;
    if (faqCount !== 6) {
      errors.push(`${relative}: expected six visible FAQ items, found ${faqCount}`);
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
      if (article.author?.["@id"] !== organizationId || article.author?.name !== organizationName) {
        errors.push(`${relative}: BlogPosting author is stale`);
      }
      if (article.publisher?.["@id"] !== organizationId || article.publisher?.name !== organizationName) {
        errors.push(`${relative}: BlogPosting publisher is stale`);
      }
      const modifiedMeta = html.match(/<meta property="article:modified_time" content="([^"]+)"/)?.[1];
      if (!article.dateModified?.startsWith(modifiedMeta ?? "missing")) {
        errors.push(`${relative}: BlogPosting dateModified must match article:modified_time`);
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
