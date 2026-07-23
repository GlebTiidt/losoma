# LOSOMA Website

Рабочий репозиторий статического сайта LOSOMA Gebäudeservice.

## Current State

- **Production is live on Hostinger:** `https://losoma.de`.
- Production document root is `domains/losoma.de/public_html`; the contact backend is PHP.
- The former WordPress site and database are preserved as verified rollback backups.
- Vercel is legacy preproduction/rollback only and is not the active production form path.
- GA4 `G-QPX35L2ZGK`, Consent Mode v2 and reCAPTCHA v3 are active in production.
- Search Console ownership and the 15-URL sitemap are verified.
- Project-owned CSS classes use Client-First-style naming.

## Read First

- `HANDOFF.md` — start with `Immediate Handoff` for the latest deployment, cookie, legal, form and launch state.
- `SITE.md` — current site context and recent decisions.
- `CLAUDE.md` — project rules for agents.
- `DEPLOYMENT_CHECKLIST.md` — launch blockers, hosting, backup and release steps.
- `HOSTINGER_LAUNCH_CHECKLIST.md` — authoritative production migration, rollback and QA sequence.
- `SEO_CHECKLIST.md` — SEO tasks and domain/canonical status.
- `LEGALS_CHECKLIST.md` — legal/privacy launch checks.
- `DATENSCHUTZ_DRAFT.md` — current processing inventory and legal source of truth.
- `docs/SEO_AND_CLASS_GUIDELINES.md` — SEO and class naming rules.
- `docs/RESPONSIVE_GUIDELINES.md` — responsive layout rules.
- `docs/LEGAL_PAGES_GUIDELINES.md` — legal-page rules.

## Project Structure

```text
*.html                              Static pages
styles.css                          Global styles
script.js                           Site interactivity
api/contact.js                      Vercel contact-form endpoint
api/contact.php                     Hostinger contact-form endpoint
api/health.php                      Hostinger health endpoint
assets/generated/                   Generated AVIF/WebP images
assets/static/                      Static assets
assets/vendor/                      Vendored libraries and self-hosted Lato
scripts/build-static.mjs            Builds dist/
scripts/audit-client-first-classes.mjs
server/contact-config.example.php   Private Hostinger config template
dist/                               Generated output, do not edit directly
```

## Local Commands

```text
npm run build                 # static build into dist/
npm run audit:classes         # class naming audit
npm run audit:classes:strict  # strict Client-First audit
npm run audit:seo             # canonical, sitemap, JSON-LD, FAQ and breadcrumb audit
```

Deployable AVIF/WebP/MP4 assets are canonical. Heavy original media and the old image pipeline were
removed before the Hostinger release.

`npm run deploy` and `npm run deploy:preview` are intentionally disabled to prevent accidental uploads. Production deployment is an explicit, audited upload of generated `dist/` to Hostinger.

## Styling Rules

- Project-owned classes follow Client-First-style naming:
  - block: `hero`, `contact-form`, `legal-page`
  - element: one underscore, e.g. `hero_content`
  - state/variant: `is-*`, e.g. `button is-accent`
- Do not add project-owned `__` or `--` class separators.
- Third-party API classes stay unchanged, e.g. `splide__*`, `iti__*`.
- Prefer `data-*` hooks for JavaScript behavior.
- Use existing CSS variables and responsive rules from `styles.css`.
- Lato is self-hosted from `assets/vendor/lato/`; do not add external Google Fonts.

## Deployment Rule

Ordinary development ends at:

```text
npm run build
npm run audit:classes:strict
```

Final Hostinger launch requires explicit approval and must follow `HOSTINGER_LAUNCH_CHECKLIST.md`:

1. Build `dist/`.
2. Back up current Hostinger WordPress files and database.
3. Preserve rollback files: `.htaccess`, `wp-config.php`, `wp-content/uploads`.
4. Upload `dist/` to Hostinger `public_html`.
5. Verify HTTPS, clean URLs, canonical URLs, forms, legal pages, robots/sitemap and rollback path.

## Forms

- Frontend submits to `POST /api/contact`.
- Server validation, honeypot, rate limit, duplicate protection and frontend submit locking are implemented.
- Google Sheets delivery works via Apps Script through the Hostinger PHP endpoint.
- Public/legal/form recipient is `maxim@losoma.de`. Both production forms were verified after launch.
- Successful submission replaces the complete form with a green confirmation panel until reload. The required privacy checkbox acknowledges the privacy notice; it is not a separate consent.
- Turnstile is not used. Invisible reCAPTCHA v3 is active with server-side verification.

## Analytics And Consent

- GA4 is required and already created in the business Google account.
- Measurement ID: `G-QPX35L2ZGK`.
- Current GA4 setup: account `Losoma Gebäudeservice`, property `Losoma Website`, web stream `https://losoma.de`, timezone Germany/Berlin, currency EUR.
- Use direct `gtag.js` + Consent Mode v2. Do not use GTM unless requirements grow.
- Cookie banner UI and GA4 consent wiring are implemented in `script.js`/`styles.css`.
- GA4 does not load or activate before the user grants `Statistik` consent in the cookie banner.

## Open Post-launch Items

- Final legal/lawyer review and Hostinger/Google AVV/DPA confirmation.
- Exact owner/Rechtsform and DPO confirmation.
- Google Business Profile ownership transfer and final Maps URL.
- Confirm opening hours, service area, founding year, price range and additional real social links.
- Monitor forms, GA4 and Search Console for at least 72 hours; keep rollback backups.
