# Losoma — current technical state

Последнее обновление: 2026-10-02.

Все незавершённые действия, account/legal evidence и release gate находятся только в
`CHECKLIST.md`.

## Architecture

- Plain HTML/CSS/JS website; no framework or bundler migration is planned.
- Production: `https://losoma.de` on Hostinger, document root
  `domains/losoma.de/public_html`.
- Secondary static review target: `https://losoma-pi.vercel.app`. It is not the canonical domain
  and does not replace Hostinger production.
- Build output: `dist/`.
- Shared footer source: `components/footer.html`. The build renders it into all 15 HTML pages;
  `npm run dev` renders the same template locally with `Cache-Control: no-store`.
- `vercel.json` runs the same build into `dist` with clean URLs. During `VERCEL=1` builds the
  Hostinger-only PHP endpoints are excluded, so PHP source cannot be published as a static asset.
- Pages: home, contact, Impressum, Datenschutzerklärung, blog index, one article and nine service
  pages — 15 indexable canonical URLs total.
- Clean URLs and redirects are controlled by `.htaccess`.
- Canonical/OG domain: `https://losoma.de`.

## Current production release

- Latest release: **`losoma-footer-site-20261002-062010`** (2026-10-02 UTC), directly requested
  for Hostinger and GitHub. Published the current build of all 15 HTML pages and minified
  `styles.css`. The footer is now generated from one template, keeps its section dividers at
  phone/tablet/narrow-desktop widths, and links the Gleb Tiidt credit to Instagram in a new tab.
  This release also includes the other local HTML changes present in the approved full-site build.
  No PHP, media, `.htaccess`, robots or sitemap file was overwritten.
- Rollback: `domains/losoma.de/losoma-footer-site-pre-20261002-062010/` (16 exact targets,
  outside `public_html`). Release copy and before/after hash manifests:
  `domains/losoma.de/releases/losoma-footer-site-20261002-062010/`.
  Local `dist/`, published server files and all 15 public canonical HTTPS bodies match SHA-256;
  the public CSS also matches the build:
  - `blog/hausmeister-vs-externer-spezialist.html`: `0540face2a184bd3ee9e84d2aa42702f1f0a84e53142ea6d6cd942a2c1dc20ca`;
  - `blog/index.html`: `e914af93ba79c13a554e7efe051310a16d4d06ebb89d8bed3359ce0a3fa41fd9`;
  - `datenschutz.html`: `b67399f33000b9ea56f2d1b5fd4c22019af6c0936549d98d9115f112a48b7258`;
  - `fassaden-hoehenarbeiten.html`: `1b9d468ac10f01e097840b2cff21ff69fb8940ebb5383075f4a97a94acde24eb`;
  - `garten-landschaftspflege.html`: `c341851db1753f04f13a1af1092e55ca8ef601d9dc6e7c70ed9cc0be7b6e4a8e`;
  - `gewerbliche-reinigung.html`: `71eceaa67853bb529534385aa497423514d71ba1a224b9457eed1cdc7e9654c6`;
  - `grundreinigung.html`: `78693101dfb3a88be49a8c9c284d480e78f2481dd17065cadf63e9b14197758d`;
  - `hausmeisterservice.html`: `576797837c82dc9261460da960a94bb52d77d10f9b42148517597a63c7832ae1`;
  - `impressum.html`: `cef12e9bbac0842d65e4ee73f4b8537d36d0bddc6a25aee2b752bc888a79dfe2`;
  - `index.html`: `7c40faccba8b8a60209fa5af7396a261411da5a83d97bfcf4666a4c364825143`;
  - `industriereinigung.html`: `6128352302e35984788c794d7a76734a15e07e369e3fcf7485abe96e520a1018`;
  - `kontakt.html`: `bc539a11f563b33fd46c4cb4744cf81191894cf1ba9ad990f6b4781c27b9acac`;
  - `solaranlagenreinigung.html`: `e299d008f48b6d1d3334701b05b71dace7656e606392a4a2f6cdf9bc87cbd9d4`;
  - `treppenhausreinigung.html`: `f10b4ea61e37244ba697cbcf8ffe538297bb32b525b47f50e11420851ee9c705`;
  - `winterdienst.html`: `eb737c3e542b2d919fee44f4962b0bd92eb31baa1aa69f4e57455fb362a9d5b3`;
  - `styles.css`: `c9f095b9d89425234be25da8515c92775afda17066358cfcfaae5db234646b0f`.
  Build, strict class audit, SEO audit, JS syntax and diff checks passed. All canonical pages
  returned HTTPS 200; `index.html`, blog index and a service `.html` redirect with query strings
  preserved. Browser checks at 375, 768, 1024, 1280 and 1679 px showed the top divider, no footer
  overflow, the Instagram credit and no captured console errors. No real form was submitted.
