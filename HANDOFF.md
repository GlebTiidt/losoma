# LOSOMA Handoff

## Immediate Handoff — 2026-07-23 (production live)

This section supersedes conflicting historical launch and Vercel/WordPress notes below.

### Production

- The static LOSOMA site is live at `https://losoma.de` on Hostinger. Document root:
  `domains/losoma.de/public_html`; backend: PHP on Hostinger shared hosting.
- The old WordPress site was replaced after verified file and database backups. Keep all rollback
  copies until a separate retention/removal decision is made.
- reCAPTCHA v3 is active with server-side verification. Both contact forms were confirmed working
  in production. The badge is hidden only together with the required Google Privacy/Terms notice
  directly below the form privacy acknowledgement.
- Custom cookie consent stays interactive without blocking the rest of the site. GA4 loads only
  after `Statistik` consent and can be revoked from the floating cookie control.
- Active GA4 property belongs to Maxim's account. Measurement ID: `G-QPX35L2ZGK`. Production
  Realtime confirmed `page_view`, `cta_click` and `form_start`. Safari/1Blocker correctly blocks GA
  unless the site is allowlisted; this is expected and must not be bypassed.

### Search and structured data

- Google Search Console domain ownership is verified. `https://losoma.de/sitemap.xml` was processed
  successfully with 15 discovered pages, and reindexing of the homepage was requested.
- Production SEO audit on 2026-07-23: all 15 sitemap pages return HTTP 200, `index, follow`, a unique
  production canonical and no blocking `X-Robots-Tag`. `robots.txt` allows all crawlers and points
  to the production sitemap.
- JSON-LD parses on every page. Breadcrumbs exist on every non-home page. Homepage and all nine
  service pages contain `FAQPage` matching the visible FAQ HTML. Organization links include the
  currently confirmed LinkedIn and legal/document URLs.
- Pending structured facts: confirmed opening hours, price range, founding year, final service area,
  additional real social URLs, and Google Maps/Business Profile URL after ownership transfer.

### Remaining client/legal work

- The current short question list is `MAXIM_QUESTIONS.md`. Main blockers are exact registered owner
  and legal form, DPO status, AVV/DPA confirmations, access/2FA review and final lawyer review.
- Google Business Profile transfer to `maxim@losoma.de` remains open under support case
  `2-2514000041594`. Never delete or recreate the existing profile.
- Standard GA4 reports can take 24–48 hours; Realtime already proves collection. A browser content
  blocker may intentionally suppress analytics for that browser.

## Historical Handoff — 2026-07-22

Historical record only. The 2026-07-23 production section above is the current source of truth.

### Google Account Transfer

- New managed Google Workspace account confirmed: `maxim@losoma.de`; Google Admin Console is
  accessible.
- Existing Google Business Profile remains safe under primary owner `losoma@web.de`.
- A fresh `Inhaber` invitation to `maxim@losoma.de` remains pending (`AUSSTEHEND`) but is not
  delivered and does not appear in the invited account. Google Business Profile Support case
  `2-2514000041594` was submitted on 2026-07-21. Do not create a duplicate profile or repeatedly
  revoke/reissue the invite; resume from the support response.
- Do not delete/recreate the Business Profile. After acceptance, wait 7 days before transferring
  `Primärer Inhaber`; keep the old account as a temporary backup.
- Workspace payment verification succeeded; the confirmed bank account is the primary payment
  method and the paid period starts 2026-08-03. No bank details are stored in the repository.
- Gmail for `losoma.de` is active. Authoritative MX points to `smtp.google.com`; SPF authorizes
  Google; Google DKIM (2048-bit) is published; DMARC remains `p=none`. Direct inbound/outbound tests
  passed. Permanent WEB.DE forwarding to `maxim@losoma.de` is active with copies retained, and an
  independent test arrived in both mailboxes. Keep WEB.DE active as a forwarding/backup mailbox;
  the public/legal/form address is now `maxim@losoma.de`.
- GA4 must be shared to the new account, not recreated. Keep account/property/history and
  measurement ID `G-QPX35L2ZGK`. Search Console, Sheets and Apps Script access transfer separately.
