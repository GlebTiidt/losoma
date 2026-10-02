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
- Current production domain: `https://losoma.de` on Hostinger.

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
- Keep FAQ content visible and semantic. `FAQPage` JSON-LD is present at the owner's request on pages with a visible FAQ; its questions and answers must match the page exactly. Google retired FAQ rich results on 2026-05-07, so this markup does not make Losoma eligible for that retired display feature.

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

## Service Content Draft And Release Workflow

New service-page copy must be staged and reviewed before it touches live HTML.

- Store page-specific working copy locally in the Git-ignored `docs/content-drafts/`, one file per
  canonical service URL. These files may contain unpublished owner/client facts and must not be
  committed to the public repository.
- Preserve four layers in each draft when available: owner-provided source facts, a polished Russian
  editorial version, the final German adaptation and a short list of facts that still need approval.
- The German website copy is an adaptation for German commercial language, not a literal
  translation. Keep formal `Sie`, natural German terminology and the restrained Losoma tone.
- Treat a draft as a source for section-level replacement, not as permission to replace the entire
  page. Map proposed text to metadata, H1/hero, service-specific content, process, exclusions and FAQ.
  Preserve forms, CTA, navigation, footer and useful visual components unless the approved design
  scope explicitly changes them.
- Replace repeated generic claims with concrete verified facts. Do not inflate an already adequate
  page by appending the same idea in another paragraph.
- Put the direct answer in the first 40–70 words: service, target object/client, geography and the
  practical result.
- Prefer short descriptive H2 headings followed by real details: included work, options, exclusions,
  visit frequency, process, reporting, price factors, realistic result and next step.
- Add contextual internal links only where the relationship is explained in the surrounding copy;
  menu and footer links do not count as contextual linking.
- Current published five-service pattern (2026-08-22): `Unser Ansatz` label, large paragraph lead
  without a terminal period, supporting paragraph in `--color-muted`, a short CTA, one descriptive
  H2 above the detailed section, H3 per topic, real `<ul>/<li>` markup where applicable and six
  visible FAQ items. Reuse this structure for matching service-page updates unless a new approved
  design explicitly changes it.

### Claims that require explicit approval

- Do not publish client or brand names, project counts, references, certificates, qualifications,
  insurance, response times, availability, prices or product properties without an owner-confirmed
  and publicly usable source.
- Distinguish company experience from an employee's or owner's prior experience. Do not write
  `Losoma hat ... ausgeführt` when the work was performed for another employer or subcontractor.
- Describe accessible building checks as `Sichtkontrolle` unless Losoma is qualified and contracted
  to perform a formal technical inspection.
- Do not promise electrical, sanitary, heating or other regulated trade work under generic
  `Kleinarbeiten`. Use a clear boundary: safe simple tasks in the agreed scope; qualified work goes
  to an appropriate `Fachbetrieb`.
- Do not list socket repairs or work on electrical installations without confirmed applicable
  qualification and authorization.
- Product-dependent claims such as slip resistance, disinfectant resistance, durability or material
  compatibility require the exact product data sheet and a confirmed application method.
- Keep limitations visible when they affect the decision. Cleaning cannot promise to reverse wear,
  material damage or every deeply absorbed stain.

### Content release and measurement gate

- Do not edit source HTML until the owner approves the facts and the Russian editorial meaning.
- Before implementation, record the exact canonical URLs and replacement scope. Synchronize every
  field inside that approved scope without inventing new facts. If hero/H1/metadata/OG are deferred,
  record that explicitly; Service/WebPage JSON-LD must still describe the currently visible page.
- Run the full local build and audits from `CLAUDE.md`. Production still requires a separate direct
  deploy request, dated rollback, exact target list, hash comparison and live smoke.
- Record the release date, URL and target query cluster. Use Search Console `Germany` as the primary
  SEO cohort and compare equal 28-day windows before and after the change. Seven-day windows are for
  early monitoring only while volume remains small.
- Do not attribute an aggregate average-position change to new copy when periods, countries, query
  mix or brand/non-brand composition differ.

## Structured Data Plan

Use JSON-LD, not microdata, unless there is a specific reason.

Recommended schema types:

- `LocalBusiness` or a more specific service-business subtype where appropriate.
- `Organization`.
- `WebSite`.
- `Service` for service pages.
- `FAQPage` only where the page has a visible FAQ, with exact question and answer text. This remains Schema.org markup, not a Google FAQ rich-result feature.
- `BreadcrumbList` when there are nested pages.

Required source facts before final JSON-LD:

