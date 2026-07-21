# Blog Guidelines

## Routes and publishing

- Index: `blog/index.html` → `/blog`.
- Articles: `blog/<seo-slug>.html` → `/blog/<seo-slug>`.
- Six articles are planned; publish only cards whose article page exists.
- The build copies the complete `blog/` directory to `dist/blog/` so nested URLs remain intact.

## Index cards

- Use `.blog-grid` and `.blog-card`; desktop is 3 columns, tablet 2, phone 1.
- Card media uses `aspect-ratio: 523 / 400`, matching Figma 190:27.
- The full card is one descriptive link to the article.
- Every image requires AVIF + WebP, explicit dimensions, German `alt` and `title`.

## Article structure

- Exactly one H1: the article topic.
- The subtitle is a paragraph, not another heading.
- Use H2 for every primary section. Add H3 only for a real subsection inside an H2.
- Keep the opening two-paragraph `.blog-article_lead` direct and scannable.
- Article media, the opening `.blog-article_lead` and the long-form `.article-prose` occupy 8 of 12 desktop columns and the full tablet/phone container.
- Use semantic `<ul>` lists; never fake bullets with plain paragraphs.

## SEO and schema

Each article needs unique:

- `<title>` and meta description;
- canonical URL;
- Open Graph and Twitter metadata with an absolute image URL;
- `BlogPosting` JSON-LD;
- `WebPage` JSON-LD linked to the article;
- `BreadcrumbList`: `Startseite → Blog → Artikel`;
- publish/modified dates, German language, article section, author and publisher.

The blog index uses `CollectionPage` plus `BreadcrumbList`: `Startseite → Blog`.