- Full state, safety rules and resume order: `GOOGLE_ACCOUNT_TRANSFER_CHECKLIST.md`.

### Environment And Deployment

- Work and QA **only** on Vercel staging: `https://losoma-pi.vercel.app`.
- The user authorized read-only Hostinger inspection and a full backup on 2026-07-22. Those tasks
  are complete. This does not authorize staging upload, production replacement, database writes or
  DNS changes; obtain a new explicit permission for the next mutation.
- Hostinger is Business shared hosting with PHP 8.2.30 and no Node.js. The production backend is
  therefore implemented in PHP. Document root: `domains/losoma.de/public_html`.
- Current WordPress 7.0.2 remains untouched and live. After backup it returned HTTP 200 and still
  exposed the WordPress API headers. Do not remove, move or overwrite it without a later explicit GO.
- Server backup: `~/backups/losoma-prelaunch-20260722-1836/`. Persistent local copy:
  `/Users/glebstepanovich/ShipStudio/backups/losoma-prelaunch-20260722-1836/`. Both file and DB
  archives passed SHA-256 and gzip verification; exact hashes are in `HOSTINGER_LAUNCH_CHECKLIST.md`.
- Hostinger release archive: `/Users/glebstepanovich/ShipStudio/releases/losoma-hostinger-rc-20260722.tar.gz`.
  It is 27 MB compressed and its SHA-256 is recorded in `HOSTINGER_LAUNCH_CHECKLIST.md`.
- Next session: capture read-only DNS/SSL/redirect/cron state, then request permission to create a
  protected `staging.losoma.de`; do not upload into the active `public_html`.
- Do not submit the staging form or create Google Sheet rows, emails or analytics test events without warning the user and receiving permission first.
- Vercel CLI authentication was restored on 2026-07-15. Deploy only when explicitly requested, using `vercel --prod --yes`; in this project that updates the staging alias, not the WordPress site.
- Current verified Vercel preproduction deployment (2026-07-22): deployment ID `dpl_Dv1BKwGY6zkakE4zQNEwn32Pr4a6`, immutable URL `https://losoma-l62y0mv24-gleb-projects-work.vercel.app`, alias `https://losoma-pi.vercel.app`. The alias returned the updated Datenschutz page and `/kontakt` returned HTTP 200 after deployment.

### Current Cookie UI

- Custom CMP only; implementation is in `script.js` and `styles.css`.
- First layer has `Alle ablehnen`, `Alle akzeptieren`, `Einstellungen`; no close/X before the first decision. `Statistik` defaults OFF and GA4 stays inactive until consent.
- In second-layer settings, `Auswahl speichern` is the secondary left button and `Alle akzeptieren` is the primary right button. Turning `Statistik` off and saving is the granular rejection path; the explicit one-click `Alle ablehnen` remains on the first layer.
- The footer `Cookie-Einstellungen` control was deliberately removed. Reopening settings is done only with the floating cookie button.
- Floating button: `44×44px`; cookie SVG: `32×32px`, centered; button background `var(--color-page)` (`#fdfdfc`), icon `var(--color-ink)`, neutral hover `var(--color-surface-hover)` (`#ededed`), no shadow.
- Desktop: button and panel bottom-left with `var(--content-gutter)` offset.
- Tablet `≤1024px`: button and panel bottom-right with `24px` inset.
- Phone `≤560px`: button and panel bottom-right with `16px` inset.
- Panel: up to `500px`, `16px` padding, `4px` radius, `rgba(253,253,252,.9)` background and `4px` backdrop blur. No dark full-screen visual backdrop.
- Legal UX note: the reject action is already on the first layer and takes one click. Before launch, consider giving accept/reject comparable visual prominence to reduce nudging risk.

### Current Blog And Editorial Rules

