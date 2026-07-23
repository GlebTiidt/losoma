# Losoma — актуальный handoff

Последнее обновление: 2026-07-23.

## Production

- Сайт: `https://losoma.de`.
- Хостинг: Hostinger, каталог `domains/losoma.de/public_html`.
- Публичная сборка создаётся командой `npm run build` в `dist/`.
- Формы: `POST /api/contact` → Hostinger PHP → Google Apps Script → Google Sheet `Anfragen`
  и Gmail `maxim@losoma.de`.
- Защита форм: server validation, honeypot, rate limit, duplicate protection и Google
  reCAPTCHA v3 с серверной проверкой.
- Аналитика: GA4 `G-QPX35L2ZGK`, загружается только после согласия `Statistik`.
- Search Console подтверждена; `sitemap.xml` обработан без ошибок и содержит 15 URL.

## Проверено на production

- Все 15 индексируемых URL отвечают `200` и имеют `index, follow`, canonical и JSON-LD.
- `robots.txt` и `sitemap.xml` доступны.
- Контактные формы доставляют письмо и строку в Sheet.
- Cookie consent, отзыв согласия и GA4 Realtime проверены.
- Production deployment от 2026-07-23 сохранён в Git commit `90b4240` и последующих commits.

## Деплой

1. Проверить `git status` и не затронуть чужие изменения.
2. Запустить `npm run build`, `npm run audit:classes:strict`, `npm run audit:seo` и
   `node --check script.js`.
3. Загрузить содержимое `dist/` в Hostinger `domains/losoma.de/public_html`.
4. Сверить хеши критических файлов и выполнить production smoke/SEO проверки.
5. Очистить Hostinger cache только если он отдаёт прежние версии файлов.

SSH-параметры и секреты не записывать в публичные файлы или Git. Не удалять резервную копию
предыдущего WordPress и базы без отдельного явного решения.

## Открытые вопросы

- Подтвердить точного зарегистрированного Inhaber и Rechtsform: сочетание
  `Einzelunternehmen` и двух имён нельзя считать финально подтверждённым.
- Подтвердить, назначен ли формальный Datenschutzbeauftragter.
- Включить 2FA для Google Workspace и Hostinger.
- Сохранить в GA4 retention 14 месяцев и повторно проверить настройку.
- Проверить договорные условия обработки данных Hostinger и Google на точное legal entity.
- После передачи Google Business Profile добавить подтверждённую Maps/Profile URL в сайт и Schema.

Подробные вопросы: `MAXIM_QUESTIONS.md`. Legal-контроль: `LEGALS_CHECKLIST.md`.