- Previous targeted release: **`losoma-schema-gbp-20260929-1112`** (2026-09-29 UTC), scoped to
  `index.html` and the nine service HTML pages. The homepage Organization JSON-LD now includes
  the verified public Google Maps URL in `sameAs` and `hasMap`. Each page with a visible FAQ now
  has a matching `FAQPage` JSON-LD node with six exact question/answer pairs and a `#faq` section ID.
  Google retired FAQ rich results; this markup is for Schema.org consistency only.
- Rollback: `domains/losoma.de/losoma-schema-gbp-pre-20260929-1112/` (10 exact HTML targets,
  outside `public_html`). Release copy:
  `domains/losoma.de/releases/losoma-schema-gbp-20260929-1112/`.
  Local `dist/`, release copy, published server files and public HTTPS bodies match SHA-256:
  - `index.html`: `dc9c7d4eda4da6e2b825f0db092bf69d76e5a6e755d178c713ef4c3a5669428a`;
  - `hausmeisterservice.html`: `5323a8cef30a807b1f2f90109f7811bd824189109e7e35bb6057cf0ac7d42098`;
  - `treppenhausreinigung.html`: `0ee07770a275caae716de348bf4623b71129b492d667db5bb6c17d8ed69c8688`;
  - `gewerbliche-reinigung.html`: `cbb044a74c536e1c2d39f3333e8765373e61699d3456df8ed31b3c0094527053`;
  - `grundreinigung.html`: `7f4feb05ba15c488b0c47547d97bce0dde0cf8916fbd23ae1cdbb98b566b3305`;
  - `industriereinigung.html`: `e7961d09eabc49b89a2eefbb1a05e50db225289a3fb141e08dd3d8067c9f5bc2`;
  - `winterdienst.html`: `4e35065691509629302c6c92d737ad8c98f426fd92ed98f4287656d4db283b16`;
  - `garten-landschaftspflege.html`: `902e52808ccc9f7172b5485ecbe955e2da0defdac78fdaaea27113c81f7735ee`;
  - `fassaden-hoehenarbeiten.html`: `91f1c5a5502ebc62f8b6a4bd9cf532f176c0879720efbb2d110c7f864251e558`;
  - `solaranlagenreinigung.html`: `86e1c92bddc9254528c0a7bfb2ae93ea08bb08c54e8d1394c7094ac53d25564a`.
  Build, strict classes, SEO, JS syntax and diff checks passed. The final HTML of all 10 changed
  pages passed Schema Markup Validator with zero errors and warnings; the other five unchanged
  indexable pages passed the same validator in the preceding full-site run. The 10 live canonical
  pages returned HTTP 200 and their bodies matched the build byte for byte; all contained six FAQ
  pairs and the homepage contained the Maps link.
  No Google Business Profile edit, form submission, commit/push or Vercel deployment was made.
- Previous targeted release: **`losoma-links-20260921`**, explicitly approved by the owner.
  Targets: `index.html`, `blog/hausmeister-vs-externer-spezialist.html`, minified `styles.css`.
  Added two standard links to `/hausmeisterservice`: the upper home service-card heading and
  the contextual word `Hausmeister` in the article. Both inherit text color and use an underline
  and existing hover/focus treatment. Existing catalog/menu/footer links were already present.
- Previous rollback: `domains/losoma.de/losoma-links-pre-20260921/` (same three targets).
  Release copy: `domains/losoma.de/releases/losoma-links-20260921/`.
  Local build, server files and public HTTPS bodies have identical SHA-256:
  - `index.html`: `a4961ce9b6cff81e94ed790ec547f84ad25fdf0616a55a4a7a450b0e4d51c507`;
  - `blog/hausmeister-vs-externer-spezialist.html`: `6fd4303555405598ce429fd1af16c5dc3be00b5db214cbd3df19ef2a49321856`;
  - `styles.css`: `49953b2792958bee5fc606bcedf35e9a2771b1de672055fbc19e7021a7f3c449`.
  Home/article/CSS/Hausmeister HTTP 200; canonical unchanged; article .html 301 preserves query.
  Build, strict classes, SEO, JS syntax and diff check PASS. Article browser DOM confirms the
  published link and its target; no captured console errors. Click automation timed out, so the
  target was independently verified over HTTPS. No real form submission, commit/push or Vercel deploy.