- Blog index: `/blog`; first article: `/blog/hausmeister-vs-externer-spezialist`.
- `Einblicke → /blog` is enabled in the desktop header, footer and burger menu on every page.
- Six SEO articles are planned, but only the first is published and shown as a card.
- Desktop article H1/subtitle, image, two-paragraph lead and body align to 8 of the shared 12 columns. At `<=1024px` they use the full content container.
- `.blog-article_lead` reuses the exact `.quality-claim_title` typography from all service pages. Do not give it independent font size, weight, line-height or letter-spacing.
- `.hero_title`, `.blog-index_title` and `.blog-article_title` share the same desktop/tablet/phone `clamp()` behavior. The article subtitle also uses `clamp()`. Preserve CSS source order so a later fixed `font-size` cannot override the desktop H1 clamp.
- The article image is the processed 1600px AVIF/WebP pair. Do not restore the heavy original PNG to the repository.
- Article SEO includes unique metadata plus `BlogPosting`, `WebPage` and `BreadcrumbList`; see `docs/BLOG_GUIDELINES.md`.

### Current Legal And Business Data

- Public names: `Maxim Soga / Alexandr Lozinschi`; legal form shown as `Einzelunternehmen`. Confirm the exact owner/Verantwortlicher wording against registration documents or with a lawyer before launch.
- Business address: `Falkenseer Chaussee 247C, 13583 Berlin, Deutschland`.
- The address is marked `Geschäftsadresse · kein Kundenbüro vor Ort`; there is no customer office.
- Phone: `+49 176 44434111`; email: `maxim@losoma.de`; USt-IdNr. `DE357950597`; Steuernummer `19/537/02292`.
- `impressum.html`, `datenschutz.html`, `kontakt.html`, the homepage, all service pages and every shared footer use the updated address.
- Final legal review is still required. Confirm the registered proprietor/legal form, whether a Datenschutzbeauftragter has been appointed, the operational retention period and the AVV/DPA status for Hostinger, Vercel and Google.

### Form, Analytics And Launch Blockers

- `POST /api/contact` is implemented with server validation, honeypot, rate limit, duplicate protection and frontend submit locking.
- Public/legal/form email and Vercel recipient are `maxim@losoma.de`. A new empty Google Sheet and bound Apps Script were created under Workspace `maxim@losoma.de`; the Sheet ID is `1yaw-UptCIAixOORNwTrwnbrqoeraSiU4iEoV8HMyvxU`. The new Web App `/exec` URL is stored in Vercel Production and the staging alias was redeployed successfully.
- The form delivery path was repaired and fully verified on 2026-07-22. The webhook secret was rotated and synchronized, the Apps Script was republished with the Spreadsheet ID fixed in code, and the controlled request at 10:45 ICT returned `HTTP 200` with `{"ok":true}`. The email arrived at `maxim@losoma.de`, and the new row was visually confirmed in the `Anfragen` sheet.
- After a successful submission, every form is replaced by a green confirmation panel with black, larger text. It remains visible until the page is reloaded. Do not restore the old inline success message beneath a visible form.
- The mandatory privacy checkbox is an acknowledgement, not a separate consent: `Ich habe die Datenschutzerklärung zur Kenntnis genommen.` Keep the legal basis in the privacy notice as Art. 6(1)(b)/(f) GDPR.
- GA4 measurement ID is `G-QPX35L2ZGK`; direct `gtag.js` + Consent Mode v2 is implemented. Default consent is denied; only `analytics_storage` is granted after `Statistik` consent.
- Turnstile is not used. The agreed next anti-spam stage is invisible reCAPTCHA v3; configure it
  on Hostinger after staged upload and enable it only together with server-side verification,
  Hostinger secrets and a synchronized Datenschutz update.
- Completed in the current migration pass: Hostinger-compatible PHP backend, `GET /api/health`,
  `.htaccess`, `sitemap.xml`, cleaned deploy assets, release archive and verified file/database backup.
- Remaining before launch: protected Hostinger staging, secrets/config, routing and form validation,
  reCAPTCHA v3, GA4 DebugView/manual consent QA, final legal review, DPA/AVV checks, responsive
  legal/cookie QA, absolute OG images, structured-data decisions and explicit production GO.
- `datenschutz.html` was reconciled on 2026-07-22 with the actual active flow: Vercel validation → Google Apps Script → Sheet `Anfragen` + Gmail `maxim@losoma.de`, plus the active consent-controlled GA4 setup. Reconcile it again when reCAPTCHA or the final Hostinger backend is enabled.
- Confirmed launch order as of 2026-07-22: prepare and stage the release on Hostinger first;
  then configure and verify invisible reCAPTCHA v3 and Google Search Console on Hostinger,
  updating Datenschutz in the same change as CAPTCHA; then complete go/no-go and switch production.

