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
- Current public Vercel alias: `https://losoma-pi.vercel.app`.

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
- Use visible FAQ content if adding `FAQPage` JSON-LD.

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
- `FAQPage` for visible FAQ blocks.
- `BreadcrumbList` when there are nested pages.
- `BlogPosting` for blog articles.

Required source facts before final JSON-LD:

- Official business name.
- Canonical domain.
- Address if public.
- Phone.
- Email.
- Opening hours if relevant.
- Logo URL.
- Social profile URLs.

## Class Naming Rules (BEM — the project standard)

**The project's actual and official class-naming standard is BEM**, not Finsweet Client-First. The whole codebase (home, service pages, contact, impressum — 140+ classes) is BEM, and we keep it that way for consistency. Classes are not SEO signals by themselves, but they must be semantic, reusable, predictable and easy to scale across sections and future pages.

> History: the project once aspired to Client-First, but nothing was actually built that way (only the stray `contact-form_select*` family uses single-underscore — a known leftover; leave it, JS depends on `.contact-form_select-option`). Decision (2026-06-22): **standardize on BEM**. From Client-First we keep only two genuinely useful conventions — `is-*` for dynamic state and `data-*` for JS hooks (see below).

### Naming Layers

- **Block (component / section)**: a semantic, domain-aware name, no underscore — `hero`, `header`, `nav`, `mobile-menu`, `contact-form`, `contact-panel`, `service-card`, `why-card`, `faq`, `footer`, `contact-page`, `legal-page`, `legal-block`.
- **Element**: `block__element` (double underscore) — `hero__content`, `contact-form__row`, `footer__links`, `legal-block__title`, `contact-page__inner`.
- **Static variant/modifier**: `block--modifier` (double dash), set in the markup — `button--accent`, `link-button--green`, `section-label--blue`, `why-card--daily-work`, `page--solid-header`, `header__logo--light`.
- **Dynamic state** (toggled by JS at runtime via `classList`): **`is-*`** — `is-open`, `is-scrolled`, `is-hidden`, `is-selected`, `is-menu-open`, `is-invalid`. Use `is-*` for things that flip at runtime; use `--modifier` for fixed variants chosen in the HTML.
- **Shared global classes** stay generic and reusable across pages — `.button`, `.link-button`, `.section-label`, `.heading-1`, `.heading-2`.

`__` and `--` ARE allowed (that's BEM). Keep a block internally consistent.

### Layout & typography come from TOKENS, not utility classes

This project does NOT use Client-First-style utility classes (`.padding-global`, `.container-large`, etc. do **not** exist). Instead:

- **Spacing / sizing / colour / type** are CSS custom-property tokens in `:root` (and redefined per breakpoint): `--section-gap`, `--section-gap-tight`, `--content-gutter`, `--grid-column-gap`, `--container-width`, `--type-section-title`, `--type-body`, `--color-ink`, `--color-blue`, etc. Desktop type is fluid via clamps in `@media (min-width: 1025px) :root`.
- **Layout** is per-component CSS (grid/flex on the block class), e.g. the 12-col grid on `.contact-page__inner` / `.legal-page__inner`.
- A handful of **shared, reusable classes** carry cross-page UI: `.heading-1`, `.heading-2`, `.button` (+`--accent`), `.link-button` (+`--green`), `.section-label` (+`--blue`/`--green`).

### Component (block) classes — BEM

Pattern: `block`, `block__element`, `block--modifier`.

```text
hero            hero__media   hero__overlay   hero__content   hero__title   hero__cta
contact-form    contact-form__row   contact-form__check   contact-form__submit
contact-panel   contact-panel__background
service-card    service-card__image
why-card        why-card__content   why-card--daily-work
footer          footer__nav   footer__links   footer__contact   footer__legal
contact-page    contact-page__inner   contact-page__intro   contact-page__details   contact-page__social
legal-page      legal-page__inner   legal-page__title   legal-page__content
legal-block     legal-block__title  legal-block__row   legal-block__col
```

Use domain meaning where it improves clarity (`service-card`, `reviews`, `contact-form`, `faq`, `footer`, `legal-block`). Avoid visual-only names. **Spacing and type come from CSS custom-property tokens** (`--section-gap`, `--type-section-title`, `--content-gutter`, …) defined in `:root` and the breakpoint `:root` blocks — NOT from utility classes. There are a few shared cross-page classes: `.heading-1`, `.heading-2`, `.button`, `.link-button`, `.section-label`.

### State & variant classes

Static variants chosen in the HTML use `--modifier` (`button--accent`, `section-label--blue`, `page--solid-header`). Dynamic states toggled by JS at runtime use `is-`:

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
<!-- static variant chosen in the markup → --modifier -->
<a class="button button--accent" href="/kontakt">Angebot anfragen</a>
<!-- dynamic state toggled by JS at runtime → is- -->
<article class="faq-item is-open">...</article>
<header class="header is-scrolled is-hidden">...</header>
<button class="contact-form_select-toggle is-selected">...</button>
```

Rule of thumb: if the markup author picks it once → `--modifier`; if JS flips it at runtime → `is-*`. `.button--accent`, `.why-card--daily-work`, `.section-label--blue`, `.page--solid-header` are all correct.

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

### No migration

BEM is the standard — do **not** migrate existing classes to Client-First (that was the old, abandoned plan). New code uses BEM too. When you touch a section, keep its classes as they are and stay internally consistent. The one stray Client-First family (`contact-form_select*`) is intentionally left alone because `script.js` selects `.contact-form_select-option`; only rename it if you also update that selector.

### Forbidden Class Patterns

Do not use (these are about vague/throwaway names, NOT about BEM — `__`/`--` are fine):

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

Exception: third-party classes such as `.splide__track`, `.splide__list`, `.splide__slide` are allowed because they belong to the library API.

## Image Rules

Every meaningful image needs:

- Descriptive filename.
- `alt`.
- `title` when it adds useful machine context.
- `width` and `height` where possible.
- `loading="lazy"` except for the primary above-the-fold image.
- `decoding="async"` for non-critical images.

Source image naming:

- Put original PNG/JPEG files into `assets/source/`.
- Use German, semantic, lowercase names.
- Separate words with hyphens.
- Include the entity and context, not generic visual labels.
- Do not include dimensions unless the same image needs multiple art-directed crops.

Good source names:

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

Image optimization pipeline:

- Run `npm run assets:images`.
- Source: `assets/source/`.
- Output: `assets/generated/`.
- Formats generated: one AVIF and one WebP per source image.
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

- Prefer local WOFF2 when the final Figma font files are available and licensing allows self-hosting.
- Use Google Fonts only when the font is open, stable, and the design does not require custom licensed files.
- For German-market performance and privacy, self-hosted WOFF2 is preferred over external Google Fonts requests.
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
- Notion child pages: `Project Overview`, `Main Page`, `About Us`, `Blog Copyright`.
- SEO rules: title/meta/OG/canonical, AI SEO, NN/g UX SEO notes, schema.org notes.
