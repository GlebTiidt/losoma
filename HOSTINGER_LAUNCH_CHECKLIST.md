# Hostinger Production Checklist

Production: `https://losoma.de` → `domains/losoma.de/public_html`.

Последнее обновление: 2026-07-30.

## Текущий подтверждённый production

- Release 2026-07-30 опубликован из `dist/`; Git commit `b28859c`.
- Ручная rollback-копия hPanel: `2026-07-30 17:08`.
- Release ZIP SHA-256:
  `b30d5684a25e69819237bb7adf58cf188c3341d5e48e5f18c488515888dd3a0e`.
- ZIP после успешной распаковки убран из `public_html` в Hostinger Trash.
- Все 15 HTML URL, CSS/JS, robots/sitemap и выбранные media совпали с `dist/`; MP4 сохранил
  SHA-256 `2283c7429ef384598ac4445da183b6450688ce78f99d91193239c94fb894714b`.
- Старые SSH-реквизиты `metropoolvastgoedbe@ssh002.webhosting.be` относятся к другому hosting
  account и не должны использоваться для LOSOMA. Пока точный LOSOMA SSH не подтверждён,
  безопасный путь — авторизованный hPanel File Manager.

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
