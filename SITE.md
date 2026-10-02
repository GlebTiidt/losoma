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
- Current five-page service structure: `/hausmeisterservice`, `/grundreinigung`, `/treppenhausreinigung`, `/gewerbliche-reinigung` and `/industriereinigung` have factual body content, visible FAQs and matching Service/FAQ Schema. Hero/H1/metadata experiments remain separate tasks.
- The homepage Organization uses the verified public Google Maps URL in `sameAs` and `hasMap`. The public legal pages use confirmed owner roles and address; missing register details are not inferred.
- On 2026-10-02, one unreferenced image present only on the server was moved from `public_html/assets/generated/` to `domains/losoma.de/backups/public-cleanup-20261002/assets/generated/`. SHA-256: `97e9ddd650b9f454ed4f01a63a3b833d8f6c3ceffd643d2ae05e753e3170c1f9`. The owner chose to retain all existing release archives and the WordPress backup.

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

- Fifteen canonical URLs are published. The last confirmed Coverage snapshot listed 14 of 15 current canonicals indexed; `/hausmeisterservice` remains unresolved in the 2026-09-30 URL Inspection. The accepted indexing request was on 2026-09-21. Current evidence and next actions are in `CHECKLIST.md`; historical reports are in local `reports/`.
- GA4 `Losoma Website` and Search Console `sc-domain:losoma.de` remain unlinked. GA4 requires Statistik consent; small samples do not establish content impact.
- Production GA4, canonical redirects, responsive images, hero scheduling and consent behavior are established. Preserve hero MP4 `1920×1080`, `5,731,171` bytes as the minimum accepted quality.

## Required verification

```text
npm run build
npm run audit:classes:strict
npm run audit:seo
node --check script.js
git diff --check
```

Production release procedure: `CHECKLIST.md`, section “Единый release gate”.
