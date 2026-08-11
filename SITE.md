# Losoma — current technical state

Последнее обновление: 2026-08-10.

Все незавершённые действия, account/legal evidence и release gate находятся только в
`CHECKLIST.md`.

## Architecture

- Plain HTML/CSS/JS website; no framework or bundler migration is planned.
- Production: `https://losoma.de` on Hostinger, document root
  `domains/losoma.de/public_html`.
- Build output: `dist/`.
- Pages: home, contact, Impressum, Datenschutzerklärung, blog index, one article and nine service
  pages — 15 indexable canonical URLs total.
- Clean URLs and redirects are controlled by `.htaccess`.
- Canonical/OG domain: `https://losoma.de`.

## Current production release

- Latest release: targeted legal/contact/Schema sync 2026-08-10.
- Scope: `index.html`, `kontakt.html`, `impressum.html`, `datenschutz.html`, `sitemap.xml` only.
- Impressum and Datenschutzerklärung identify Maxim Soga as the public provider/controller and
  `Losoma Gebäudeservice` as the business name; the private DPA/admin address stays unpublished.
  Datenschutzerklärung has `Stand: 10. August 2026`.
- The left contact block now shows the confirmed Instagram profile beside LinkedIn.
- Homepage Organization Schema uses `legalName: Maxim Soga`; all 15 JSON-LD graphs were parsed and
  their shared organization/provider references were checked.
- Rollback: `domains/losoma.de/losoma-legal-contact-pre-20260810/`.
- Release copy: `domains/losoma.de/releases/losoma-legal-contact-20260810/`.
- Live SHA-256:
  - `index.html`: `88fc1b9867e2c559d431425e1ea6d5fafad1a3356c18c4b0d61039d745294584`;
  - `kontakt.html`: `11066f97c516b2ed272ca5499556dcaecbd576e48de4af68f678633b77d77939`;
  - `impressum.html`: `cbe1f04b4378c74c810f0c191947ac42013a131b9d81a1361eb1c812372a4802`;
  - `datenschutz.html`: `87b7271a50550f863647fe20a0fc9931f59b0630f78bd5d1b7025c16c13f1d32`;
  - `sitemap.xml`: `722cf5d8e1a7a4f262dc389835fe1445813657cf7ee52564b4e057f674cf04bb`.
- Build, strict class audit, SEO audit, JS syntax, diff check, server hashes and live HTTPS markers
  passed. No real form submission was made.

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
  established. Deferred content/Schema work is listed in `CHECKLIST.md`.
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