## Current Source Of Truth

- Repository: `/Users/glebstepanovich/ShipStudio/losoma`
- Site type: static HTML/CSS/JS.
- **Current work and QA target only:** Vercel staging `https://losoma-pi.vercel.app`.
- **WordPress is completely out of scope:** do not open, inspect, test, edit, deploy to, or send requests to the current WordPress site unless the user explicitly authorizes a specific WordPress task.
- Do not submit forms or create external test data on staging without warning the user and receiving permission first.
- Production domain/canonical: `https://losoma.de`.
- Final hosting target: Hostinger `public_html`.
- Current Hostinger production still contains the old WordPress site. Do not overwrite it during ordinary development.
- Vercel `https://losoma-pi.vercel.app` is staging/preview and currently hosts `/api/contact`.

Read `SITE.md`, `CLAUDE.md`, `DEPLOYMENT_CHECKLIST.md`, `HOSTINGER_LAUNCH_CHECKLIST.md`, `SEO_CHECKLIST.md`, `LEGALS_CHECKLIST.md`, `DATENSCHUTZ_DRAFT.md`, and `docs/*` before larger changes.

## Pages

- `index.html` — homepage.
- Service pages:
  - `hausmeisterservice.html`
  - `garten-landschaftspflege.html`
  - `treppenhausreinigung.html`
  - `gewerbliche-reinigung.html`
  - `grundreinigung.html`
  - `industriereinigung.html`
  - `fassaden-hoehenarbeiten.html`
  - `winterdienst.html`
  - `solaranlagenreinigung.html`
- Contact/legal:
  - `kontakt.html`
  - `impressum.html`
  - `datenschutz.html`
- Blog:
  - `blog/index.html`
  - `blog/hausmeister-vs-externer-spezialist.html`

All pages use clean canonical URLs on `https://losoma.de`.

## Build And QA

Use for ordinary work:

```text
npm run build
npm run audit:classes
npm run audit:classes:strict
node --check script.js
```

Do not edit `dist/` directly. Deployable media is canonical; original media and the old image
pipeline were removed before the Hostinger release.

## Styling System

The project has been migrated to Client-First-style class naming for project-owned classes.

- Blocks: `hero`, `contact-form`, `legal-page`.
- Elements: one underscore, e.g. `hero_content`, `contact-form_submit`.
- States/variants: `is-*`, e.g. `button is-accent`, `body.is-solid-header`, `is-open`.
- Forbidden for project-owned classes: `__` and `--` separators.
- Allowed exceptions: third-party classes such as `splide__*`, `iti__*`, `cc__*`.
- JavaScript should prefer `data-*` hooks for behavior.

Run `npm run audit:classes:strict` after class work.

## Design Rules

- Use existing tokens in `styles.css`.
- Lato is self-hosted in `assets/vendor/lato/`; do not add Google Fonts links.
- Typography uses `rem` and `clamp()`, not viewport font sizing.
- Reuse existing component rules. In particular, article lead typography is shared with
  `.quality-claim_title`, and blog H1 sizing is shared with `.hero_title`.
- Letter spacing stays `0` unless an existing token explicitly says otherwise.
- Cards keep restrained radii.
- Prefer grid/flex and semantic layout. Use absolute positioning only for real overlays, media layers and animation internals.
- Keep the responsive breakpoints from `docs/RESPONSIVE_GUIDELINES.md`.

## JavaScript Inventory

Startup flow in `script.js`:

1. `initCurrentYear()`
2. `initSmoothScroll()`
3. `initCookieConsent()`
4. `initHeroVideo()`
5. `initHeaderScrollState()`
6. `initServicesSlider()`
7. `initReviewsSlider()`
8. `initServiceDropdown()`
9. `initMobileMenu()`
10. `initFormHoneypot()`
11. `initNameValidation()`
12. `initEmailValidation()`
13. `initPhoneValidation()`
14. `initContactFormSubmit()`
15. `initAnalyticsEventTracking()`
16. `initFaq()`

