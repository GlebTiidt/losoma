import { copyFile, mkdir, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDir = new URL("../assets/source/", import.meta.url);
const outputDir = new URL("../assets/generated/", import.meta.url);
const supportedExtensions = new Set([".jpg", ".jpeg", ".png"]);
const targetWidths = [480, 768, 1024, 1440, 1920];

function slugifyFilename(filePath) {
  return path.parse(filePath).name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function listImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...await listImages(fullPath));
      continue;
    }

    if (entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

function uniqueWidths(originalWidth) {
  return [...new Set([...targetWidths, originalWidth])]
    .filter((width) => width <= originalWidth)
    .sort((a, b) => a - b);
}

function srcset(items, key) {
  return items.map((item) => `${item[key]} ${item.width}w`).join(", ");
}

function pictureExample(entry) {
  const largest = entry.outputs.at(-1);
  const altDraft = entry.baseName.replace(/-/g, " ");

  return [
    "<picture>",
    `  <source type="image/avif" srcset="${srcset(entry.outputs, "avif")}" sizes="(max-width: 768px) 100vw, 50vw">`,
    `  <source type="image/webp" srcset="${srcset(entry.outputs, "webp")}" sizes="(max-width: 768px) 100vw, 50vw">`,
    `  <img src="${largest.fallback}" alt="${altDraft}" title="${altDraft}" width="${entry.originalWidth}" height="${entry.originalHeight}" loading="lazy" decoding="async">`,
    "</picture>"
  ].join("\n");
}

async function optimizeImage(filePath) {
  const metadata = await sharp(filePath, { failOn: "none" }).metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error(`Cannot read image dimensions: ${filePath}`);
  }

  const sourceExt = path.extname(filePath).toLowerCase();
  const fallbackExt = sourceExt === ".png" ? "png" : "jpg";
  const baseName = slugifyFilename(filePath);
  const widths = uniqueWidths(metadata.width);
  const outputs = [];

  for (const width of widths) {
    const resize = { width, withoutEnlargement: true };
    const avifName = `${baseName}-${width}.avif`;
    const webpName = `${baseName}-${width}.webp`;
    const fallbackName = `${baseName}-${width}.${fallbackExt}`;

    await sharp(filePath)
      .resize(resize)
      .avif({ quality: 90, effort: 9, chromaSubsampling: "4:4:4" })
      .toFile(new URL(avifName, outputDir));

    await sharp(filePath)
      .resize(resize)
      .webp({ quality: 95, effort: 6, smartSubsample: true })
      .toFile(new URL(webpName, outputDir));

    const fallback = sharp(filePath).resize(resize);

    if (fallbackExt === "png") {
      await fallback
        .png({ compressionLevel: 9, adaptiveFiltering: true })
        .toFile(new URL(fallbackName, outputDir));
    } else {
      await fallback
        .jpeg({ quality: 95, mozjpeg: true })
        .toFile(new URL(fallbackName, outputDir));
    }

    outputs.push({
      width,
      avif: `/assets/generated/${avifName}`,
      webp: `/assets/generated/${webpName}`,
      fallback: `/assets/generated/${fallbackName}`
    });
  }

  const entry = {
    source: path.relative(sourceDir.pathname, filePath),
    baseName,
    originalWidth: metadata.width,
    originalHeight: metadata.height,
    fallbackType: fallbackExt === "png" ? "image/png" : "image/jpeg",
    outputs
  };

  return {
    ...entry,
    pictureExample: pictureExample(entry)
  };
}

async function main() {
  await mkdir(sourceDir, { recursive: true });
  await rm(outputDir, { recursive: true, force: true });
  await mkdir(outputDir, { recursive: true });

  const images = await listImages(sourceDir.pathname);

  if (images.length === 0) {
    await copyFile(new URL("../assets/source/.gitkeep", import.meta.url), new URL(".gitkeep", outputDir));
    await writeFile(new URL("manifest.json", outputDir), JSON.stringify({ images: [] }, null, 2));
    console.log("No source images found in assets/source.");
    return;
  }

  const manifest = [];

  for (const imagePath of images) {
    const stats = await stat(imagePath);
    if (!stats.size) continue;
    manifest.push(await optimizeImage(imagePath));
  }

  await writeFile(new URL("manifest.json", outputDir), JSON.stringify({ images: manifest }, null, 2));
  console.log(`Optimized ${manifest.length} image(s) into assets/generated.`);
}

await main();
