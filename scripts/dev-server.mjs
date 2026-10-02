import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { FOOTER_MARKER, renderFooter } from "./footer-component.mjs";

const root = resolve(fileURLToPath(new URL("../", import.meta.url)));
const footerFile = resolve(root, "components/footer.html");
const port = Number(process.env.PORT || 8765);
const contentTypes = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    if (pathname.split("/").some((part) => part.startsWith("."))) {
      response.writeHead(403).end();
      return;
    }

    let file = resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(`${root}${sep}`)) {
      response.writeHead(403).end();
      return;
    }

    let entry;
    try {
      entry = await stat(file);
    } catch (error) {
      if (error.code !== "ENOENT" || extname(file)) throw error;
      file += ".html";
      entry = await stat(file);
    }
    if (entry.isDirectory()) {
      file = resolve(file, "index.html");
    }

    let body = await readFile(file);
    if (extname(file) === ".html") {
      const html = body.toString("utf8");
      if (html.includes(FOOTER_MARKER)) {
        const footer = await readFile(footerFile, "utf8");
        const pagePath = `/${relative(root, file).split(sep).join("/")}`;
        body = Buffer.from(renderFooter(html, pagePath, footer));
      }
    }

    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Type": contentTypes[extname(file)] || "application/octet-stream",
      "Content-Length": body.length,
    });
    if (request.method === "HEAD") response.end();
    else response.end(body);
  } catch (error) {
    response.writeHead(error.code === "ENOENT" ? 404 : 500).end();
    if (error.code !== "ENOENT") console.error(error);
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Losoma local preview: http://localhost:${port}/`);
});
