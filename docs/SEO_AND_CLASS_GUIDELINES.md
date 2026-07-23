# SEO And Class Guidelines

Рабочие правила для верстки Losoma. Использовать при переносе дизайна из Figma, создании новых секций, страниц, компонентов, изображений, форм и SEO-разметки.

## Project Context

- Brand: Losoma.
- Market: Germany.
- Primary geography: Berlin.
- Language: German.
- Business category: Gebäudedienstleistungen, Objektbetreuung, Reinigungsservices, Hausmeisterservice.
- Primary audience: Hausverwaltungen, Eigentümer, managers of residential and commercial properties.
- Positioning: reliable, responsible, detail-focused service provider for ongoing building care.
- Core proof points from current copy: `7+ Jahre am Markt`, `70+ Objekte in laufender Betreuung in Berlin`.
- Production canonical domain: `https://losoma.de`.
- Current public Vercel alias for staging/review: `https://losoma-pi.vercel.app`.

## SEO Principles

- Write metadata for the exact page, not for a generic topic.
- Use German user vocabulary in headings and body text.
- Put the main intent early in titles and H1/H2 headings.
- Use one unique H1 per page.
- Keep H1 page-specific, but keep styling class generic.
- Do not copy H1 into `<title>` one-to-one.
- Each page needs unique title, meta description, canonical, Open Graph title and Open Graph description.
- Canonical URLs must be absolute, clean, and without anchors or tracking parameters.
- Use descriptive links and buttons, not generic `Mehr`, `Mehr erfahren`, or `Weiter` when context is unclear.
- Keep FAQ questions close to real user wording.
- Keep FAQ content visible and semantic, but do not add `FAQPage` JSON-LD under the current project decision unless current Google guidance and the site's eligibility are rechecked.

## AI Search Principles

Modern AI search and agents must be able to understand the page without relying on visual layout.