- The August hashes below describe historical versions and are superseded by the dated releases
  above where those same files were changed.

- Read-only verification 2026-09-05: all 15 canonical HTML files on Hostinger match local
  source SHA-256; all 15 live URLs return HTTP 200 with index/follow and self-canonical.
  No production deployment was performed during the audit. Evidence and SEO actions are in
  `reports/seo-audit-2026-09-05/` and `CHECKLIST.md`.
- Earlier release chain: targeted service-content, typography, legal, Schema and service-page
  semantics updates on 2026-08-22, followed by the production sitemap and canonical-file sync on
  2026-08-30 (`losoma-canonical-sync-20260830-134112`).
- Five service pages now share the published content structure: a neutral `div` introduction with
  paragraph-style `Unser Ansatz` lead and point labels, followed by the real `H1 → H2 → H3`
  document hierarchy, muted supporting copy, semantic HTML lists and six FAQ items. The pages are
  `/hausmeisterservice`, `/grundreinigung`,
  `/treppenhausreinigung`, `/gewerbliche-reinigung` and `/industriereinigung`.
- Hero/H1/metadata/OG alternatives from the content drafts were intentionally not included in this
  release. The canonical body/FAQ/Service Schema changes are complete and must be measured
  separately from any future metadata experiment.
- Typography uses the shared fixed scale and semantic roles. Hero CTA bottom spacing is `70px` on
  desktop and `40px` on tablet/phone. Contextual body links inherit text colour; supporting copy,
  the blog subtitle and legal labels use the shared `--color-muted` token.
- Impressum identifies Maxim Soga as `Inhaber`, Alexandr Lozinschi as `Mitinhaber` and
  `Losoma Gebäudeservice` as the business name. The confirmed Berlin address is described as the
  business and postal address. Exact Handelsregister court, number, legal form and registered name
  remain outstanding and are not guessed on the public page.
- Datenschutzerklärung documents internal inquiry handling by Maxim and Alexandr, a six-month
  maximum for closed inquiries without an order, the category of the separate invoicing/accounting
  service and the applicable statutory retention categories. It has `Stand: 20. August 2026`.
- The cookie-consent panel and its floating settings button have a `1px solid #c0c0c0` border
  matching the legal-page dividers.
- The left contact block now shows the confirmed Instagram profile beside LinkedIn.
- All 15 JSON-LD documents were parsed: 42 graph nodes and nine Service nodes. Organization uses
  the public business name `Losoma Gebäudeservice`, confirmed owner roles and no unconfirmed
  `legalName`. Every Service now has category/audience data and references the same provider ID.
  Personal LinkedIn is attached to Maxim's Person node; the official Instagram profile remains on
  Organization. The article author/publisher and modified date are current.
- August baseline rollback: `domains/losoma.de/losoma-canonical-sync-pre-20260830-134112/`.
- August baseline release copy: `domains/losoma.de/releases/losoma-canonical-sync-20260830-134112/`.
- Sitemap-only rollback and release copy:
  `domains/losoma.de/losoma-sitemap-pre-20260830-132900/` and
  `domains/losoma.de/releases/losoma-sitemap-20260830-132900/`.
- August baseline SHA-256 (21 September overrides listed above):
  - `index.html`: `576762a4b2d528eaf7342cddb1d685d5e63fafa66cce20ec3cf0200b32d2b017`;
  - `hausmeisterservice.html`: `99477a4f055abc71ddaa5aea5050575eb7fd404895f9120c06f50e055cd2df81`;
  - `grundreinigung.html`: `e84b403df3289b51266f79836a2fb50d19eec4bac264c814f45921c1733227df`;
  - `treppenhausreinigung.html`: `36f0f912aaf30ca2507db140d3fe2ac2488dc76916b9f261ee865810e743058b`;
  - `gewerbliche-reinigung.html`: `e4fb8593da97500561474fc292371fbc79b669af8b2fe9e898f185551efc883b`;
  - `industriereinigung.html`: `4512e1c63e51066c6dee7605196252ca1d1d3ece87baefe89b5016ca9e80bd1d`;
  - `sitemap.xml`: `e14617ae6b07efe797f5fc2b6326d803415a0b24407bf453820e6884f22a8f49`;
  - `styles.css`: `331c44de56c764456d4e7e73093a08f8512cb3751635e1716f37b7e7f7b37a26`.
