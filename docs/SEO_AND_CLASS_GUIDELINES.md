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

## Class Naming Rules

Classes are for maintainable styling. They are not SEO signals by themselves, but the names must be semantic and stable so the code remains understandable.

Use a small design-system layer plus section/component-specific BEM-style classes.

### Global Layout Classes

- `.page`
- `.page-main`
- `.container`
- `.section`
- `.section--compact`
- `.section--spacious`
- `.section-header`
- `.section-eyebrow`
- `.section-title`
- `.section-description`

### Global Typography Classes

These classes are not tied to a page or section.

- `.heading-1`
- `.heading-2`
- `.heading-3`
- `.heading-4`
- `.text-lead`
- `.text-body`
- `.text-small`
- `.text-muted`
- `.link-text`

Use semantic HTML tags separately:

```html
<h1 class="heading-1">Zuverlässige Gebäudedienstleistungen für Berliner Immobilien</h1>
<h2 class="heading-2">Unsere Leistungen</h2>
```

### Global UI Classes

- `.button`
- `.button--primary`
- `.button--secondary`
- `.button--ghost`
- `.button__icon`
- `.form`
- `.form-field`
- `.form-label`
- `.form-input`
- `.form-textarea`
- `.form-error`
- `.form-success`

### Section And Component Classes

Use section names only where the element belongs to that section.

Examples:

- `.site-header`
- `.site-header__nav`
- `.site-footer`
- `.hero`
- `.hero__content`
- `.hero__actions`
- `.hero__media`
- `.service-overview`
- `.service-grid`
- `.service-card`
- `.service-card__title`
- `.service-card__description`
- `.trust-metrics`
- `.trust-metric`
- `.benefits`
- `.benefit-card`
- `.process`
- `.process-step`
- `.team-preview`
- `.contact-cta`
- `.faq`
- `.faq-item`
- `.faq-question`
- `.faq-answer`

### Forbidden Class Patterns

Do not use:

- `.section-1`
- `.block-left`
- `.home-title`
- `.main-page-card-3`
- `.blue-text`
- `.big-title`
- `.text-wrapper`
- `.div-block`
- `.copy-1`
- `.new-section`

Avoid page-specific utility classes unless the page genuinely has a unique component.

## Image Rules

Every meaningful image needs:

- Descriptive filename.
- `alt`.
- `title` when it adds useful machine context.
- `width` and `height` where possible.
- `loading="lazy"` except for the primary above-the-fold image.
- `decoding="async"` for non-critical images.

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
