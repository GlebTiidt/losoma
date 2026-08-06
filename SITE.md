# Losoma — current technical state

Последнее обновление: 2026-08-06.

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

- Latest release: targeted legal update 2026-08-01.
- Scope: `datenschutz.html`, `sitemap.xml` only.
- Datenschutzerklärung: Hostinger DPA-in-Terms wording, actual Sheet/Apps Script sharing, public
  technical role of the form web-app endpoint, `Stand: 1. August 2026`.
- Rollback: `domains/losoma.de/losoma-legal-pre-20260801/`.
- Release copy: `domains/losoma.de/releases/losoma-legal-20260801/`.
- Live SHA-256:
  - `datenschutz.html`: `06c6db65d269d767b3389af612ab293cec08c12c0eb33aa0becc9749188409b2`;
  - `sitemap.xml`: `0440dc6cca4052101e78eb4f0b09691ca6429738f16692115254ec2076897582`.
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
- `info@losoma.de` is a free alias of the same user, not a second paid mailbox.
- Sheet, Apps Script, GA4 and Search Console are owned/administered only by Maxim.
- Google Business Profile primary owner remains `losoma@web.de`. One correctly reissued Owner
  invitation to `maxim@losoma.de` remains pending without email/UI delivery; existing support case
  and Community escalation are awaiting a substantive technical response.
- Hostinger delegated access is `Manage Services & Billing`; confidential owner-side records must
  be requested by Alexandr after direct owner login.
- SSH has one verified deploy key.

## SEO and performance

- `robots.txt` and sitemap are live; Search Console processed 15 canonical URLs.
- Only `/treppenhausreinigung` is eligible for a later indexing-request retry; the previous request
  did not receive an explicit success confirmation.
- `/hausmeisterservice` is monitored but should not be resubmitted without a new reason.
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
