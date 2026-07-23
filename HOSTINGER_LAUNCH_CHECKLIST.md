# Hostinger Production Checklist

Production: `https://losoma.de` → `domains/losoma.de/public_html`.

## Безопасный выпуск

1. Проверить scope, worktree и открытые legal/security риски.
2. Запустить build и все audits из `DEPLOYMENT_CHECKLIST.md`.
3. Проверить, что PHP API и `.htaccess` присутствуют в `dist/`.
4. Сохранить текущую production-копию, если релиз меняет код или legal-текст.
5. Загрузить `dist/` по SSH/SCP в `public_html`.
6. Сверить хеши: `.htaccess`, `index.html`, `datenschutz.html`, `impressum.html`,
   `styles.css`, `script.js`, `robots.txt`, `sitemap.xml`, `api/contact.php`, `api/health.php`.
7. Выполнить production smoke/SEO тест всех 15 URL.
8. При отдаче старых файлов очистить Hostinger cache и повторить проверку.
9. Commit и push только проверенного состояния.

## Rollback

- Не удалять резервную копию предыдущего WordPress и базы без отдельного письменного решения.
- При критической ошибке восстановить последнюю рабочую production-копию, затем диагностировать
  локально. Не исправлять generated файлы напрямую на сервере как постоянное решение.

## Данные и безопасность

- Секрет reCAPTCHA и Apps Script webhook secret должны находиться вне Git и public web root.
- Форма создаёт внешние данные; тестировать только после предупреждения пользователя.
- Hostinger и Google administrative access должен оставаться у уполномоченных лиц.
- 2FA для Hostinger и Google Workspace остаётся обязательной открытой задачей.
