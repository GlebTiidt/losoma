# Datenschutzerklärung — технический и юридический source of truth

Последнее обновление: 2026-07-22.

> Это технически выверенный рабочий материал, а не индивидуальная юридическая
> консультация. Перед Hostinger launch текст должен проверить клиент и желательно
> немецкий юрист/Datenschutz-специалист.

## 1. Фактически активные процессы

### Hosting

- `losoma.de`: текущий production остаётся на Hostinger/WordPress до отдельного launch.
- `losoma-pi.vercel.app`: публичная preproduction-версия нового сайта на Vercel.
- `POST /api/contact` пока выполняется на Vercel.
- После Hostinger launch legal-текст нужно обновить под реальный production backend;
  Vercel удаляется из active processing только если форма больше через него не проходит.

### Contact form

Реальный поток на 2026-07-22:

```text
Browser
  -> Vercel POST /api/contact
  -> Google Apps Script Web App
  -> Google Sheet "Anfragen"
  -> Gmail notification to maxim@losoma.de
```

Обрабатываются:

- name;
- email;
- phone;
- requested service;
- optional message;
- submission timestamp;
- source path;
- User-Agent;
- IP address temporarily for delivery/security/rate limiting at hosting/backend level.

Защита: server validation, body limit, honeypot, per-IP rate limit, short duplicate window,
submit lock. Webhook secret rotated and synchronized on 2026-07-22. Test returned
`HTTP 200 {"ok":true}`; email and Sheet row were visually confirmed.

Checkbox wording is an acknowledgement, not a separate legal consent:

```text
Ich habe die Datenschutzerklärung zur Kenntnis genommen.
```

Processing basis:

- Art. 6(1)(b) GDPR for contract/pre-contract inquiries;
- Art. 6(1)(f) GDPR for general business inquiries.

Open retention decision: client must approve a deletion schedule for Google Sheets and Gmail.
Until then, the public policy uses purpose/mandatory-retention criteria and does not claim an
unimplemented fixed deletion period.

### Cookies / local storage

- Custom consent UI, no external CMP.
- Consent choice stored in Local Storage as `losoma_cookie_consent`.
- Homepage intro state stored in Session Storage as `losoma_intro_seen`.
- Google Analytics is default denied and loaded only after `Statistik` consent.
- Withdrawal sets analytics consent to denied and removes `_ga` / `_ga_*` cookies.

### Google Analytics

- GA4 measurement ID: `G-QPX35L2ZGK`.
- Direct `gtag.js`, Consent Mode v2.
- `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization` default denied;
  only analytics storage is granted for Statistics consent.
- GA4 standard property event/user retention is at most 14 months, but the exact Admin setting
  (2 or 14 months) must be checked before launch.
- Google states that individual EU/EEA IP addresses are discarded before logging.

### Not active

- reCAPTCHA v3 is active on Hostinger production with server-side verification; its processing
  text is published in `datenschutz.html`.
- Turnstile is not used.
- Google Maps is not embedded.
- Lato is self-hosted; no Google Fonts request exists.
- Social icons are simple outbound links, not embedded plugins.

## 2. Current processors / recipients

| Provider | Current purpose | Required internal action |
|---|---|---|
| Vercel Inc. | Legacy preproduction only; not in the active production form path | DPA needed only if staging processes real personal data again |
| Google Ireland / Google Workspace | Apps Script, Sheets and Gmail form delivery | Confirm Workspace data-processing terms, access list and retention |
| Google Analytics | Consent-based analytics | Confirm data-processing terms and exact retention setting |
| Hostinger | Current `losoma.de` hosting and future new-site production | Confirm DPA before migration and document server/runtime/subprocessors |

International transfers are described using Art. 44 ff. GDPR, applicable adequacy decisions
and/or EU Standard Contractual Clauses. Do not promise DPF coverage for a provider without
checking its current certification and contract.

## 3. Open legal blockers

1. Confirm exact owner/controller wording from registration documents. `Einzelunternehmen`
   with `Maxim Soga / Alexandr Lozinschi` is potentially inconsistent and must be resolved.
2. Confirm whether a Datenschutzbeauftragter is appointed or legally required.
3. Approve a concrete deletion/retention policy for contact requests in Sheets and Gmail.
4. Confirm/accept DPA/AVV for Hostinger, Vercel, Google Workspace and Google Analytics.
5. Confirm who has access to the Sheet, Apps Script and `maxim@losoma.de`.
6. Obtain final lawyer/privacy review before Hostinger production launch.

## 4. Official references checked 2026-07-22

- GDPR consolidated text, especially Arts. 5, 6, 13, 21, 28 and 44 ff.:
  `https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679`
- § 25 TDDDG:
  `https://www.gesetze-im-internet.de/ttdsg/__25.html`
- Berlin supervisory authority contact:
  `https://www.datenschutz-berlin.de/ueber-uns/kontakt/`
- Google Workspace data processing terms:
  `https://workspace.google.com/terms/10292019/dpa_terms/`
- Google Analytics EU/UK/CH privacy information:
  `https://support.google.com/analytics/answer/12017362`
- Google Consent Mode implementation:
  `https://developers.google.com/tag-platform/security/guides/consent`
- Vercel DPA (current version must be rechecked at launch):
  `https://vercel.com/legal/dpa`
- Hostinger DPA (current account/version must be rechecked at launch):
  `https://www.hostinger.com/legal/dpa`

## 5. Update rule

Whenever hosting, form routing, analytics, CAPTCHA, maps, CRM, email provider, cookie storage,
social embeds or retention changes:

1. change the technical implementation;
2. verify the real network/data flow;
3. update `datenschutz.html` and this file in the same change;
4. update `LEGALS_CHECKLIST.md`, `HANDOFF.md`, `SITE.md` and the launch checklist;
5. deploy to Vercel only with explicit approval;
6. deploy to Hostinger only after backup, legal `GO` and explicit launch approval.
