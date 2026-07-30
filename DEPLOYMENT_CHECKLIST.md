# Deployment Checklist — Hostinger

Последнее обновление: 2026-07-30.

## Последний завершённый release

- [x] Email migration release выполнен 2026-07-30 из текущего проверенного working tree;
  отдельный commit/push для него ещё не создавался.
- [x] Перед выпуском сохранён server-side rollback-архив вне `public_html`:
  `domains/losoma.de/losoma-production-pre-info-20260730-2014.zip`.
- [x] `npm run build`, `npm run audit:classes:strict`, `npm run audit:seo`,
  `node --check script.js` и `git diff --check` прошли.
- [x] Release ZIP `losoma-release-20260730-2014.zip` сохранён вне public web root в
  `domains/losoma.de/releases/`; SHA-256:
  `ec9a512878ef98857461f3d2f54deda4f8ef93fa4b4cc7bdbefe4d064a627d86`.
- [x] Server-side и локальные SHA-256 критических файлов совпали; все 15 canonical HTML URL
  вернули `200`.
- [x] `/api/health` вернул `200`; канонические `301` и query string проверены.
- [x] Live HTML содержит `info@losoma.de` и не содержит прежний public email; Impressum,
  Datenschutz, Kontakt, footer/`mailto:` и Schema/contactPoint проверены на production.
- [x] Один явно разрешённый end-to-end test завершён: success UI, письмо `an info` в Workspace и
  строка Sheet `Anfragen` с timestamp `2026-07-30T13:37:54Z` подтверждены.

Ниже — обязательный шаблон для **следующего** release. Пункты намеренно остаются незакрытыми.

## Перед сборкой

- [ ] Проверить `git status`; сохранить чужие изменения.
- [ ] Убедиться, что секретов нет в Git и `dist/`.
- [ ] Проверить актуальные `robots.txt`, `sitemap.xml`, canonical и legal pages.
- [ ] Если release меняет email: подтвердить прямую доставку Workspace, WEB.DE forwarding,
  form recipient, legal pages, footer/`mailto:` и Schema/contactPoint до production upload.

## Build и QA

- [ ] `npm run build`.
- [ ] `npm run audit:classes:strict`.
- [ ] `npm run audit:seo`.
- [ ] `node --check script.js`.
- [ ] Проверить, что `dist/` содержит `.htaccess`, HTML, CSS/JS, assets и PHP API.

## Hostinger deploy

- [ ] Сохранить rollback-копию текущего production при существенном релизе.
- [ ] Загрузить содержимое `dist/` в `domains/losoma.de/public_html`.
- [ ] Сверить локальные и server-side SHA-256 критических файлов.
- [ ] Не помещать secrets в `public_html`.
- [ ] Очистить Hostinger cache только если он отдаёт старую версию.

## Production smoke test

- [ ] Главная, legal, contact, blog и все service pages отвечают `200`.
- [ ] CSS, JS, изображения и шрифты загружаются без ошибок.
- [ ] `/robots.txt`, `/sitemap.xml`, `/api/health` доступны.
- [ ] Canonical указывает на `https://losoma.de`; нет `noindex` и `X-Robots-Tag` block.
- [ ] JSON-LD валиден; FAQ соответствует видимому HTML.
- [ ] Cookie banner не блокирует навигацию по сайту.
- [ ] GA4 отсутствует до согласия и отправляет события после `Statistik`.
- [ ] Форму отправлять только после предупреждения пользователя, так как тест создаёт письмо и
  строку в Google Sheet.

## После deploy

- [ ] Commit и push в GitHub.
- [ ] Зафиксировать дату, commit, выполненные проверки и открытые риски.
- [ ] Не удалять rollback-копии без отдельного решения.