- Build, strict class audit, SEO audit, JS syntax, diff check, server hashes and live HTTPS markers
  passed. All 15 HTML files, `robots.txt` and `sitemap.xml` now match the local `dist/` SHA-256
  values; the eight service files changed on 2026-08-30 only to align valid `&amp;` escaping in
  `title` and `og:title`. `reports/` was not deployed. No real form submission was made.

## Current Vercel review release

- Alias: `https://losoma-pi.vercel.app`.
- Deployment: `dpl_Fk91xxoA7gnyf2z5D6JkMRT45k6P`, Ready, 2026-08-22.
- Scope: current static build synchronized after the five-service content release, complete
  Schema audit, shared typography/link/hero rules and semantic muted-colour cleanup.
- Vercel is review-only. Search indexing, Search Console checks and SEO comparisons must use
  canonical `https://losoma.de` URLs.
- The Vercel form is visual preview only because the production handler is Hostinger PHP and is
  deliberately excluded from Vercel. No real form submission was made.

## Forms and email

- Endpoint: `/api/contact`.
- Flow: browser → Hostinger PHP validation/security → reCAPTCHA v3 → Apps Script → Sheet
  `Anfragen` + Workspace Gmail.
- Public/form address: `info@losoma.de`.
- Workspace login/admin: `maxim@losoma.de`.
- `info@losoma.de` is the default Gmail Send As identity; Maxim is the reserve sender.
- WEB.DE `losoma@web.de` forwards to `info@losoma.de` and currently retains a copy.
- Private Hostinger config/state remains outside `public_html` and Git.
- Production E2E delivery has already been verified; do not repeat without a new reason and fresh
  permission.

## Privacy and analytics

- reCAPTCHA v3 loads only during form submission.
- GA4 `G-QPX35L2ZGK` loads only after `Statistik` consent.
- Consent Mode v2 defaults analytics and advertising signals to denied.
- GA4 user/event retention: 14 months.
- Sheet and Apps Script sharing are Restricted; only the technical web-app invocation endpoint is
  public.
- Closed inquiries without an order are retained for no more than six months after final closure.
- The exact invoicing/accounting provider and contract-storage location still need to be confirmed;
  current public disclosure names the relevant recipient category without inventing a provider.
- Exact fields, protection state and retention matrix are in `CHECKLIST.md`.

## Accounts

- Workspace has one active user, Maxim Soga `<maxim@losoma.de>`, Super Admin.
- Workspace plan: Google Workspace Business Starter, Flexible Plan, one paid license; there is no
  Standard charge or annual commitment.
- Google Workspace Cloud Data Processing Addendum was accepted by `maxim@losoma.de` on 2026-08-10
  for `Losoma (losoma.de)`.
- `info@losoma.de` is a free alias of the same user, not a second paid mailbox.
- Sheet, Apps Script, GA4 and Search Console are owned/administered only by Maxim.
- GA4 Data Processing Terms were accepted on 2026-07-23. Its DPA details identify `Maxim Soga` as
  the company name and sole primary contact at `<maxim@losoma.de>`, using the confirmed Berlin
  business address.
- Google Business Profile `LOSOMA Gebäudeservice` is verified and owned only by Maxim Soga
  `<maxim@losoma.de>` as Primary Owner. Ownership transfer and removal of the former
  `losoma@web.de` access were confirmed on 2026-08-10; the former Google Account was then deleted.
  The separate WEB.DE mailbox remains in use for the forwarding setup described above.
- Hostinger delegated access is `Manage Services & Billing`; confidential owner-side records must
  be requested by Alexandr after direct owner login.
- SSH has one verified deploy key.

## SEO and performance

