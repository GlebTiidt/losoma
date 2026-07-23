# Losoma — source of truth

Последнее обновление: 2026-07-23.

## Архитектура

- Plain HTML/CSS/JS, без frontend framework.
- Production размещён только на Hostinger: `https://losoma.de`.
- Backend формы — PHP в `api/contact.php`.
- Доставка заявки — Google Apps Script, Google Sheets и Gmail.
- Секреты хранятся вне `public_html` и Git.
- `dist/` — generated output; редактировать исходные файлы, затем запускать build.

## Страницы и SEO

- Главная, контакт, Impressum, Datenschutz, blog index, одна статья и девять сервисных страниц.
- Production canonical: `https://losoma.de`.
- Clean URLs обслуживаются правилами Hostinger `.htaccess`.
- На всех индексируемых страницах обязательны уникальные title/description, canonical,
  `index, follow`, Open Graph и валидный JSON-LD.
- На всех внутренних страницах обязателен `BreadcrumbList`.
- FAQ Schema допускается только при полном совпадении с видимым FAQ.
- Реальные social/Maps URLs добавляются только после подтверждения. Сейчас подтверждён LinkedIn.

## Формы и privacy

- Endpoint: `/api/contact`.
- Success state заменяет форму до перезагрузки.
- Checkbox Datenschutzerklärung — подтверждение ознакомления, не отдельное согласие.
- reCAPTCHA v3 загружается при отправке; обязательный Google legal microtext остаётся видимым.
- GA4 `G-QPX35L2ZGK` загружается только после согласия категории `Statistik`.
- Default Consent Mode v2: analytics и advertising denied.
- Отзыв согласия блокирует дальнейшую аналитику и удаляет доступные `_ga` cookies.

## Визуальные правила

- Lato self-hosted.
- Breakpoints: desktop `>=1025`, tablet `<=1024`, phone `<=560`, burger `<=1150`.
- Phone gutter: 16px.
- Project classes используют block, один underscore для element и `is-*` для state.
- Сторонние классы (`splide__*`, `iti__*`, `cc__*`) являются исключениями.

## Обязательная проверка

```text
npm run build
npm run audit:classes:strict
npm run audit:seo
node --check script.js
```

Production deployment выполнять только по явному запросу и по
`HOSTINGER_LAUNCH_CHECKLIST.md`.
