# LOSOMA Handoff

## Immediate Handoff — 2026-07-20

This section is the current source of truth and supersedes conflicting historical notes below.

### Google Account Transfer

- New managed Google Workspace account confirmed: `maxim@losoma.de`; Google Admin Console is
  accessible.
- Existing Google Business Profile remains safe under primary owner `losoma@web.de`.
- On 2026-07-20, `maxim@losoma.de` was invited to the existing profile as `Inhaber`. The last
  confirmed state is pending (`AUSSTEHEND`); it has not yet been accepted and is not primary owner.
- Do not delete/recreate the Business Profile. After acceptance, wait 7 days before transferring
  `Primärer Inhaber`; keep the old account as a temporary backup.
- Workspace showed a payment-method/payment warning with a stated suspension risk on 2026-08-03.
  The SEPA confirmation flow was opened, but successful completion has not been confirmed. Do not
  record bank details and do not make the Workspace account primary owner until billing is stable.
- Public DNS checked 2026-07-20 still has Hostinger MX and Hostinger SPF; Google DKIM was absent.
  Therefore Gmail receipt at `maxim@losoma.de` is not yet proven. Do not enable WEB.DE forwarding
  or change form recipients until Gmail activation/DNS and an authorized external test succeed.
- GA4 must be shared to the new account, not recreated. Keep account/property/history and
  measurement ID `G-ST55QF95VS`. Search Console, Sheets and Apps Script access transfer separately.
- Full state, safety rules and resume order: `GOOGLE_ACCOUNT_TRANSFER_CHECKLIST.md`.

### Environment And Deployment

- Work and QA **only** on Vercel staging: `https://losoma-pi.vercel.app`.
- The existing WordPress site on `losoma.de` is completely out of scope. Do not open, inspect, test, edit, deploy to, or send requests to WordPress/Hostinger unless the user explicitly authorizes a specific task.
- Hostinger/SFTP/SSH, WordPress admin and database access exist, but must not be used until the user separately authorizes backup/launch work.
- Do not submit the staging form or create Google Sheet rows, emails or analytics test events without warning the user and receiving permission first.
- Vercel CLI authentication was restored on 2026-07-15. Deploy only when explicitly requested, using `vercel --prod --yes`; in this project that updates the staging alias, not the WordPress site.
- Current ready staging deployment: `dpl_2CX6guQmQs2jub2kPPuMiRM1Rjwm`, immutable URL `https://losoma-ibz5wu1le-gleb-projects-work.vercel.app`, alias `https://losoma-pi.vercel.app`.

### Current Cookie UI

- Custom CMP only; implementation is in `script.js` and `styles.css`.
- First layer has `Alle ablehnen`, `Alle akzeptieren`, `Einstellungen`; no close/X before the first decision. `Statistik` defaults OFF and GA4 stays inactive until consent.
- The footer `Cookie-Einstellungen` control was deliberately removed. Reopening settings is done only with the floating cookie button.
- Floating button: `44×44px`; cookie SVG: `32×32px`, centered; button background `var(--color-page)` (`#fdfdfc`), icon `var(--color-ink)`, neutral hover `var(--color-surface-hover)` (`#ededed`), no shadow.
- Desktop: button and panel bottom-left with `var(--content-gutter)` offset.
- Tablet `≤1024px`: button and panel bottom-right with `24px` inset.
- Phone `≤560px`: button and panel bottom-right with `16px` inset.
- Panel: up to `500px`, `16px` padding, `4px` radius, `rgba(253,253,252,.9)` background and `4px` backdrop blur. No dark full-screen visual backdrop.
- Legal UX note: the reject action is already on the first layer and takes one click. Before launch, consider giving accept/reject comparable visual prominence to reduce nudging risk.

### Current Legal And Business Data

- Public names: `Maxim Soga / Alexandr Lozinschi`; legal form shown as `Einzelunternehmen`. Confirm the exact owner/Verantwortlicher wording against registration documents or with a lawyer before launch.
- Business address: `Falkenseer Chaussee 247C, 13583 Berlin, Deutschland`.
- The address is marked `Geschäftsadresse · kein Kundenbüro vor Ort`; there is no customer office.
- Phone: `+49 176 44434111`; email: `losoma@web.de`; USt-IdNr. `DE357950597`; Steuernummer `19/537/02292`.
- `impressum.html`, `datenschutz.html`, `kontakt.html`, the homepage, all service pages and every shared footer use the updated address.
- Final legal review is still required. Confirm that no Datenschutzbeauftragter is appointed, and confirm AVV/DPA for Hostinger, Vercel and Google.