- Fresh Hausmeister Inspection 2026-09-30: `URL ist Google nicht bekannt`, not indexed, no main
  crawl or Google canonical recorded. Page indexing report, last updated 2026-09-21, lists this
  exact URL as its one discovered-not-indexed page with no recorded crawl. The report/Inspection
  discrepancy therefore remains. The 2026-09-29 Live Test was successful with crawling and
  indexing allowed and a self-canonical; it does not establish a main indexing crawl. One indexing
  request was accepted on 2026-09-21 (`Indexierung wurde beantragt`); none was repeated. Sitemap
  was successfully read 2026-09-24 with 15 URLs. Public URL and Googlebot User-Agent requests
  return HTTP 200 on 2026-09-30; robots permits crawling and sitemap lists the exact URL. Cause
  of delay remains unknown; current next steps and evidence are in CHECKLIST.md.
- Hostinger access logs inspected 2026-09-21: two Googlebot records (including Smartphone)
  for `GET /hausmeisterservice` on 2026-09-19 05:31:04 (UI timezone unverified), IP
  `66.249.69.199`, reverse and forward DNS verified. These precede the new links and request.
  Fresh URL Inspection still reports discovered/no crawl; do not interpret this as proof that
  Googlebot never visited. Access table omits HTTP status and raw export could not be obtained;
  9101-byte responses do not independently establish HTTP 200 or indexing. Seven-day error
  reports show zero site-wide 5xx and no 4xx matching `hausmeisterservice`; older errors remain
  outside this window. Crawl Stats through 19 September: 486 requests/90 days, 306 ms average,
  both hosts no problems. DNS and transcribed records: `reports/indexing-2026-09-21/`.

- Read-only SEO/analytics snapshot 2026-09-18: all 15 production canonical URLs return 200,
  index/follow, self-canonical, no X-Robots-Tag. Robots allows crawling; sitemap read 2026-09-14,
  15 detected URLs. Hausmeister HTML matches local source and receives links from the other 14 pages.
- Coverage through 2026-09-14: 15 indexed examples = 14 current canonicals plus legacy `/privacy/`;
  3 redirects, 1 discovered-not-indexed, 0 crawled-not-indexed. Current index coverage is **14/15**.
- Hausmeister individual Inspection on 2026-09-18 says `URL ist Google nicht bekannt`, while Coverage
  says discovered-not-indexed. No main crawl/canonical confirmed. Preserve this discrepancy;
  cause unknown. Last request/successful Live Test 2026-09-05; none sent during this audit.
- Coverage reports fresh crawls for Garten 2026-09-14, Industrie/Kontakt/Winter/Blog 2026-09-13.
  Gewerbliche remains 2026-07-29, Grund 2026-07-30, Treppenhaus 2026-08-30. Google HTML not compared.
- Crawl Stats through 2026-09-15: 461 requests/90 days, 302 ms average; both hosts no problems.
  Manual Actions: no problems. HTTPS 13 valid/0 invalid; breadcrumbs 12/0; CWV insufficient data.
  Security Issues and Links not freshly confirmed due browser action timeouts.
- Comparable GSC/GA4 calendar windows: 2026-08-19–09-15 versus 07-22–08-18; weekly 09-09–15 vs 09-02–08.
  Germany GSC 3/6 clicks, 25/46 impressions; GA4 all-user sessions 19/26, organic 9/16, key events 0/0.
  Small sample, consent limits and unresolved page-click subtotal discrepancy prevent stronger claims.
- GBP April–September (September partial): 149 profile-view users, 5 interactions, all five in August;
  July zero. Monthly views and interaction types were not verified. Evidence and full analysis:
  `reports/seo-analytics-2026-09-18/report.md` and `sources/` (local only).
- GA4 property `Losoma Website` and Search Console property `sc-domain:losoma.de` remain unlinked.
- Production GA4, canonical redirects, responsive images, hero scheduling and consent behavior are
  established. The five-service body/FAQ/Schema release is live; only explicitly deferred
  hero/H1/metadata/OG experiments and open SEO/legal follow-up remain in `CHECKLIST.md`.
- Preserve hero MP4 `1920×1080`, `5,731,171` bytes as the minimum accepted quality.

## Required verification

```text
npm run build
npm run audit:classes:strict
npm run audit:seo
node --check script.js
git diff --check
```

Production release procedure: `CHECKLIST.md`, section “Единый release gate”.
