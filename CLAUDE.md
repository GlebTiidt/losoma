# Losoma Project Rules

This is a plain HTML/CSS/JS website for LOSOMA Gebäudeservice in Berlin.
The user is not a developer, so explanations should stay practical and clear.

## Read First

Before changing code, read:

- `HANDOFF.md`, starting with `Immediate Handoff`, for the latest environment, deployment and launch state.
- `SITE.md` for current project state and recent decisions.
- `DEPLOYMENT_CHECKLIST.md` for launch blockers and hosting rules.
- `GOOGLE_ACCOUNT_TRANSFER_CHECKLIST.md` before Google Workspace, Google Business Profile,
  Gmail/DNS, Analytics, Search Console, Sheets or Apps Script ownership/access work.
- `SEO_CHECKLIST.md` before SEO, canonical, sitemap, Schema.org or Google Business Profile work.
- `LEGALS_CHECKLIST.md` and `docs/LEGAL_PAGES_GUIDELINES.md` before legal-page or privacy-policy work.
- `docs/RESPONSIVE_GUIDELINES.md` before layout/responsive work.
- `docs/SEO_AND_CLASS_GUIDELINES.md` before adding or renaming classes.

Update `SITE.md` after meaningful code or rule changes.

## Current Hosting Rule

- **Active work scope is Vercel staging only:** `https://losoma-pi.vercel.app`.
- **Do not touch the current WordPress site at all.** Do not edit, deploy, upload, inspect through the admin panel, test forms, send requests to WordPress endpoints, or use Hostinger/WordPress access unless the user explicitly changes this rule for a specific task.
- Do not use `https://losoma.de` for current QA. All browser, form, API, cookie, analytics, legal-page and deployment checks must target the Vercel staging URL.
- Do not submit live/staging forms or create rows, emails, analytics events, or other external test data without explicitly warning the user first and receiving permission.
- Final production target: Hostinger `public_html` for `https://losoma.de`.
- Current Hostinger production contains the old WordPress site and must not be overwritten during ordinary development.
- Vercel `https://losoma-pi.vercel.app` is staging/preview and currently also hosts the `/api/contact` endpoint.
- Cloudflare Pages is not the final hosting target unless the client explicitly changes that decision.
- Do not deploy or upload to Hostinger unless explicitly asked and the backup/rollback steps are ready.

Before Hostinger launch:

- Obtain explicit task-specific authorization; existing access does not authorize touching WordPress/Hostinger.
- Build with `npm run build`.
- Back up Hostinger `public_html`, `.htaccess`, `wp-config.php`, `wp-content/uploads`, and the WordPress database.
- Keep a clear rollback path before replacing WordPress files with `dist/`.

## Build Workflow

Use:

```text
npm run build
npm run audit:classes
npm run audit:classes:strict
```

Do not run the image pipeline for ordinary HTML/CSS/JS/text edits.

Use image commands only when source images changed:

```text
npm run assets:images
npm run build:images
```

`dist/` is generated output. Do not edit `dist/` directly.

Do not auto-deploy to Vercel or Hostinger. Deploy only when explicitly requested.

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

## Forms

- Every contact form uses the shared `.contact-form` markup and `data-*` hooks.
- Form endpoint: `POST /api/contact`.
- Current backend protection: server validation, honeypot, rate limit, duplicate protection, frontend submit lock.
- Google Sheet delivery works through Apps Script.
- Email notification to `losoma@web.de` is still pending WEB.DE SMTP/app password.
- Turnstile is intentionally deferred unless spam or paid traffic makes it necessary.

## Analytics And Cookie Consent

