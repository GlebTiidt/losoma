# Losoma — current technical state

Последнее обновление: 2026-08-22.

Все незавершённые действия, account/legal evidence и release gate находятся только в
`CHECKLIST.md`.

## Architecture

- Plain HTML/CSS/JS website; no framework or bundler migration is planned.
- Production: `https://losoma.de` on Hostinger, document root
  `domains/losoma.de/public_html`.
- Secondary static review target: `https://losoma-pi.vercel.app`. It is not the canonical domain
  and does not replace Hostinger production.
- Build output: `dist/`.
- `vercel.json` runs the same build into `dist` with clean URLs. During `VERCEL=1` builds the
  Hostinger-only PHP endpoints are excluded, so PHP source cannot be published as a static asset.
- Pages: home, contact, Impressum, Datenschutzerklärung, blog index, one article and nine service
  pages — 15 indexable canonical URLs total.
- Clean URLs and redirects are controlled by `.htaccess`.
- Canonical/OG domain: `https://losoma.de`.

## Current production release

- Latest release chain: targeted service-content, typography, legal, Schema and service-page
  semantics updates on 2026-08-22. The latest release is
  `losoma-service-semantics-20260822-161620`.
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
- Latest rollback: `domains/losoma.de/losoma-service-semantics-pre-20260822-161620/`.
- Latest release copy:
  `domains/losoma.de/releases/losoma-service-semantics-20260822-161620/`.
- Live SHA-256:
  - `index.html`: `576762a4b2d528eaf7342cddb1d685d5e63fafa66cce20ec3cf0200b32d2b017`;
  - `hausmeisterservice.html`: `99477a4f055abc71ddaa5aea5050575eb7fd404895f9120c06f50e055cd2df81`;
  - `grundreinigung.html`: `c61c162bdbe1c34ab2ad9031ae4f054910624080d9e93ce1640784f5a7d67f99`;
  - `treppenhausreinigung.html`: `d57f4d9e6dcfb8ad58ef995adaa83439f6a5d04ebcec2a5ba708c95d5e0e370d`;
  - `gewerbliche-reinigung.html`: `743531f7738469d76ad45565c4c4e11b26104a4530fd0b3299817838e53394de`;
  - `industriereinigung.html`: `3a277ff5ba3fed772e406b533dd6c177acf51e83c43a50b1545352eb68de9387`;
  - `styles.css`: `331c44de56c764456d4e7e73093a08f8512cb3751635e1716f37b7e7f7b37a26`.
- Build, strict class audit, SEO audit, JS syntax, diff check, server hashes and live HTTPS markers
  passed. `reports/` is excluded from the site-page audit and was not deployed. The service
  semantics release was verified on all five canonical URLs with a cache-busting query: one H1,
  first headings `H1 → H2 → H3`, introductory `DIV/P` content, correct canonical and no horizontal
  overflow. No real form submission was made.

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

- `robots.txt` and sitemap are live. Search Console reports all 15 canonical URLs indexed; its two
  excluded URLs are the intentional `http://losoma.de/` and `https://www.losoma.de/` redirects.
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
