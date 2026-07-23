# Losoma Project Rules

This is a plain HTML/CSS/JS website for LOSOMA Gebäudeservice in Berlin.
The user is not a developer, so explanations should stay practical and clear.

## Read First

Before changing code, read:

- `HANDOFF.md`, starting with `Immediate Handoff`, for the latest environment, deployment and launch state.
- `SITE.md` for current project state and recent decisions.
- `DEPLOYMENT_CHECKLIST.md` for launch blockers and hosting rules.
- `HOSTINGER_LAUNCH_CHECKLIST.md` before any Hostinger inspection, backup, migration or launch work.
- `GOOGLE_ACCOUNT_TRANSFER_CHECKLIST.md` before Google Workspace, Google Business Profile,
  Gmail/DNS, Analytics, Search Console, Sheets or Apps Script ownership/access work.
- `SEO_CHECKLIST.md` before SEO, canonical, sitemap, Schema.org or Google Business Profile work.
- `SEO_RANKING_CHECKLIST.md` before keyword-position monitoring or Search Console performance work.
- `LEGALS_CHECKLIST.md`, `DATENSCHUTZ_DRAFT.md` and `docs/LEGAL_PAGES_GUIDELINES.md` before legal-page or privacy-policy work.
- `docs/RESPONSIVE_GUIDELINES.md` before layout/responsive work.
- `docs/BLOG_GUIDELINES.md` before blog index, article, editorial layout or article SEO work.
- `docs/SEO_AND_CLASS_GUIDELINES.md` before adding or renaming classes.

Update `SITE.md` after meaningful code or rule changes.

## Current Hosting Rule

- **Production is live on Hostinger:** `https://losoma.de` serves the static site from
  `domains/losoma.de/public_html` with the PHP contact backend.
- The old WordPress installation was replaced on 2026-07-23 only after a verified file/database
  backup. Keep the rollback copies; do not delete the WordPress backup or database without a
  separate explicit decision.
- Production deployments require an explicit request, `npm run build`, all audits, and a production
  smoke test. Upload generated `dist/`; never edit generated production files as the source of truth.
- Do not submit a real form or create Google Sheet/email test data without warning the user and
  receiving permission. Read-only HTTP/SEO checks are allowed.
- Hostinger secrets and state stay outside `public_html` and Git. Never print or copy them into docs.
- Current rollback and SSH details are recorded in `HOSTINGER_LAUNCH_CHECKLIST.md` and `HANDOFF.md`.

## Build Workflow

Use:

```text
npm run build
npm run audit:classes
npm run audit:classes:strict
```

Deployable media in `assets/generated` and `assets/static` is canonical. Original media and the old
image pipeline were removed before the Hostinger release.

`dist/` is generated output. Do not edit `dist/` directly.

Do not auto-deploy to Hostinger. Deploy only when explicitly requested.

## Class Naming

Project-owned classes use Client-First-style naming:

- Block: `hero`, `contact-form`, `legal-page`.
- Element: one underscore, e.g. `hero_content`, `contact-form_submit`, `legal-page_inner`.
- Variant/state: `is-*`, e.g. `button is-accent`, `link-button is-green`, `body.is-solid-header`, `is-open`, `is-invalid`.
- JS behavior should prefer `data-*` hooks. Styling classes can be queried only when no practical data hook exists.

Forbidden for project-owned classes:

- Project-owned `__` and `--` class separators.
- Visual/throwaway names such as `block-left`, `blue-text`, `div-block`, `section-1`.

Allowed exceptions:

- Third-party library classes such as `splide__*`, `iti__*`, `cc__*`.
- CSS custom properties such as `--section-gap`.
- JS object/property names such as `window.__lenis`.

Run `npm run audit:classes:strict` after class work.

## Design And Responsive Rules