- Official business name.
- Canonical domain.
- Address if public.
- Phone.
- Email.
- Opening hours if relevant.

Current Losoma JSON-LD invariants:

- Canonical Organization ID is `https://losoma.de/#organization`; the confirmed public name is
  `Losoma Gebäudeservice` and `legalName` stays absent until the registered name is confirmed.
- Confirmed owners are separate Person nodes/references. A personal social profile belongs to its
  Person (`Maxim Soga` → LinkedIn), while an official company profile belongs to Organization
  (`Losoma Gebäudeservice` → Instagram).
- Every one of the nine service pages has one WebPage, one Service and one BreadcrumbList node.
  Service requires current `name`, `serviceType`, `category`, `description`, `provider`, `audience`,
  `areaServed`, `image`, `url` and `mainEntityOfPage` values. WebPage `mainEntity` must point back to
  the same Service ID.
- Legal pages use the current Organization as `about`; contact uses it as `about` and `mainEntity`.
  Blog author/publisher references the same Organization and article dates must agree with the
  Open Graph article metadata.
- Run the production-scoped `scripts/audit-seo.mjs` after every content or legal change. The audit
  rejects stale IDs/providers, incomplete Service nodes, unconfirmed `legalName`, misplaced social
  profiles, mismatched article dates and FAQ markup that differs from visible content. For the five service pages updated on
  2026-08-22 it also enforces the paragraph lead without a terminal period, detail H2/H3 structure,
  at least one semantic list and exactly six visible FAQ items.
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

- **Spacing / sizing / colour / type** are CSS custom-property tokens in `:root` (and redefined per breakpoint): `--section-gap`, `--section-gap-tight`, `--content-gutter`, `--grid-column-gap`, `--container-width`, `--type-heading-2`, `--type-heading-3`, `--type-body`, `--color-ink`, `--color-blue`, etc.
- Semantic text colours must also come from the shared tokens: ordinary copy uses `--color-ink`,
  while secondary/supporting copy uses `--color-muted`. Do not duplicate the muted hex value in a
  component selector.
- **Layout** is per-component CSS (grid/flex on the block class), e.g. the 12-col grid on `.contact-page_inner` / `.legal-page_inner`.
- A handful of **shared, reusable classes** carry cross-page UI: `.heading-1`, `.heading-2`, `.button` + `.is-accent` / `.is-static`, `.link-button` + `.is-green`, `.section-label` + `.is-blue` / `.is-green`.

### Shared typography scale

- Keep one fixed size scale in `:root` with reusable `--font-size-*` primitives. Those primitives
  feed the semantic roles `--type-display`, `--type-heading-2`, `--type-title-large`,
  `--type-heading-3`, `--type-lead`, `--type-body`, `--type-small`, `--type-caption` and
  `--type-label`.
- Components consume semantic roles. Do not create tokens such as `--type-card-title`,
  `--type-panel-title` or another block-specific alias when an existing role has the same meaning.
- Section H2 uses `--type-heading-2`; content H3 uses `--type-heading-3`. A component variant may
  change weight, line-height or colour without inventing a second heading-size scale.
- Use a `--font-size-*` primitive for a fixed breakpoint-specific size instead of a raw `font-size`.
  A raw value is acceptable only when a third-party API or browser quirk cannot consume the scale.
- Keep `clamp()` only for deliberately fluid display/hero headings and established loader or
  success states where viewport interpolation is part of the design. Document any new exception;
  do not use a clamp as a one-off component token.
- A refactor of type tokens must preserve the computed production sizes at the locked breakpoints.
  Consolidation is not permission to redesign the page.

### Contextual inline links

- A contextual link inside article, service-detail or FAQ body copy inherits the surrounding text
  colour and keeps a visible underline. It must not fall back to the browser's blue link colour.
- Hover and keyboard focus use the same subtle opacity change (`0.68`) with the shared fast-motion
  token. Do not change size, weight or layout on interaction.
- Blue remains available for components whose approved design explicitly uses blue as an action or
  navigation treatment; this exception does not apply to ordinary inline copy links.

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

Use domain meaning where it improves clarity (`service-card`, `reviews`, `contact-form`, `faq`, `footer`, `legal-block`). Avoid visual-only names. **Spacing and type come from CSS custom-property tokens** (`--section-gap`, `--type-heading-2`, `--type-heading-3`, `--content-gutter`, …) defined in `:root` and the breakpoint `:root` blocks — NOT from utility classes. There are a few shared cross-page classes: `.heading-1`, `.heading-2`, `.button`, `.link-button`, `.section-label`.

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