### Form, Analytics And Launch Blockers

- `POST /api/contact` is implemented with server validation, honeypot, rate limit, duplicate protection and frontend submit locking.
- Google Sheets delivery through Apps Script works. Email delivery to `losoma@web.de` is still pending WEB.DE SMTP/app password.
- GA4 measurement ID is `G-ST55QF95VS`; direct `gtag.js` + Consent Mode v2 is implemented. Default consent is denied; only `analytics_storage` is granted after `Statistik` consent.
- Turnstile is not enabled. Do not enable it unless spam/paid traffic requires it; if enabled, update code, DPA and Datenschutz together.
- Remaining before launch: SMTP email, permitted form QA, GA4 DebugView/manual consent QA, final legal review, DPA/AVV checks, responsive legal/cookie QA, `sitemap.xml`, absolute OG images, structured data after hours/coordinates/price/founding facts, full backup/rollback, then explicit Hostinger launch authorization.
- The privacy page currently contains a Turnstile section although Turnstile is not enabled; final legal review must either remove that inactive section or enable the described service.

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
- Cloudflare Pages references are historical/optional, not the current production plan.

Read `SITE.md`, `CLAUDE.md`, `DEPLOYMENT_CHECKLIST.md`, `SEO_CHECKLIST.md`, `LEGALS_CHECKLIST.md`, and `docs/*` before larger changes.

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

All pages use clean canonical URLs on `https://losoma.de`.

## Build And QA

Use for ordinary work:

```text
npm run build
npm run audit:classes
npm run audit:classes:strict
node --check script.js
```

Do not edit `dist/` directly. Do not run the image pipeline unless `assets/source/` changed.

Image commands:

```text
npm run assets:images
npm run build:images
```

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
- Email delivery to `losoma@web.de` is pending WEB.DE SMTP/app password.
- Turnstile is deferred unless the current protections become insufficient.

## Analytics And Cookie Consent

- GA4 is required and has been created in the business Google account.
- Measurement ID: `G-ST55QF95VS`.
- GA4 setup choices: account `Losoma Gebäudeservice`, property `Losoma Website`, web stream `https://losoma.de`, timezone Germany/Berlin, currency EUR, industry `Immobilien`, size `Klein: 1 bis 10 Mitarbeiter`, business goals `Leads generieren` and `Web- und/oder App-Traffic analysieren`.
- Implementation rule: direct `gtag.js` + Consent Mode v2, not GTM at this stage.
- Consent default before user choice: `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization` all denied.
- After `Statistik` consent: grant only `analytics_storage`. Ads fields stay denied unless Google Ads is added later.
- If the user revokes `Statistik`, set analytics consent back to denied and delete GA cookies (`_ga`, `_ga_*`).
- Cookie banner UI is implemented in `script.js`/`styles.css` from the approved Figma direction.
- Approved UX: first layer `Ihre Privatsphäre ist uns wichtig` with `Alle ablehnen`, `Alle akzeptieren`, `Einstellungen`, no close icon before first choice. Second layer `Cookie-Einstellungen`: `Notwendige Cookies` disabled ON / `Immer aktiv`, `Statistik` OFF by default, secondary `Alle akzeptieren`, primary `Auswahl speichern`. Cookie icon/footer button reopen the settings layer directly after a saved choice.
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

- Measurement ID: `G-ST55QF95VS`.
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
- Turnstile is not enabled now; add only if spam or paid traffic requires it.
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

1. Close launch blockers: legal owner/Verantwortlicher wording, DPO confirmation, final privacy review, real-service alignment, Hostinger/Vercel/Google DPA/AVV, WEB.DE SMTP, permitted form/GA4 QA, sitemap/OG/Schema decisions and final responsive/accessibility QA.
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
- The privacy page intentionally includes not-yet-live services for lawyer review: consent banner, GA and Turnstile.

## Launch Rule

Do not launch to Hostinger unless explicitly requested.

Before final launch:

1. Build with `npm run build`.
2. Back up current Hostinger `public_html`.
3. Back up the current WordPress database.
4. Preserve `.htaccess`, `wp-config.php`, and `wp-content/uploads`.
5. Upload `dist/` to Hostinger `public_html`.
6. Verify HTTPS, clean URLs, canonical URLs, forms, legal pages, robots/sitemap and rollback.