Behavior hooks include:

- `[data-services-slider]`
- `[data-reviews-slider]`
- `[data-review-author]`
- `[data-service-dropdown]`
- `[data-service-dropdown-toggle]`
- `[data-service-dropdown-label]`
- `[data-service-dropdown-list]`
- `[data-service-dropdown-input]`
- `[data-honeypot-input]`
- `[data-email-input]`
- `[data-phone-input]`
- `[data-phone-normalized-input]`
- `[data-contact-form]`
- `[data-faq]`

Keep Splide for the services and reviews sliders. Keep intl-tel-input for phone country/validation UI. Keep Lenis disabled for users with `prefers-reduced-motion: reduce`.

## Forms

- Endpoint: `POST /api/contact`.
- Honeypot field: `company_website`.
- Current backend protection: server validation, honeypot, rate limit, duplicate detection and frontend submit locking.
- Google Sheets delivery works via Apps Script.
- Recipient and public/legal email are `maxim@losoma.de`; staging delivery to both Inbox and Google Sheet was fully verified on 2026-07-22.
- Turnstile is excluded; reCAPTCHA v3 is the next planned anti-spam layer.

## Analytics And Cookie Consent

- GA4 is required and has been created in the business Google account.
- Measurement ID: `G-QPX35L2ZGK`.
- GA4 setup choices: account `Losoma Gebäudeservice`, property `Losoma Website`, web stream `https://losoma.de`, timezone Germany/Berlin, currency EUR, industry `Immobilien`, size `Klein: 1 bis 10 Mitarbeiter`, business goals `Leads generieren` and `Web- und/oder App-Traffic analysieren`.
- Implementation rule: direct `gtag.js` + Consent Mode v2, not GTM at this stage.
- Consent default before user choice: `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization` all denied.
- After `Statistik` consent: grant only `analytics_storage`. Ads fields stay denied unless Google Ads is added later.
- If the user revokes `Statistik`, set analytics consent back to denied and delete GA cookies (`_ga`, `_ga_*`).
- Cookie banner UI is implemented in `script.js`/`styles.css` from the approved Figma direction.
- Approved UX: first layer `Ihre Privatsphäre ist uns wichtig` with `Alle ablehnen`, `Alle akzeptieren`, `Einstellungen`, no close icon before first choice. Second layer `Cookie-Einstellungen`: `Notwendige Cookies` disabled ON / `Immer aktiv`, `Statistik` OFF by default, secondary-left `Auswahl speichern`, primary-right `Alle akzeptieren`. Only the floating cookie icon reopens the settings layer directly after a saved choice; there is no footer cookie button.
- Verification done: `node --check script.js`, `npm run build`, `npm run audit:classes:strict`. Browser-plugin visual QA was blocked by the local Node runtime being below the browser plugin requirement; run manual browser QA or retry after updating the runtime.

## Historical Session Handoff: Cookie/Figma Implementation — 2026-07-11

Historical reference only. The 2026-07-16 Immediate Handoff above overrides conflicting dimensions, positioning and footer-control notes. Figma access was restored under `stepanovich_gleb@icloud.com`; the Losoma team seat is View, which is enough for design context/screenshots but not Figma edits.

### Cookie Banner Rules