- GA4 is required. Measurement ID: `G-ST55QF95VS`.
- Google Analytics setup already exists: account `Losoma Gebäudeservice`, property `Losoma Website`, web stream `https://losoma.de`, timezone Germany/Berlin, currency EUR, industry `Immobilien`, size `Klein: 1 bis 10 Mitarbeiter`, goals `Leads generieren` + `Web- und/oder App-Traffic analysieren`.
- Use direct `gtag.js` with Google Consent Mode v2. Do not add GTM unless requirements grow.
- Default consent must be denied for `analytics_storage`, `ad_storage`, `ad_user_data`, and `ad_personalization`.
- Grant only `analytics_storage` after the user enables/accepts `Statistik`; keep ads fields denied unless Google Ads is added later.
- Do not load or activate GA4 before cookie consent. If `Statistik` is revoked, set consent denied and delete `_ga` / `_ga_*` cookies.
- Cookie banner UI is implemented in `script.js`/`styles.css`; keep future edits aligned with the approved Figma direction and existing Client-First naming.
- Approved consent UX: first layer `Ihre Privatsphäre ist uns wichtig` with `Alle ablehnen`, `Alle akzeptieren`, `Einstellungen`, no close icon before the first choice. Second layer: `Notwendige Cookies` disabled ON / `Immer aktiv`, `Statistik` OFF by default, secondary `Alle akzeptieren`, primary `Auswahl speichern`. Only the floating cookie icon reopens the second layer after a saved choice; there is no footer cookie button.
- Floating cookie UI: button `44×44px`, icon `32×32px`, page-color background, ink icon, neutral hover. Desktop is bottom-left; tablet `≤1024px` and phone `≤560px` are bottom-right, with the panel aligned to the same side.

## Google Account Transfer

- Current Google Business Profile primary owner is `losoma@web.de`.
- Managed Workspace account `maxim@losoma.de` exists and has access to Google Admin Console.
- An invitation was sent to `maxim@losoma.de` as Google Business Profile `Inhaber`; last known
  status on 2026-07-20 is pending (`AUSSTEHEND`), not accepted.
- Never delete or recreate the existing Business Profile to move accounts. Add the new account as
  owner, accept, wait Google's required 7 days, transfer primary ownership, and keep the old account
  as a temporary backup.
- Workspace billing/payment verification must be stable before making it the primary owner of
  business assets. Never store or expose payment details in repository files or handoff notes.
- Transfer GA4/Search Console/Sheets/Apps Script access separately. Do not create a replacement GA4
  property or change measurement ID `G-ST55QF95VS` merely because the managing account changes.
- As of 2026-07-20, public DNS still routes `losoma.de` mail to Hostinger and authorizes Hostinger in
  SPF; Gmail receipt at `maxim@losoma.de` is not proven. Do not forward WEB.DE or switch form email
  until Gmail is activated, DNS is correct, and an explicitly authorized external delivery test passes.
- Keep `losoma@web.de` and copies of forwarded messages during the transition. Remove old access or
  change public/legal email only after every dependent service has been verified.
- The detailed source of truth and resume order is `GOOGLE_ACCOUNT_TRANSFER_CHECKLIST.md`.

## SEO Rules

- Production canonical domain is `https://losoma.de`.
- `canonical` and `og:url` must use `https://losoma.de`.
- `og:image` should be absolute before final production SEO QA.
- `robots.txt` exists; `sitemap.xml` is still pending.
- Structured data is pending required business facts: opening hours, coordinates, address/legal confirmation, founding date/price range if used.
- Do not add `FAQPage` JSON-LD unless visible FAQ content and current Google requirements justify it.
- Blog/Einblicke content is deferred until after production launch. Keep the commented header/footer links disabled until the user explicitly reopens that work.

## Legal Rules

- `impressum.html` and `datenschutz.html` use the shared `.legal-page` component.
- Current public legal names: Maxim Soga / Alexandr Lozinschi; legal form: Einzelunternehmen. Final owner wording still needs registration/lawyer confirmation.
- Confirmed current business address: `Falkenseer Chaussee 247C, 13583 Berlin`. There is no customer office at this address.
- Datenschutz hosting text now targets Hostinger / `HOSTINGER INTERNATIONAL LIMITED`, Cyprus.
- Hostinger AVV/DPA must be activated or confirmed before final launch.
- Vercel DPA is still relevant while `/api/contact` processes form submissions there.
- The current Datenschutz page intentionally includes not-yet-live services for lawyer review: consent banner, GA, Turnstile.
- Before launch, remove the Turnstile section if Turnstile remains disabled, or enable and contractually document the service.

## Git And Safety

- The worktree may contain user changes. Do not revert unrelated changes.
- Do not use destructive git commands unless explicitly requested.
- Keep changes scoped.
- After finishing, summarize changed files and verification commands.
