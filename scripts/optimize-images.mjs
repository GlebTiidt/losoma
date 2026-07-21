import { copyFile, mkdir, readdir, rm, stat, unlink, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import sharp from "sharp";

const sourceDir = new URL("../assets/source/", import.meta.url);
const normalizedDir = new URL("../assets/normalized/", import.meta.url);
const outputDir = new URL("../assets/generated/", import.meta.url);
const normalizedPath = normalizedDir.pathname;
const outputPath = outputDir.pathname;
const supportedExtensions = new Set([".jpg", ".jpeg", ".png"]);
const maxNormalizedWidth = 2560;
const imageMaxWidthByBaseName = {
  "berliner-innenhof-objektbetreuung-losoma-team": 1600,
  "hausmeisterservice-treppenhaus-gemeinschaftsbereich-losoma": 1200,
  "treppenhausreinigung-aufzugsbereich-gebaeude-losoma": 1200,
  "gewerbliche-reinigung-besprechungsraum-losoma": 1200,
  "industriereinigung-technikraum-anlagen-losoma": 1200,
  "winterdienst-schneeschaufel-gehweg-losoma": 1200,
  "garten-rasenpflege-rasenmaeher-wohnanlage-losoma": 1200,
  "fassadenreinigung-wohngebaeude-ziegelfassade-losoma": 1200,
  "grundreinigung-teppichboden-buero-losoma": 1600,
  "hausmeister-externer-spezialist-wohnimmobilie-berlin": 1600,
  "hausmeisterservice-berliner-wohnanlage-losoma": 900,
  "treppenhaus-gemeinschaftsreinigung-briefkaesten-losoma": 900,
  "gewerbliche-reinigung-buero-berlin-losoma": 900,
  "grundreinigung-bodenpflege-gebaeude-losoma": 900,
  "industriereinigung-gewerbeflaeche-losoma": 900,
  "winterdienst-gebaeudeservice-berlin-losoma": 900,
  "garten-landschaftspflege-wohnanlage-losoma": 900,
  "fassaden-hoehenarbeiten-berlin-losoma": 900,
  "solaranlagenreinigung-dachanlage-losoma": 1200,
  "solaranlagenreinigung-photovoltaik-modul-reinigung-losoma": 1200,
  "warum-losoma-verantwortlicher-partner": 1200,
  "warum-losoma-stabile-arbeit-alltag": 1200,
  "warum-losoma-aufmerksamkeit-vor-ort": 1400
};

function runCommand(command, args) {
  return new Promise((resolve) => {
    const child = spawn(command, args, { stdio: "ignore" });
    child.on("error", () => resolve(false));
    child.on("close", (code) => resolve(code === 0));
  });
}

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

function pictureExample(entry) {
  const altDraft = entry.baseName.replace(/-/g, " ");

  return [
    "<picture>",
    `  <source type="image/avif" srcset="${entry.output.avif}">`,
    `  <img src="${entry.output.webp}" alt="${altDraft}" title="${altDraft}" width="${entry.normalizedWidth}" height="${entry.normalizedHeight}" loading="lazy" decoding="async">`,
    "</picture>"
  ].join("\n");
}

async function normalizeSourceImage(filePath, baseName, sourceExt, metadata) {
  const normalizedExt = sourceExt === ".png" ? "png" : "jpg";
  const normalizedName = `${baseName}.${normalizedExt}`;
  const normalizedFilePath = path.join(normalizedPath, normalizedName);
  const sharpOutputPath = normalizedExt === "png"
    ? path.join(normalizedPath, `${baseName}.sharp.png`)
    : normalizedFilePath;
  const targetMaxWidth = imageMaxWidthByBaseName[baseName] ?? maxNormalizedWidth;
  const resize = {
    width: Math.min(metadata.width, targetMaxWidth),
    withoutEnlargement: true
  };
  const pipeline = sharp(filePath).rotate().resize(resize);

  if (normalizedExt === "png") {
    await pipeline
      .png({ compressionLevel: 9, adaptiveFiltering: true, palette: false })
      .toFile(sharpOutputPath);

    const pngquantSucceeded = await runCommand("pngquant", [
      "--quality=85-100",
      "--speed=1",
      "--force",
      "--output",
      normalizedFilePath,
      sharpOutputPath
    ]);

    if (!pngquantSucceeded) {
      await copyFile(sharpOutputPath, normalizedFilePath);
    }

    await unlink(sharpOutputPath).catch(() => {});
  } else {
    await pipeline
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(normalizedFilePath);
  }

  const normalizedMetadata = await sharp(normalizedFilePath).metadata();

  return {
    normalizedName,
    normalizedFilePath,
    normalizedWidth: normalizedMetadata.width,
    normalizedHeight: normalizedMetadata.height
  };
}

async function optimizeImage(filePath) {
  const metadata = await sharp(filePath, { failOn: "none" }).metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error(`Cannot read image dimensions: ${filePath}`);
  }

  const sourceExt = path.extname(filePath).toLowerCase();
  const baseName = slugifyFilename(filePath);
  const normalized = await normalizeSourceImage(filePath, baseName, sourceExt, metadata);
  const avifName = `${baseName}.avif`;
  const webpName = `${baseName}.webp`;

  await sharp(normalized.normalizedFilePath)
    .avif({ quality: 78, effort: 9, chromaSubsampling: "4:4:4" })
    .toFile(path.join(outputPath, avifName));

  await sharp(normalized.normalizedFilePath)
    .webp({ quality: 88, effort: 6, smartSubsample: true })
    .toFile(path.join(outputPath, webpName));

  const entry = {
    source: path.relative(sourceDir.pathname, filePath),
    normalizedSource: `/assets/normalized/${normalized.normalizedName}`,
    baseName,
    originalWidth: metadata.width,
    originalHeight: metadata.height,
    normalizedWidth: normalized.normalizedWidth,
    normalizedHeight: normalized.normalizedHeight,
    output: {
      avif: `/assets/generated/${avifName}`,
      webp: `/assets/generated/${webpName}`
    }
  };

  return {
    ...entry,
    pictureExample: pictureExample(entry)
  };
}