- Use semantic HTML: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`.
- Use real headings in order: `h1`, `h2`, `h3`.
- Add short direct answer blocks for important sections.
- Make relationships explicit in markup: service name, description, geography, target audience, CTA.
- Do not rely on icons alone. Icon buttons and icon cards need accessible names.
- Forms need real `label` elements, clear errors, required states, and machine-readable field names.
- Images need meaningful `alt` and optional `title` when useful.
- Avoid ambiguous CTA text. Prefer `Objektbesichtigung anfragen`, `Hausmeisterservice anfragen`, `Gebäudedienstleistungen in Berlin besprechen`.
- Add JSON-LD for key entities when page content supports it.

## Structured Data Plan

Use JSON-LD, not microdata, unless there is a specific reason.

Recommended schema types:

- `LocalBusiness` or a more specific service-business subtype where appropriate.
- `Organization`.
- `WebSite`.
- `Service` for service pages.
- `FAQPage` is currently excluded; reconsider only after a fresh eligibility/guidance review.
- `BreadcrumbList` when there are nested pages.

Required source facts before final JSON-LD:

- Official business name.
- Canonical domain.
- Address if public.
- Phone.
- Email.
- Opening hours if relevant.
- Logo URL.
- Social profile URLs.

## Class Naming Rules (Client-First — the project standard)

**The project's official class-naming standard is now Client-First-style naming.** Project-owned classes use semantic block names, single-underscore element names, and `is-*` state/variant classes. Classes are not SEO signals by themselves, but they must be semantic, reusable, predictable and easy to scale across sections and future pages.

> Decision (2026-07-10): project-owned classes use Client-First-style names. Third-party classes such as Splide (`splide__*`) and intl-tel-input (`iti__*`) are external library API and must not be renamed.

### Naming Layers

- **Block (component / section)**: a semantic, domain-aware name, no underscore — `hero`, `header`, `nav`, `mobile-menu`, `contact-form`, `contact-panel`, `service-card`, `why-card`, `faq`, `footer`, `contact-page`, `legal-page`, `legal-block`.
- **Element**: `block_element` (single underscore) — `hero_content`, `contact-form_row`, `footer_links`, `legal-block_title`, `contact-page_inner`.
- **Static variant/modifier**: `is-*`, set alongside the block/element class — `button is-accent`, `link-button is-green`, `section-label is-blue`, `why-card is-daily-work`, `body.is-solid-header`, `header_logo is-light`.
- **Dynamic state** (toggled by JS at runtime via `classList`): **`is-*`** — `is-open`, `is-scrolled`, `is-hidden`, `is-selected`, `is-menu-open`, `is-invalid`.
- **Shared global classes** stay generic and reusable across pages — `.button`, `.link-button`, `.section-label`, `.heading-1`, `.heading-2`.

Project-owned `__` and `--` class separators are not allowed. Use `npm run audit:classes` to check this.

### Layout & typography come from TOKENS, not utility classes

This project does NOT use Client-First-style utility classes (`.padding-global`, `.container-large`, etc. do **not** exist). Instead:

- **Spacing / sizing / colour / type** are CSS custom-property tokens in `:root` (and redefined per breakpoint): `--section-gap`, `--section-gap-tight`, `--content-gutter`, `--grid-column-gap`, `--container-width`, `--type-section-title`, `--type-body`, `--color-ink`, `--color-blue`, etc. Desktop type is fluid via clamps in `@media (min-width: 1025px) :root`.
- **Layout** is per-component CSS (grid/flex on the block class), e.g. the 12-col grid on `.contact-page_inner` / `.legal-page_inner`.
- A handful of **shared, reusable classes** carry cross-page UI: `.heading-1`, `.heading-2`, `.button` + `.is-accent` / `.is-static`, `.link-button` + `.is-green`, `.section-label` + `.is-blue` / `.is-green`.

### Component (block) classes — Client-First

Pattern: `block`, `block_element`, `is-variant`.

```text
hero            hero_media   hero_overlay   hero_content   hero_title   hero_cta
contact-form    contact-form_row   contact-form_check   contact-form_submit
contact-panel   contact-panel_background
service-card    service-card_image
why-card        why-card_content   why-card is-daily-work
footer          footer_nav   footer_links   footer_contact   footer_legal
contact-page    contact-page_inner   contact-page_intro   contact-page_details   contact-page_social
legal-page      legal-page_inner   legal-page_title   legal-page_content
legal-block     legal-block_title  legal-block_row   legal-block_col
```

Use domain meaning where it improves clarity (`service-card`, `reviews`, `contact-form`, `faq`, `footer`, `legal-block`). Avoid visual-only names. **Spacing and type come from CSS custom-property tokens** (`--section-gap`, `--type-section-title`, `--content-gutter`, …) defined in `:root` and the breakpoint `:root` blocks — NOT from utility classes. There are a few shared cross-page classes: `.heading-1`, `.heading-2`, `.button`, `.link-button`, `.section-label`.

### State & variant classes

Static variants and dynamic states both use `is-*`. Scope variant rules by the component selector when needed, e.g. `.button.is-accent`, `.section-label.is-blue`, `.why-card.is-daily-work`.

```text
is-active
is-open
is-disabled
is-loading
is-blue
is-green
is-dark
is-hidden
```

Examples:

```html
<!-- static variant chosen in the markup → is-* -->
<a class="button is-accent" href="/kontakt">Angebot anfragen</a>
<!-- dynamic state toggled by JS at runtime → is- -->
<article class="faq-item is-open">...</article>
<header class="header is-scrolled is-hidden">...</header>
<button class="contact-form_select-toggle is-selected">...</button>
```

Rule of thumb: the block/element class says what the component is; `is-*` says which variant or runtime state it is in. `.button.is-accent`, `.why-card.is-daily-work`, `.section-label.is-blue`, `.is-solid-header` are all correct.

### JavaScript Hooks

Do not bind JavaScript to styling classes when the behavior can use data attributes.

Preferred:

```html
<div class="reviews_slider splide" data-reviews-slider>
```

Allowed:

```js
document.querySelector("[data-reviews-slider]");
```

Avoid:

```js
document.querySelector(".reviews_slider");
```

This keeps style naming flexible and prevents JS from breaking during class refactors.

### Migration Status

The project-owned classes were migrated to Client-First-style naming on 2026-07-10. The `contact-form_select*` family already matched the single-underscore element convention and remains as-is. New code must follow the same naming system.

### Forbidden Class Patterns

Do not use:

- `.section-1`
- `.block-left`
- `.block-right`
- `.home-title`
- `.main-page-card-3`
- `.blue-text`
- `.big-title`
- `.text-wrapper`
- `.div-block`
- `.copy-1`
- `.new-section`
- `.right-lower`
- `.left-upper`
- `.site-header`
- `.site-footer`

Exception: third-party classes such as `.splide__track`, `.splide__list`, `.splide__slide`, `.iti__selected-country` are allowed because they belong to library APIs.

## Image Rules

Every meaningful image needs:

- Descriptive filename.
- `alt`.
- `title` when it adds useful machine context.
- `width` and `height` where possible.
- `loading="lazy"` except for the primary above-the-fold image.
- `decoding="async"` for non-critical images.

Deployable image naming:

- Store only final browser-ready AVIF/WebP files in `assets/generated/`.
- Use German, semantic, lowercase names.
- Separate words with hyphens.
- Include the entity and context, not generic visual labels.
- Do not include dimensions unless the same image needs multiple art-directed crops.

Good asset names:

```text
losoma-team-gebaeudebetreuung-berlin.jpg
treppenhausreinigung-wohnimmobilie-berlin.jpg
winterdienst-eingang-wohnanlage-berlin.jpg
solaranlagenreinigung-gebaeudedach.jpg
```

Bad source names:

```text
IMG_4821.JPG
hero-final-new.png
cleaning-photo-1.jpg
image-large.png
```

Image delivery:

- Original media and the old repository image pipeline were removed before Hostinger launch.
- Keep one final AVIF and one final WebP per image in `assets/generated/` when both formats are used.
- Browser fallback order: AVIF first, WebP in `<img>`.
- Do not generate multiple responsive copies by default. Create art-directed variants only when a specific layout requires a separate crop.
- Do not upscale images above the original width.
- Keep quality high. Conversion is for browser compatibility and transfer efficiency, not aggressive visual compression.

Required markup pattern:

```html
<picture>
  <source type="image/avif" srcset="/assets/generated/example.avif">
  <img src="/assets/generated/example.webp" alt="Gepflegtes Treppenhaus einer Berliner Wohnimmobilie" title="Treppenhausreinigung für Wohnimmobilien in Berlin" width="2560" height="1429" loading="lazy" decoding="async">