- Keep the site plain HTML/CSS/JS. Do not introduce React/Vue/Vite/Webpack.
- Use existing tokens in `styles.css` for spacing, color, radius and type.
- Breakpoints are fixed:
  - Desktop base: `>= 1025px`.
  - Tablet: `@media (max-width: 1024px)`.
  - Phone: `@media (max-width: 560px)`.
  - Header burger: `@media (max-width: 1150px)`.
- Phone side gutter is 16px.
- Preserve the existing button families:
  - `.button.is-accent`
  - `.button.is-static`
  - `.link-button` / `.link-button.is-green`
- Do not reintroduce the rejected desktop header shrink animation, shadow/hairline, or progressive blur.
- Avoid external Google Fonts. Lato is self-hosted in `assets/vendor/lato/`.
- Reuse component typography instead of duplicating declarations. The article lead
  `.blog-article_lead` deliberately shares font size, weight, line-height and tracking with
  `.quality-claim_title`; only article grid placement and spacing are unique.
- Blog article media, H1/subtitle, lead and long-form body use 8 of 12 columns on desktop and
  the full container at `<=1024px`.
- `.hero_title`, `.blog-index_title` and `.blog-article_title` share the same responsive H1
  clamps. Keep the shared desktop clamp after the blog title's base typography so the cascade
  cannot replace it with a fixed token. The article subtitle has its own responsive clamp.

## Forms

- Every contact form uses the shared `.contact-form` markup and `data-*` hooks.
- Form endpoint: `POST /api/contact`.
- Current backend protection: server validation, honeypot, rate limit, duplicate protection, frontend submit lock.
- Google Sheet delivery works through Apps Script.
- Public/legal/form recipient is `maxim@losoma.de`; HTTP 200, Gmail delivery and the `Anfragen` row were verified on 2026-07-22.
- Apps Script requires only the synchronized `CONTACT_WEBHOOK_SECRET` Script Property; the Sheet ID is fixed in the deployed code and local template.
- On success, hide the complete form and keep the green confirmation panel with larger black text visible until reload.
- The privacy checkbox is an acknowledgement (`zur Kenntnis genommen`), not a separate consent.
- Turnstile is not used. Invisible reCAPTCHA v3 is active with server-side verification.

## Analytics And Cookie Consent

- GA4 is required. Measurement ID: `G-QPX35L2ZGK`.
- Google Analytics setup already exists: account `Losoma Gebäudeservice`, property `Losoma Website`, web stream `https://losoma.de`, timezone Germany/Berlin, currency EUR, industry `Immobilien`, size `Klein: 1 bis 10 Mitarbeiter`, goals `Leads generieren` + `Web- und/oder App-Traffic analysieren`.
- Use direct `gtag.js` with Google Consent Mode v2. Do not add GTM unless requirements grow.
- Default consent must be denied for `analytics_storage`, `ad_storage`, `ad_user_data`, and `ad_personalization`.
- Grant only `analytics_storage` after the user enables/accepts `Statistik`; keep ads fields denied unless Google Ads is added later.
- Do not load or activate GA4 before cookie consent. If `Statistik` is revoked, set consent denied and delete `_ga` / `_ga_*` cookies.
- Cookie banner UI is implemented in `script.js`/`styles.css`; keep future edits aligned with the approved Figma direction and existing Client-First naming.
- Approved consent UX: first layer `Ihre Privatsphäre ist uns wichtig` with `Alle ablehnen`, `Alle akzeptieren`, `Einstellungen`, no close icon before the first choice. Second layer: `Notwendige Cookies` disabled ON / `Immer aktiv`, `Statistik` OFF by default; `Auswahl speichern` is the secondary left button and `Alle akzeptieren` is the primary right button. Only the floating cookie icon reopens the second layer after a saved choice; there is no footer cookie button.
- Floating cookie UI: button `44×44px`, icon `32×32px`, page-color background, ink icon, neutral hover. Desktop is bottom-left; tablet `≤1024px` and phone `≤560px` are bottom-right, with the panel aligned to the same side.

## Google Account Transfer