- Figma source of truth: file `I6ham48xlFvt4cEQmf75i7`; main context `178:99`; first layer `178:55`; second layer `178:66`; OFF toggle `178:83`; ON toggle `178:90`; default cookie icon `178:92`; cookie-icon hover `178:95`.
- Desktop panel for both layers: width `500px`, padding `16px`, radius `4px`, background `rgba(253,253,252,0.9)`, `backdrop-filter: blur(4px)`, no box shadow. Both layers use the same translucency and blur.
- Desktop panel/button stay bottom-left. Tablet and phone panel/button are intentionally bottom-right; see the current handoff above.
- Figma typography/spacing used in the banner: title `22px` bold, body `18px` light, option title `18px` bold, option description `14px` light, `Immer aktiv` `12px` bold; primary structural gaps are `8px`, `12px`, and `16px`; action buttons are about `44px` high with `18px` text.
- Exact Figma toggle rule (`178:83` OFF / `178:90` ON): track is `40×20px`; thumb is `16×16px` and must stay vertically centered with `top:50%` + `translateY(-50%)`. The thumb starts 2px from the left and travels 18px, leaving the same 2px inset at the right in ON. OFF uses page `#fdfdfc` with blue `#0b6891` border/thumb. ON uses green `#86e83d` with blue `#0b6891` border/thumb. The disabled necessary toggle is checked, non-clickable, and `opacity:40%`; an enabled checked statistics toggle stays at `opacity:100%`.
- Current floating button overrides the old Figma size: `44×44px`, internal icon `32×32px`, page-color background, ink icon, neutral surface hover, no shadow.
- Do not restore a full-page dark consent backdrop: the approved main-screen composition (`178:99`) keeps the site/hero visible behind the translucent panel.

- Custom cookie banner only; no external CMP.
- Categories:
  - `Notwendige Cookies` / necessary: always active, cannot be disabled.
  - `Statistik`: Google Analytics / GA4, default OFF.
- Do not add `Marketing`, `Externe Medien`, or `Preferences` until the site actually uses Google Ads, embedded external media/maps, or preference storage.
- First layer:
  - Heading: `Ihre Privatsphäre ist uns wichtig`
  - Body: `Wir nutzen notwendige Cookies. Google Analytics verwenden wir nur mit Ihrer Einwilligung. Mehr dazu in unserer Datenschutzerklärung.`
  - `Datenschutzerklärung` links to `/datenschutz`.
  - Buttons: `Alle ablehnen`, `Alle akzeptieren`, `Einstellungen`.
  - No close/X before the first explicit choice.
- Second layer:
  - Heading: `Cookie-Einstellungen`
  - Intro: `Hier können Sie festlegen, welche Dienste wir verwenden dürfen.`
  - `Notwendige Cookies` shown ON and disabled, with `Immer aktiv`.
  - `Statistik` OFF by default.
  - Secondary button: `Alle akzeptieren`.
  - Primary button: `Auswahl speichern`.
- `Alle ablehnen` saves only necessary cookies.
- `Auswahl speichern` saves the current toggle state.
- The banner closes only after explicit `Alle ablehnen`, `Alle akzeptieren`, or `Auswahl speichern`.
- After a saved choice, the floating cookie icon opens the second settings layer directly. There is no footer cookie button.
- No separate cookie page.

### GA4 Rules

- Measurement ID: `G-QPX35L2ZGK`.
- Account: `Losoma Gebäudeservice`.
- Property: `Losoma Website`.
- Web stream: `https://losoma.de`.
- Timezone: Germany/Berlin.
- Currency: EUR.
- Industry: `Immobilien`.
- Size: `Klein: 1 bis 10 Mitarbeiter`.
- Goals: `Leads generieren` + `Web- und/oder App-Traffic analysieren`.
- Use direct `gtag.js`; no GTM at this stage.
- Consent Mode v2 default before any user choice:
  - `analytics_storage: denied`
  - `ad_storage: denied`
  - `ad_user_data: denied`
  - `ad_personalization: denied`
- After `Statistik` consent, grant only `analytics_storage`; keep ads fields denied unless Google Ads is added later.
- Do not load/activate GA4 before `Statistik` consent.
- If `Statistik` is revoked, set consent back to denied and delete `_ga` / `_ga_*`.
- Gated events currently intended:
  - page view / GA4 config after consent
  - `form_start`
  - `form_submit`
  - `form_success`
  - `form_error`
  - `cta_click`
  - `phone_click`
  - `email_click`
  - `outbound_click`
  - `messenger_click` only if a real messenger link appears later.

### Legal Rules

- `/datenschutz` must describe the real current implementation:
  - necessary cookies
  - custom consent banner
  - GA4 only after consent
  - Google Sheets/form processing where applicable
- `datenschutz.html` Stand date is `Juli 2026`.
- Final legal review is still needed via e-Recht24 / activeMind / lawyer.
- Confirm AVV/DPA before final launch:
  - Hostinger
  - Google for GA4 / Sheets / Apps Script / Gmail or Workspace
  - Vercel while `/api/contact` processes submissions