</picture>
```

For the primary above-the-fold hero image:

- Use `fetchpriority="high"`.
- Do not use `loading="lazy"`.
- Keep explicit `width` and `height`.

Alt examples:

```html
<img
  src="/assets/losoma-team-berlin-building-care.webp"
  alt="Losoma Team bei der Gebäudebetreuung einer Berliner Wohnimmobilie"
  title="Losoma Gebäudedienstleistungen in Berlin"
>
```

Do not write keyword-stuffed alt text.

Bad:

```text
Gebäudedienstleistungen Berlin Hausmeisterservice Berlin Reinigung Berlin Winterdienst Berlin
```

Good:

```text
Gepflegtes Treppenhaus einer Berliner Wohnimmobilie nach der Reinigung
```

## Font Rules

- Lato is self-hosted from `assets/vendor/lato/`; keep using the local WOFF2 files.
- Do not add external Google Fonts links or preconnects.
- If a future redesign changes the typeface, prefer licensed/local WOFF2 files and update the legal/privacy notes before launch.
- Keep font weights limited to what the design actually uses.
- Use `font-display: swap`.
- Preload only critical above-the-fold font files.

## Page-Level SEO Drafts

Final metadata must be revised after the actual page content and canonical domain are fixed.

### Home

Intent: Gebäudedienstleistungen and laufende Objektbetreuung in Berlin.

Draft title:

```text
Gebäudedienstleistungen in Berlin für Immobilien | Losoma
```

Draft description:

```text
Losoma betreut Berliner Immobilien mit Reinigung, Hausmeisterservice, Winterdienst und Gartenpflege. Klare Abläufe, feste Ansprechpartner und zuverlässige Ausführung.
```

H1 from Notion copy:

```text
Zuverlässige Gebäudedienstleistungen für Berliner Immobilien
```

### About

Intent: trust, team, values, working principles.

Draft title:

```text
Über Losoma: Gebäudebetreuung mit Verantwortung in Berlin
```

Draft description:

```text
Losoma steht für zuverlässige Gebäudebetreuung, klare Kommunikation und sorgfältige Ausführung für Hausverwaltungen und Eigentümer in Berlin.
```

## German Keyword Themes

Use naturally, not as keyword stuffing.

- Gebäudedienstleistungen Berlin
- Objektbetreuung Berlin
- Hausmeisterservice Berlin
- Reinigungsservice Berlin
- Treppenhausreinigung Berlin
- Gemeinschaftsflächen reinigen
- Winterdienst Berlin
- Gartenpflege Wohnanlage Berlin
- Fassadenreinigung Berlin
- Solaranlagenreinigung
- Hausverwaltung Dienstleister Berlin
- Immobilienbetreuung Berlin

## Content Blocks For AI And Snippets

Use short answer-style content for important sections:

- What Losoma does.
- Who Losoma works with.
- Which services are included.
- How cooperation starts.
- What response time to expect.
- Which parts of Berlin/Germany are served.

Example:

```html
<p class="text-lead">
  Losoma unterstützt Hausverwaltungen und Eigentümer in Berlin mit laufender Gebäudebetreuung,
  Reinigung, Hausmeisterservice, Winterdienst und Pflege von Außenbereichen.
</p>
```

## Source Notes

Sources read for this project:

- Local SEO base: `/Users/glebstepanovich/Desktop/Работа/seo-master`.
- Notion page: `Losoma`.
- Notion child pages: `Project Overview`, `Main Page`, `About Us`.
- SEO rules: title/meta/OG/canonical, AI SEO, NN/g UX SEO notes, schema.org notes.
