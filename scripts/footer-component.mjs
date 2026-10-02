export const FOOTER_MARKER = "<!-- LOSOMA_FOOTER -->";

export function renderFooter(html, pagePath, footerTemplate) {
  if (html.split(FOOTER_MARKER).length !== 2) {
    throw new Error(`Expected one footer marker in ${pagePath}`);
  }

  const currentPath = pagePath
    .replace(/\/index\.html$/, "")
    .replace(/\.html$/, "") || "/";

  const footer = footerTemplate.replace(
    /<a href="([^"]+)"([^>]*)>/g,
    (tag, href, attributes) => href === currentPath && currentPath !== "/"
      ? `<a href="${href}" aria-current="page"${attributes}>`
      : tag,
  );

  return html.replace(FOOTER_MARKER, footer.trimEnd());
}