- Current Google Business Profile primary owner is `losoma@web.de`.
- Managed Workspace account `maxim@losoma.de` exists and has access to Google Admin Console.
- An invitation was sent to `maxim@losoma.de` as Google Business Profile `Inhaber`; last known status
  on 2026-07-21 is pending (`AUSSTEHEND`) and support case `2-2514000041594` is open.
- Never delete or recreate the existing Business Profile to move accounts. Add the new account as
  owner, accept, wait Google's required 7 days, transfer primary ownership, and keep the old account
  as a temporary backup.
- Workspace billing/payment verification succeeded; the paid period starts 2026-08-03. Never store
  or expose payment details in repository files or handoff notes.
- GA4 and Search Console are already configured in Maxim's account. Keep production Measurement ID
  `G-QPX35L2ZGK`; do not restore the old ID or create another property without a separate reason.
- Gmail for `losoma.de` is active: Google MX/SPF/DKIM are published and inbound/outbound delivery was
  tested. WEB.DE permanently forwards to `maxim@losoma.de` while retaining copies; keep it as backup.
- The detailed source of truth and resume order is `GOOGLE_ACCOUNT_TRANSFER_CHECKLIST.md`.

## SEO Rules

- Production canonical domain is `https://losoma.de`.
- `canonical` and `og:url` must use `https://losoma.de`.
- `og:image` should be absolute before final production SEO QA.
- `robots.txt` and `sitemap.xml` are live and Google Search Console processed all 15 sitemap URLs.
- Every indexable page must keep one production canonical, `index, follow`, an absolute OG image,
  and valid JSON-LD. Every non-home page requires `BreadcrumbList`.
- Visible FAQ content on the homepage and all nine service pages has matching `FAQPage` JSON-LD.
  Keep the HTML questions/answers and schema text identical; `npm run audit:seo` enforces this.
- Do not invent opening hours, coordinates, founding date or price range. Add them after Maxim
  confirms the business facts. Add the Google Maps/Business Profile URL to `sameAs` after ownership
  transfer and the final public profile URL are confirmed.
- Keep the Facebook and Instagram footer markup commented out until their real profile URLs are
  confirmed; do not activate placeholder links.
- Blog/Einblicke is active. Keep `/blog` in the desktop header, footer navigation and burger menu
  on every page. Six SEO articles are planned; only the published article may appear as a live card.
- Article pages require one H1, sequential H2/H3 structure, semantic lists, unique metadata,
  canonical/OG/Twitter fields, `BlogPosting`, `WebPage` and `BreadcrumbList` schema, plus processed
  AVIF/WebP imagery with useful `alt`, `title`, width and height.
- Use `SEO_RANKING_CHECKLIST.md` as the stable keyword-to-page map. Measure 28-day trends in
  impressions, clicks, CTR and average position, filtered to Germany and checked by device; do not
  treat a personalized manual Google search as authoritative ranking data.

## Legal Rules

- `impressum.html` and `datenschutz.html` use the shared `.legal-page` component.
- Current public legal names: Maxim Soga / Alexandr Lozinschi; legal form: Einzelunternehmen. Final owner wording still needs registration/lawyer confirmation.
- Confirmed current business address: `Falkenseer Chaussee 247C, 13583 Berlin`. There is no customer office at this address.
- Datenschutz documents the current Hostinger → Google Apps Script → Sheet `Anfragen` + Gmail
  flow, consent storage, consent-gated GA4 and active reCAPTCHA v3.
- Hostinger and Google AVV/DPA status must be documented against the exact legal entity.
- Do not assert that no DPO is required. Ask whether one has been appointed and obtain legal confirmation.
- Keep legal facts synchronized with confirmed client answers before every production release.

## Git And Safety

- The worktree may contain user changes. Do not revert unrelated changes.
- Do not use destructive git commands unless explicitly requested.
- Keep changes scoped.
- After finishing, summarize changed files and verification commands.