- Turnstile is not used. Add reCAPTCHA v3 next, with server-side verification and matching privacy text.
- Google Maps is not embedded now.

### Current Implementation

- Cookie/GA code is in `script.js`.
- Cookie UI styles are in `styles.css`.
- No footer cookie settings button is injected; it was deliberately removed.
- Floating cookie icon is injected by JS.
- Consent is stored in `localStorage` under `losoma_cookie_consent`.
- `dist/` has been rebuilt with `npm run build`.
- Verification passed:
  - `node --check script.js`
  - `npm run build`
  - `npm run audit:classes:strict`
- Figma connector is working again. The supplied desktop states were compared with Figma and iteratively checked by the user on Vercel screenshots. The in-app browser runtime was unavailable, so there was no separate automated local screenshot pass.
- Current staging deployment is recorded in the 2026-07-16 Immediate Handoff above.
- Hostinger / `losoma.de` was not touched.

### Remaining QA

- Recheck the final 2px right inset of the ON thumb on Vercel after cache refresh; the last correction changed checked travel from 20px to 18px.
- Do a final responsive/manual pass at tablet and phone widths (320/360/390/414px), including long German copy, scrolling of the settings panel, focus states, reject/accept/save, repeated visit and floating-icon reopen.
- Verify GA4 behavior separately in DebugView: no analytics before consent, events after Statistik consent, and cookie deletion after revocation.

## SEO

- Production canonical and `og:url`: `https://losoma.de`.
- Main page canonical: `https://losoma.de/`.
- Service/legal/contact pages use flat clean URLs.
- `robots.txt` exists.
- `sitemap.xml` is still pending.
- Structured data is pending final business facts.

## Explicit Final Launch Sequence

Do not execute this sequence until the user explicitly authorizes a Hostinger/WordPress launch task.

1. Close pre-upload blockers: legal owner/Verantwortlicher wording, DPO confirmation, final privacy review, real-service alignment, Hostinger/Vercel/Google DPA/AVV, permitted form/GA4 QA, sitemap/OG/Schema decisions and final responsive/accessibility QA. Configure reCAPTCHA v3 and Search Console after staged upload on Hostinger, before final production sign-off.
2. Record the current Vercel staging deployment and run `npm run build`, `node --check script.js`, and `npm run audit:classes:strict`.
3. Inspect Hostinger/WordPress only after authorization. Make a full backup of files and database; include `public_html`, `.htaccess`, `wp-config.php`, `wp-content/uploads` and a database export. Verify the backup is readable before changing production.
4. Prepare a rollback path that can restore both files and database. Do not delete the only WordPress copy.
5. Upload the generated `dist/` contents to the production web root using the authorized Hostinger method. Do not run the image pipeline unless source images changed.
6. Verify `https://losoma.de`: HTTPS, clean URLs, canonical/OG, robots/sitemap, every page, legal pages, responsive layouts, cookies/GA consent, forms/email, headers, favicon, 404 and no unexpected external requests.
7. Keep rollback materials until the user confirms the new production site is accepted.

## Legal

- `impressum.html` and `datenschutz.html` use the shared `.legal-page` component.
- Datenschutz hosting provider is Hostinger / `HOSTINGER INTERNATIONAL LIMITED`, Cyprus.
- Hostinger AVV/DPA must be activated or confirmed before final launch.
- Vercel DPA remains relevant while `/api/contact` processes submissions there.
- The privacy page describes only live services. The cookie banner and consent-gated GA4 are live; reCAPTCHA text must be added only when reCAPTCHA is enabled.

## Launch Rule

Do not launch to Hostinger unless explicitly requested.

Before final launch:

1. Build with `npm run build`.
2. Back up current Hostinger `public_html`.
3. Back up the current WordPress database.
4. Preserve `.htaccess`, `wp-config.php`, and `wp-content/uploads`.
5. Upload `dist/` to Hostinger `public_html`.
6. Verify HTTPS, clean URLs, canonical URLs, forms, legal pages, robots/sitemap and rollback.
