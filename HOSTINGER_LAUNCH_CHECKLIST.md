# Hostinger Production Checklist

Production: `https://losoma.de` → `domains/losoma.de/public_html`.

Последнее обновление: 2026-07-30.

## Текущий подтверждённый production

- Email migration release 2026-07-30 опубликован из проверенного `dist/`; новый commit/push ещё не
  создавался.
- Rollback-копия сохранена вне public web root:
  `domains/losoma.de/losoma-production-pre-info-20260730-2014.zip`.
- Release ZIP хранится вне `public_html` в
  `domains/losoma.de/releases/losoma-release-20260730-2014.zip`; SHA-256:
  `ec9a512878ef98857461f3d2f54deda4f8ef93fa4b4cc7bdbefe4d064a627d86`.
- Все 15 canonical HTML URL вернули `200`; server-side и локальные хеши `.htaccess`, HTML legal и
  contact pages, CSS/JS, robots/sitemap и PHP API совпали.
- Private form recipient переключён на `info@losoma.de` без переноса секретов в `public_html`.
- Live Impressum, Datenschutz, Kontakt, footer/`mailto:` и Schema/contactPoint используют
  `info@losoma.de`; старый public email на 15 страницах отсутствует.
- Разрешённый E2E form test показал success UI; письмо доставлено `an info`, строка `Anfragen`
  создана в `2026-07-30T13:37:54Z`.
- Старые SSH-реквизиты `metropoolvastgoedbe@ssh002.webhosting.be` относятся к другому hosting
  account и не должны использоваться для LOSOMA. Подтверждённый LOSOMA SSH: user `u969184895`,
  host `46.202.156.161`, port `65002`, локальный key `~/.ssh/losoma_deploy`.

## Безопасный выпуск

1. Проверить scope, worktree и открытые legal/security риски.
2. Запустить build и все audits из `DEPLOYMENT_CHECKLIST.md`.
3. Проверить, что PHP API и `.htaccess` присутствуют в `dist/`.
4. Сохранить текущую production-копию, если релиз меняет код или legal-текст.
5. Загрузить содержимое `dist/` в `public_html` через подтверждённый LOSOMA SSH/SCP либо hPanel
   File Manager. Не загружать в hosting root, где лежит `DO_NOT_UPLOAD_HERE`.
6. Сверить хеши: `.htaccess`, `index.html`, `datenschutz.html`, `impressum.html`,
   `styles.css`, `script.js`, `robots.txt`, `sitemap.xml`, `api/contact.php`, `api/health.php`.
7. Выполнить production smoke/SEO тест всех 15 URL.
8. При отдаче старых файлов очистить Hostinger cache и повторить проверку.
9. Commit и push только проверенного состояния.

Для hPanel File Manager предпочтителен ZIP с содержимым `dist/` без внешней папки `dist`:
загрузить в `public_html`, распаковать в `.` с `Overwrite existing files`, проверить production,
затем убрать ZIP из публичного каталога через корзину.

## Rollback

- Не удалять резервную копию предыдущего WordPress и базы без отдельного письменного решения.
- При критической ошибке восстановить последнюю рабочую production-копию, затем диагностировать
  локально. Не исправлять generated файлы напрямую на сервере как постоянное решение.

## Данные и безопасность

- Секрет reCAPTCHA и Apps Script webhook secret должны находиться вне Git и public web root.
- Форма создаёт внешние данные; тестировать только после предупреждения пользователя.
- Hostinger и Google administrative access должен оставаться у уполномоченных лиц.
- 2FA для Hostinger и Google Workspace остаётся обязательной открытой задачей.