// Incremental: an image is up to date when both generated variants already exist,
// are non-empty, and are at least as new as the source file. Changing the cap in
// imageMaxWidthByBaseName does NOT bump the source mtime, so use --force after edits there.
async function outputsAreFresh(baseName, sourceMtimeMs) {
  try {
    const [avifStat, webpStat] = await Promise.all([
      stat(path.join(outputPath, `${baseName}.avif`)),
      stat(path.join(outputPath, `${baseName}.webp`))
    ]);

    return avifStat.size > 0
      && webpStat.size > 0
      && avifStat.mtimeMs >= sourceMtimeMs
      && webpStat.mtimeMs >= sourceMtimeMs;
  } catch {
    return false;
  }
}

// Rebuild the manifest entry for an already-generated image without re-encoding it.
async function reuseExistingImage(filePath, baseName) {
  const metadata = await sharp(filePath, { failOn: "none" }).metadata();
  const webpMetadata = await sharp(path.join(outputPath, `${baseName}.webp`)).metadata();
  const normalizedExt = path.extname(filePath).toLowerCase() === ".png" ? "png" : "jpg";

  const entry = {
    source: path.relative(sourceDir.pathname, filePath),
    normalizedSource: `/assets/normalized/${baseName}.${normalizedExt}`,
    baseName,
    originalWidth: metadata.width,
    originalHeight: metadata.height,
    normalizedWidth: webpMetadata.width,
    normalizedHeight: webpMetadata.height,
    output: {
      avif: `/assets/generated/${baseName}.avif`,
      webp: `/assets/generated/${baseName}.webp`
    }
  };

  return {
    ...entry,
    pictureExample: pictureExample(entry)
  };
}

async function main() {
  // Default is incremental — only new/changed source images are encoded; everything
  // already in assets/generated is kept and reused. Pass --force (or --all) to wipe
  // and re-encode the whole set (e.g. after changing encode settings or a width cap).
  const forceRebuild = process.argv.includes("--force") || process.argv.includes("--all");

  await mkdir(sourceDir, { recursive: true });

  if (forceRebuild) {
    await rm(normalizedDir, { recursive: true, force: true });
    await rm(outputDir, { recursive: true, force: true });
  }

  await mkdir(normalizedDir, { recursive: true });
  await mkdir(outputDir, { recursive: true });

  const images = await listImages(sourceDir.pathname);

  if (images.length === 0) {
    await copyFile(new URL("../assets/source/.gitkeep", import.meta.url), new URL(".gitkeep", normalizedDir));
    await copyFile(new URL("../assets/source/.gitkeep", import.meta.url), new URL(".gitkeep", outputDir));
    await writeFile(new URL("manifest.json", outputDir), JSON.stringify({ images: [] }, null, 2));
    console.log("No source images found in assets/source.");
    return;
  }

  const manifest = [];
  let generatedCount = 0;
  let reusedCount = 0;

  for (const imagePath of images) {
    const stats = await stat(imagePath);
    if (!stats.size) continue;

    const baseName = slugifyFilename(imagePath);

    if (!forceRebuild && await outputsAreFresh(baseName, stats.mtimeMs)) {
      manifest.push(await reuseExistingImage(imagePath, baseName));
      reusedCount++;
      continue;
    }

    manifest.push(await optimizeImage(imagePath));
    generatedCount++;
  }

  await writeFile(new URL("manifest.json", outputDir), JSON.stringify({ images: manifest }, null, 2));
  console.log(`Images ready: ${generatedCount} generated, ${reusedCount} reused (already up to date), ${manifest.length} total. Run with --force to re-encode everything.`);
}

await main();
