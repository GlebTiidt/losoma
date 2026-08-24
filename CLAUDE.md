# Losoma Project Rules

Plain HTML/CSS/JS website for LOSOMA Gebäudeservice in Berlin. The user is not a developer; keep
explanations practical and clear.

## Read first

1. `CHECKLIST.md` — the only master status, task, evidence and release checklist.
2. `SITE.md` — compact current technical state.
3. The applicable file in `docs/` before layout, class, blog, SEO or legal work.

Do not recreate separate handoff, legal, Google, Hostinger, deployment, SEO or question checklists
unless the user explicitly requests a client-facing standalone document. Current status and open
tasks still belong in `CHECKLIST.md`.
Update `CHECKLIST.md` after every meaningful discovery or external-admin action. Update `SITE.md`
only when the current technical/production state changes.

## Scope and safety

- Preserve unrelated dirty-worktree changes. Never reset or overwrite user work.
- Production changes require a direct request, a precise scope, build/audits, a dated rollback and
  live smoke verification.
- Do not submit a real contact form without warning and fresh permission; it creates Gmail and Sheet
  records.
- Never expose Hostinger private config, reCAPTCHA secret, Apps Script webhook secret, passwords,
  codes, customer data, billing data or closed legal documents.
- Do not change users, ownership, billing, legal entity, DPA acceptance or account permissions
  unless the user explicitly asks for that action.
- Commit and push only by direct request.
- Do not delete server rollback archives or the old WordPress/file/database backup without a
  separate decision.

## Production and build

- Production: `https://losoma.de` on Hostinger at `domains/losoma.de/public_html`.
- Confirmed SSH: user `u969184895`, host `46.202.156.161`, port `65002`, key
  `~/.ssh/losoma_deploy`.
- Build output is `dist/`; never edit generated production files as source of truth.
- Use:

```text
npm run build
npm run audit:classes:strict
npm run audit:seo
node --check script.js
git diff --check
```

- Follow the release gate in `CHECKLIST.md`; upload only the approved scope.
- Keep secrets and release archives outside `public_html`.

## Architecture

- Keep plain HTML/CSS/JS; do not add React, Vue, Vite or Webpack.
- Deployable media in `assets/generated` and `assets/static` is canonical.
- Clean URLs, redirects and PHP routing are controlled by `.htaccess`.
- Canonical production domain is `https://losoma.de`.
- `robots.txt` and `sitemap.xml` must remain aligned with the 15 indexable canonical pages.

## Classes and responsive rules

- Project classes use block, one underscore for elements and `is-*` for variants/state.
- Prefer `data-*` hooks for JavaScript behavior.
- Do not introduce project-owned `__`, `--`, throwaway or visual class names.
- Third-party classes such as `splide__*`, `iti__*` and `cc__*` are exceptions.
- Breakpoints: desktop `>=1025px`, tablet `<=1024px`, phone `<=560px`, burger `<=1150px`.
- Phone gutter: `16px`.
- Lato is self-hosted; do not add external Google Fonts.
- Typography has one global scale in `:root`: fixed `--font-size-*` primitives feed the shared
  semantic roles `--type-display`, `--type-heading-2`, `--type-title-large`, `--type-heading-3`,
  `--type-lead`, `--type-body`, `--type-small`, `--type-caption` and `--type-label`. Components must
  consume these roles; do not add component-specific type tokens or isolated fixed font sizes.
- Use `--type-heading-2` for section H2 and `--type-heading-3` for content H3. Keep `clamp()` only
  where fluid sizing is intentionally required for a display heading, responsive hero heading,
  loader or success state; do not introduce a clamp to work around a one-off component.
- Hero CTA bottom spacing is a layout invariant: `70px` on desktop (`>=1025px`) and `40px` on
  tablet/phone (`<=1024px`), independent of text wrapping.
- Contextual links inside body copy inherit the surrounding text colour, keep their underline and
  change only opacity on hover/focus. Do not make them browser-blue unless the approved design calls
  for an explicit blue action/navigation treatment.
- Secondary and supporting copy uses the shared `--color-muted` token. Do not repeat its hex value
  inside component selectors; changing the semantic token must update every muted text treatment.
- Preserve the current hero MP4 `1920×1080`, `5,731,171` bytes. Do not transcode it again without a
  new explicit decision.

## Forms and privacy

- All contact forms use shared `.contact-form` markup and `data-*` hooks.
- Endpoint: `POST /api/contact`.
- Protection: server validation, honeypot, rate limit, duplicate protection, frontend submit lock
  and reCAPTCHA v3 verification.
- Flow: Hostinger PHP → Apps Script → Google Sheet `Anfragen` + Workspace Gmail.
- Public and form email: `info@losoma.de`. `maxim@losoma.de` remains Workspace login/admin and
  reserve sender.
- The Datenschutz checkbox is acknowledgement (`Kenntnisnahme`), not separate consent.
- On success, replace the form with the persistent green confirmation until reload.
- Any field/requiredness change must be synchronized across every HTML form, PHP validation,
  Apps Script/Sheet mapping and Datenschutzerklärung.

## Analytics and consent

- GA4 Measurement ID: `G-QPX35L2ZGK`.
- Use direct `gtag.js` and Consent Mode v2; do not add GTM without a new requirement.
- Default `analytics_storage`, `ad_storage`, `ad_user_data` and `ad_personalization` are denied.
- Load GA4 only after `Statistik` consent. Keep ad consent denied unless Google Ads is added.
- On withdrawal, deny analytics and remove available `_ga`/`_ga_*` cookies.
- Preserve the approved two-layer cookie UX and floating settings button.

## Accounts, legal and SEO

- Current owners, access evidence, unresolved Hostinger/Google records, exact Maxim/Alexandr tasks,
  GBP transfer, Search Console status, legal changes, retention decisions and deferred SEO/content
  work are maintained only in `CHECKLIST.md`.
- Stage new service-page copy locally in the Git-ignored `docs/content-drafts/` and follow the
  approval, claim-safety, section-mapping and measurement workflow in
  `docs/SEO_AND_CLASS_GUIDELINES.md`. A content draft is never permission to rewrite a whole page,
  deploy it or expose unpublished client facts in the public repository.
- Treat `info@losoma.de` as the verified public address. Do not restore `maxim@losoma.de` in public
  HTML, legal pages, Schema or form configuration.
- Do not infer `Inhaber` from the Hostinger invoice.
- Do not create duplicate GBP, GA4 or Search Console properties.
- Do not request indexing for redirects, `.html` variants or trailing-slash duplicates. Count an
  indexing request only after Google explicitly displays `Indexierung wurde beantragt`.
- Do not invent coordinates, hours, founding date, price range, clients, cases, reviews,
  certifications or legal facts.
- Keep every JSON-LD graph synchronized with the current canonical page and the shared Organization
  `@id`. All Service nodes require current name/type/category/description/provider/audience/area,
  and `scripts/audit-seo.mjs` must pass before release. Do not emit an unconfirmed `legalName` or
  attach a person's social profile to the Organization node.

## Documentation

- `CHECKLIST.md` contains only current facts, open tasks and explicit “do not repeat” decisions.
- `SITE.md` contains current architecture and production state, not a historical diary.
- Do not reintroduce completed checkbox history. Add a short current-state fact instead.
- Closed PDFs, support answers and legal evidence belong in a private folder, not Git.
