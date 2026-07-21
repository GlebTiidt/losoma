import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const strict = process.argv.includes("--strict");
const targetFiles = fs.readdirSync(root)
  .filter((file) => file.endsWith(".html"))
  .concat(["styles.css", "script.js"]);
const allowedExternalPrefixes = ["splide__", "splide--", "iti__", "cc__", "cm__", "pm__"];
const forbiddenNameParts = [
  "block-left",
  "block-right",
  "right-lower",
  "left-upper",
  "div-block",
  "text-wrapper",
  "copy-",
  "section-1",
  "new-section",
  "site-header",
  "site-footer",
];

const classNames = new Map();

function addClass(className, source) {
  if (!className || allowedExternalPrefixes.some((prefix) => className.startsWith(prefix))) {
    return;
  }

  if (!classNames.has(className)) {
    classNames.set(className, new Set());
  }

  classNames.get(className).add(source);
}

for (const file of targetFiles) {
  const absolutePath = path.join(root, file);

  if (!fs.existsSync(absolutePath)) {
    continue;
  }

  const content = fs.readFileSync(absolutePath, "utf8");

  for (const match of content.matchAll(/class="([^"]+)"/g)) {
    match[1].split(/\s+/).forEach((className) => addClass(className, file));
  }

  for (const match of content.matchAll(/(?<![\w$])\.([_a-zA-Z][\w-]*(?:__[\w-]+|--[\w-]+)?)/g)) {
    addClass(match[1], file);
  }

  for (const match of content.matchAll(/querySelector(?:All)?\("(\.[^"]+)"\)/g)) {
    match[1]
      .split(/\s+/)
      .filter((selector) => selector.startsWith("."))
      .forEach((selector) => addClass(selector.slice(1), file));
  }
}

const findings = [...classNames.entries()]
  .map(([className, sources]) => {
    const reasons = [];

    if (className.includes("__")) {
      reasons.push("uses legacy project-owned separator `__`");
    }

    if (className.includes("--")) {
      reasons.push("uses legacy project-owned separator `--`");
    }

    if (forbiddenNameParts.some((part) => className.includes(part))) {
      reasons.push("uses forbidden visual or legacy naming");
    }

    return {
      className,
      reasons,
      sources: [...sources].sort(),
    };
  })
  .filter((finding) => finding.reasons.length > 0)
  .sort((a, b) => a.className.localeCompare(b.className));

if (!findings.length) {
  console.log("Client-First audit passed: no legacy project-owned class patterns found.");
  process.exit(0);
}

console.log("Client-First audit report:");

for (const finding of findings) {
  console.log(`- .${finding.className} (${finding.sources.join(", ")}): ${finding.reasons.join("; ")}`);
}

console.log(`\n${findings.length} legacy class pattern(s) found.`);

if (strict) {
  process.exit(1);
}
