# LOSOMA Website

Рабочий репозиторий статического сайта LOSOMA Gebäudeservice.

## Current State

- **Active work/QA target is only Vercel staging:** `https://losoma-pi.vercel.app`.
- **WordPress/Hostinger are out of scope** until the user explicitly authorizes a specific backup or launch task. Existing access is not permission to inspect or change production.
- Production domain/canonical: `https://losoma.de`.
- Final hosting target: Hostinger `public_html`.
- Current live Hostinger site is still the old WordPress install; do not overwrite it during ordinary development.
- Vercel `https://losoma-pi.vercel.app` is staging/preview and currently hosts `/api/contact`.
- Cloudflare Pages is historical/optional and is not the final hosting target unless the client explicitly changes the decision.
- Project-owned CSS classes use Client-First-style naming.

## Read First

- `HANDOFF.md` — start with `Immediate Handoff` for the latest deployment, cookie, legal, form and launch state.
- `SITE.md` — current site context and recent decisions.
- `CLAUDE.md` — project rules for agents.
- `DEPLOYMENT_CHECKLIST.md` — launch blockers, hosting, backup and release steps.
- `SEO_CHECKLIST.md` — SEO tasks and domain/canonical status.
- `LEGALS_CHECKLIST.md` — legal/privacy launch checks.
- `docs/SEO_AND_CLASS_GUIDELINES.md` — SEO and class naming rules.
- `docs/RESPONSIVE_GUIDELINES.md` — responsive layout rules.
- `docs/LEGAL_PAGES_GUIDELINES.md` — legal-page rules.

## Project Structure

```text
*.html                              Static pages
styles.css                          Global styles
script.js                           Site interactivity
api/contact.js                      Vercel contact-form endpoint
assets/source/                      Source images
assets/generated/                   Generated AVIF/WebP images
assets/static/                      Static assets
assets/vendor/                      Vendored libraries and self-hosted Lato
scripts/build-static.mjs            Builds dist/
scripts/optimize-images.mjs         Image pipeline
scripts/audit-client-first-classes.mjs
dist/                               Generated output, do not edit directly
```

## Local Commands

```text
npm run build                 # static build into dist/
npm run audit:classes         # class naming audit
npm run audit:classes:strict  # strict Client-First audit
npm run assets:images         # image optimization only when source images changed
npm run build:images          # image optimization + static build
```

Do not run the image pipeline for ordinary HTML/CSS/JS/text edits.

`npm run dev` still uses Wrangler Pages dev as a local/static preview helper. It is not a production hosting decision.

`npm run deploy` and `npm run deploy:preview` are intentionally disabled to prevent accidental Cloudflare Pages uploads. Use Hostinger launch steps from `DEPLOYMENT_CHECKLIST.md` for production, and Vercel staging only when explicitly requested.

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

Final Hostinger launch requires explicit approval and must follow `DEPLOYMENT_CHECKLIST.md`:

1. Build `dist/`.
2. Back up current Hostinger WordPress files and database.
3. Preserve rollback files: `.htaccess`, `wp-config.php`, `wp-content/uploads`.
4. Upload `dist/` to Hostinger `public_html`.
5. Verify HTTPS, clean URLs, canonical URLs, forms, legal pages, robots/sitemap and rollback path.

## Forms

- Frontend submits to `POST /api/contact`.
- Server validation, honeypot, rate limit, duplicate protection and frontend submit locking are implemented.
- Google Sheets delivery works via Apps Script.
- Email delivery to `losoma@web.de` is pending WEB.DE SMTP/app-password access.
- Turnstile is deferred unless spam or paid traffic makes it necessary.

## Analytics And Consent

- GA4 is required and already created in the business Google account.
- Measurement ID: `G-ST55QF95VS`.
- Current GA4 setup: account `Losoma Gebäudeservice`, property `Losoma Website`, web stream `https://losoma.de`, timezone Germany/Berlin, currency EUR.
- Use direct `gtag.js` + Consent Mode v2. Do not use GTM unless requirements grow.
- Cookie banner UI and GA4 consent wiring are implemented in `script.js`/`styles.css`.
- GA4 does not load or activate before the user grants `Statistik` consent in the cookie banner.

## Open Launch Items

- Hostinger/SFTP/SSH and database access exist; backup/rollback execution still requires explicit launch authorization.
- Final legal/lawyer review and Hostinger AVV/DPA confirmation.
- WEB.DE SMTP/app password for email notifications.
- Cookie banner / GA4 manual browser QA and final legal/privacy review.
- `sitemap.xml`.
- Final production QA on `losoma.de`.
- Google Search Console setup after launch.
