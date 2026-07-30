# Deployment Checklist — Hostinger

Последнее обновление: 2026-07-30.

## Последний завершённый release

- [x] Production release выполнен 2026-07-30; source commit: `b28859c`.
- [x] Перед выпуском создана ручная Hostinger backup-копия `2026-07-30 17:08`.
- [x] `npm run build`, `npm run audit:classes:strict`, `npm run audit:seo`,
  `node --check script.js` и `git diff --check` прошли.
- [x] Все 15 canonical HTML URL и критические публичные файлы побайтно совпали с `dist/`.
- [x] `/api/health` вернул `200`; канонические `301` и query string проверены.
- [x] Production Lighthouse mobile: Accessibility, Best Practices, SEO и Agentic Browsing —
  `100/100/100/100`; cold `Slow 4G`, CPU `4x`, `412x915@3`: LCP `2,978 ms`, CLS `0`.
- [x] Реальная форма не отправлялась; ZIP релиза перемещён из `public_html` в корзину Hostinger.

Ниже — обязательный шаблон для **следующего** release. Пункты намеренно остаются незакрытыми.

## Перед сборкой

- [ ] Проверить `git status`; сохранить чужие изменения.
- [ ] Убедиться, что секретов нет в Git и `dist/`.
- [ ] Проверить актуальные `robots.txt`, `sitemap.xml`, canonical и legal pages.

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
