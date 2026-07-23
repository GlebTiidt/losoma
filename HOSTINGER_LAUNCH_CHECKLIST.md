# Hostinger Production Launch Checklist

Рабочий чек-лист безопасного переноса нового сайта Losoma с Vercel preproduction на
Hostinger production (`https://losoma.de`). Последнее обновление: 2026-07-23.

## Launch result — 2026-07-23

- [x] Production переключён на новый статический сайт; старый WordPress и база сохранены в
      проверенных rollback backup.
- [x] Hostinger PHP 8.2 backend и private config/state работают вне публичного исходного кода.
- [x] reCAPTCHA v3 и синхронный Datenschutz-текст опубликованы; формы проверены.
- [x] HTTPS, canonical host, clean URLs, security/cache headers, robots и sitemap работают.
- [x] Cookie consent и GA4 Realtime проверены после consent.
- [x] Search Console domain property подтверждён; sitemap обработан без ошибок (15 URL), запрос
      повторной индексации главной отправлен.
- [x] 2026-07-23 production SEO smoke test: 15/15 страниц HTTP 200, `index, follow`, правильный
      canonical, JSON-LD и отсутствие блокирующего `X-Robots-Tag`.
- [ ] Наблюдать production 72 часа и закрыть вопросы из `MAXIM_QUESTIONS.md`.

Остальная часть файла ниже — журнал выполненной миграции и rollback-инструкция. Не интерпретировать
старые незакрытые prelaunch-пункты как признак того, что WordPress всё ещё активен.

## Launch sprint — 2026-07-23 (60–120 минут)

Цель сессии: загрузить и проверить release на Hostinger, получить финальный `GO`,
атомарно переключить `losoma.de` и оставить проверенный rollback. В этой сессии не
меняем MX/SPF/DKIM, не удаляем WordPress backup и не очищаем старую базу.

### A. Freeze и read-only snapshot — 0–15 минут

- [ ] Зафиксировать: пользователь/хост SSH, document root, PHP version и текущее время
      сервера.
- [ ] Снять read-only snapshot DNS A/AAAA/CNAME/MX/TXT, SSL certificate, redirects и cron.
- [ ] Убедиться, что production всё ещё отвечает как WordPress и backup от 2026-07-22
      доступен вне web root.
- [ ] Заморозить контент/код до завершения launch; не добавлять новые правки в release.

### B. Финальный release и staging — 15–45 минут

- [ ] Собрать свежий `dist/`; пройти `node --check`, strict class audit и `git diff --check`.
- [ ] Создать новый timestamped release archive и зафиксировать SHA-256.
- [ ] Создать на Hostinger отдельный staging/release-каталог, не меняя active
      `public_html`.
- [ ] Загрузить release, проверить server-side SHA-256, распаковать в staging.
- [ ] Создать `domains/losoma.de/private/contact-config.php` и state directory вне
      публичного web root; выставить минимальные права.
- [ ] Не переносить секреты в Git, release archive, shell history или вывод команд.

### C. Staging QA и launch blockers — 45–75 минут

- [ ] Проверить PHP syntax, `/api/health`, clean URLs, 404, assets, MIME types, cache/security
      headers и запрет directory listing.
- [ ] Проверить форму без доставки: GET → 405, invalid JSON/payload → 400, honeypot и
      duplicate/rate-limit behavior; не создавать письмо/строку Sheet.
- [ ] Подключить reCAPTCHA v3 для `losoma.de`/`www.losoma.de`: frontend token перед submit,
      backend action/hostname/score verification, secret в private config.
- [ ] Одновременно с reCAPTCHA обновить `datenschutz.html`; без синхронного
      обновления CAPTCHA не включать.
- [ ] Быстро проверить desktop + mobile: `/`, `/kontakt`, одну service page, `/blog`,
      `/impressum`, `/datenschutz`, cookie reject/accept/settings и отсутствие GA до consent.
- [ ] Подтвердить launch blockers: корректные owner/Impressum, DPO/retention решение,
      Hostinger/Google AVV/DPA и фактический form recipient.

### D. Go / No-Go и production switch — 75–100 минут

- [ ] Показать короткий отчёт: release hash, staging QA, открытые риски и точный
      rollback path.
- [ ] Получить от пользователя явное `GO` на замену текущего WordPress в active
      `public_html`. До этого пункта production не менять.
- [ ] Переименовать текущий `public_html` в timestamped rollback-каталог и атомарно
      переименовать проверенный release в `public_html`; базу не трогать.
- [ ] Проверить из внешней сети: HTTP → HTTPS, www → apex, home/assets, clean URLs,
      legal pages, `robots.txt`, `sitemap.xml`, `/api/health` и ошибочные form requests.
- [ ] Откатить сразу, если HTTPS/routing/assets/legal pages/form backend не исправляются
      в течение 10 минут.

### E. Acceptance и post-launch — 100–120 минут

- [ ] С отдельного разрешения отправить одну уникальную реальную заявку; подтвердить
      success UI, HTTP 200, email и строку `Anfragen`.
- [ ] Проверить GA4 Realtime только после consent; повторно проверить Gmail, не меняя
      почтовые DNS records.
- [ ] Сохранить active release path/hash, rollback path, время launch и результат QA.
- [ ] Подтвердить приёмку; оставить Vercel и WordPress backup как rollback.
- [ ] После стабилизации, не задерживая launch: Search Console verification и submission
      `https://losoma.de/sitemap.xml`.

### Stop conditions

- Не переключать production, если нет свежего release hash, защищённого private config,
  успешного staging QA, rollback path и явного `GO`.
- Не пытаться «дожать» launch в окно: при нерешённом HTTPS/routing/form/legal blocker
  оставить WordPress active и перенести переключение.

## 0. Жёсткие правила запуска

- Не открывать, не изменять и не тестировать текущий WordPress/`public_html` без отдельного
  прямого разрешения пользователя на конкретную backup/launch-задачу.
- Не удалять и не перезаписывать единственную копию WordPress, базы, `.htaccess`,
  `wp-config.php` или `wp-content/uploads`.
- Сначала полный backup файлов и базы, затем проверка читаемости и rollback, только потом
  любые изменения production.
- Vercel остаётся preproduction и rollback-источником до письменного подтверждения успешного
  Hostinger launch.
- Не менять MX/SPF/DKIM во время веб-миграции. Почта `@losoma.de` работает через Google
  Workspace; изменение web hosting не должно затронуть email DNS.
- Не хранить webhook/reCAPTCHA secrets в Git, `dist/`, публичном `public_html` или документации.
- Любая реальная тестовая заявка создаёт письмо и строку Google Sheet; заранее предупреждать
  пользователя и получать разрешение.

## Подтверждённый порядок работ

- [x] Подготовить release candidate и Hostinger-совместимый PHP backend без изменения production.
- [x] Сделать и проверить полный backup текущего WordPress и базы.
- [ ] Загрузить новый сайт в отдельный staging-каталог на Hostinger.
- [ ] Настроить форму и секреты на Hostinger.
- [ ] Уже на Hostinger подключить и проверить invisible reCAPTCHA v3; Vercel не является
      обязательным этапом настройки CAPTCHA.
- [ ] Уже на Hostinger выполнить Google Search Console verification, затем отправить sitemap;
      до загрузки сайта на Hostinger верификацию не считать блокером переноса.
- [ ] Провести staging QA, получить `GO`, атомарно переключить `public_html` и выполнить
      production smoke test.

## Session checkpoint — 2026-07-22

- [x] Пользователь разрешил read-only SSH-инспекцию Hostinger и отдельное создание backup.
- [x] Подтверждены Hostinger Business, PHP 8.2.30, Composer 2.9.8, MariaDB client и SSH;
      Node.js на аккаунте отсутствует, production backend выбран на PHP.
- [x] Подтверждён document root: `domains/losoma.de/public_html`; текущий WordPress 7.0.2
      занимает около 704 МБ и содержит 19 174 файла до архивирования.
- [x] Подготовлены `api/contact.php`, `api/health.php`, Hostinger `.htaccess`, приватный config
      template и файловый rate-limit/duplicate state вне web root.
- [x] Удалены исходные медиа, старый image pipeline, неиспользуемые deploy assets, npm-пакеты
      и локальные кэши; `dist/` содержит только release-файлы и занимает около 29 МБ.
- [x] Release archive сохранён вне репозитория:
      `/Users/glebstepanovich/ShipStudio/releases/losoma-hostinger-rc-20260722.tar.gz`;
      SHA-256 `73b189d08a9beef881abecfe2fa12229d32ab639fc12f18b67e0169b2ea1a379`.
- [x] Серверный backup сохранён вне web root: `~/backups/losoma-prelaunch-20260722-1836/`.
- [x] Постоянная локальная копия сохранена вне репозитория:
      `/Users/glebstepanovich/ShipStudio/backups/losoma-prelaunch-20260722-1836/`.
- [x] Файловый архив: 402 793 861 bytes, 22 594 archive entries, SHA-256
      `3d3572680eb9a4621127986865280e5f326a09d55c62b6d6715b938bfb8b4b62`.
- [x] Database dump: 1 702 308 bytes, 75 `CREATE TABLE`, SHA-256
      `0eb9cee3085e76c95ba66c0257e9cbbfaf5a08383d82afd2cde40ee6f684ecca`.
- [x] Обе серверные и локальные копии прошли `sha256sum -c` и `gzip -t`; в архиве
      подтверждены `wp-config.php`, `.htaccess`, `wp-admin` и `wp-content/uploads`.
- [x] После backup production остался без изменений и ответил `HTTP 200` как WordPress.
- [ ] Следующая сессия: read-only snapshot DNS/SSL/redirects/cron, затем только после нового
      разрешения создать защищённый `staging.losoma.de` и загрузить туда release candidate.
- [ ] До отдельного `GO` не изменять и не заменять текущий `public_html`, WordPress или базу.

## 1. Что спросить и подтвердить у клиента

- [x] Клиент письменно разрешил backup и read-only инспекцию Hostinger/WordPress 2026-07-22.
- [ ] Клиент письменно разрешает замену старого WordPress новым статическим сайтом.
- [ ] Согласованы дата, время и допустимое окно работ/простоя.
- [ ] Согласован человек, который даст финальное `GO / NO-GO` и проверит сайт после запуска.
- [ ] Подтверждён точный владелец/Verantwortlicher: формулировка `Einzelunternehmen` и
      сочетание `Maxim Soga / Alexandr Lozinschi` должны соответствовать регистрационным
      документам; один Einzelunternehmen не должен ошибочно выглядеть как два владельца.
- [ ] Подтверждено, назначен ли Datenschutzbeauftragter.
- [ ] Подтверждён срок хранения заявок в Google Sheets/Gmail и ответственные за регулярное
      удаление старых заявок.
- [ ] Клиент разрешает Google Sheets + Gmail как канал обработки заявок.
- [ ] Клиент подтверждает, что `maxim@losoma.de` — рабочий публичный и form-recipient email.
- [ ] Клиент или юрист финально проверил Impressum и Datenschutzerklärung.

## 2. Закрыть блокеры до загрузки на Hostinger

- [ ] Не подключать reCAPTCHA и не выполнять Search Console verification на Vercel: эти два
      шага выполняются после загрузки release candidate на Hostinger.
- [ ] Проверить GA4 Consent Mode v2 вручную: default denied, no GA request before consent,
      granted only after `Statistik`, revoke removes GA cookies.
- [ ] Проверить текущую GA4 data-retention настройку (2 или 14 месяцев) и зафиксировать её.
- [ ] Подтвердить/принять DPA/AVV для Google Workspace, Google Analytics, Vercel и Hostinger.
- [ ] Сверить subprocessors и международные передачи; сохранить внутреннюю дату проверки.
- [ ] Получить финальную юридическую проверку owner/Verantwortlicher, DPO и retention.
- [x] Создать и проверить `sitemap.xml`.
- [ ] Проверить `robots.txt`, canonical, OG URLs/images и structured data.
- [ ] Закрыть реальные Facebook/Instagram ссылки или убрать нерабочие `#...` заглушки.

## 3. Подготовить техническую архитектуру Hostinger

- [x] После разрешения определить фактический Hostinger plan и доступные runtime: PHP,
      Node.js, cron, SSH, writable private directory, environment variables/secrets.
- [x] Выбрать production endpoint формы:
  - предпочтительно Hostinger-native endpoint с тем же origin;
  - PHP — базовый вариант для shared hosting;
  - Node.js — только если план официально поддерживает постоянное приложение и routing.
- [x] Подготовить перенос логики `POST /api/contact` без ослабления защиты: body-size limit,
      validation, honeypot, rate limiting, duplicate protection, reCAPTCHA verification,
      timeout, safe errors и server-side webhook call.
- [ ] Хранить `CONTACT_WEBHOOK_URL`, `CONTACT_WEBHOOK_SECRET`, `CONTACT_TO_EMAIL` и
      `RECAPTCHA_SECRET_KEY` вне публичного web root; права доступа — минимум необходимые.
- [x] Не переносить секреты через HTML/JavaScript и не добавлять их в `.env.example` значениями.
- [x] Подготовить `GET /api/health` без секретов и персональных данных.
- [ ] Настроить HTTPS, same-origin form endpoint, security headers и ограничение методов.
- [x] Определить безопасное место/механизм rate-limit state; не полагаться на необязательную
      память процесса в serverless/shared среде.
- [x] Подготовить журналирование без form payload, webhook secret, reCAPTCHA token и email body.
- [ ] Проверить лимиты `MailApp`, Apps Script Web App и Google Workspace.

## 4. Preproduction freeze и release candidate

- [ ] Зафиксировать последний Vercel deployment ID и immutable URL.
- [ ] Заморозить контент на время подготовки релиза; новые изменения идут отдельным циклом QA.
- [x] Выполнить:

```bash
npm run build
node --check script.js
node --check api/contact.js
npm run audit:classes:strict
git diff --check
```

- [x] Удалить исходные медиа и старый image pipeline; оставить только канонические deployable assets.
- [ ] Проверить все страницы на desktop/tablet/mobile, клавиатуру, focus, формы, cookie UI,
      legal pages, меню, sliders и success-плашки.
- [ ] Проверить 404, прямые URL без `.html`, trailing slash и внутренние ссылки.
- [x] Сохранить checksum/архив release candidate `dist/` вне `public_html`.

## 5. Backup старого WordPress

Выполнять только после отдельного разрешения.

- [x] Записать Hostinger account/site, document root и текущую версию PHP.
- [x] Сделать полный файловый backup минимум:
  - `public_html`;
  - `.htaccess`;
  - `wp-config.php`;
  - `wp-content/uploads`;
  - плагины, темы и иные пользовательские файлы.
- [x] Экспортировать всю WordPress database с корректной кодировкой.
- [x] Сохранить backup вне каталога, который будет заменён; по возможности скачать вторую
      копию локально/в отдельное защищённое хранилище.
- [x] Проверить размеры, список файлов, архив и структуру SQL dump; пустой/битый backup не считать
      backup.
- [ ] Зафиксировать текущие DNS A/AAAA/CNAME/MX/TXT, SSL, redirects и cron jobs.
- [x] Проверить, что rollback-артефакты содержат и файлы, и базу, а не только `public_html`.

## 6. Staged upload на Hostinger

- [ ] Не загружать release впервые прямо поверх WordPress.
- [ ] Создать отдельный непубличный или защищённый staging-каталог на Hostinger.
- [ ] Загрузить туда содержимое `dist/` и production backend.
- [ ] Настроить Hostinger secrets/config вне публичного каталога.
- [ ] Проверить права файлов/каталогов и запрет directory listing.
- [ ] Проверить `.htaccess`/routing для extensionless URL, `/api/contact`, `/api/health`,
      HTTPS и canonical host.
- [ ] Не переносить старые WordPress rewrites в новый static routing без проверки.
- [ ] Тестировать staged copy через безопасный preview/hosts mapping только с разрешения;
      не менять публичный DNS ради первого теста.

## 7. Настройка CAPTCHA и Google уже на Hostinger

- [ ] Создать production key pair invisible reCAPTCHA v3 для `losoma.de` и выбранного
      canonical host (`www.losoma.de`, если он используется).
- [ ] Подключить получение token непосредственно перед submit на Hostinger frontend.
- [ ] На Hostinger backend проверять token, ожидаемый action, hostname и score; secret хранить
      вне `public_html` и Git.
- [ ] Проверить пустой, неверный, просроченный и повторно использованный token без реальной
      доставки заявки.
- [ ] Одновременно с фактическим включением reCAPTCHA обновить `datenschutz.html`.
- [ ] С разрешения выполнить один end-to-end test: success UI, email и строка Sheet.
- [ ] Подтвердить `losoma.de` в Google Search Console уже после загрузки сайта на Hostinger:
      предпочтительно через DNS TXT, либо HTML/meta verification, если выбран именно этот
      способ.
- [ ] Убедиться, что verification сохраняется после переключения `public_html` и редиректов.
- [ ] Отправить production `sitemap.xml` в Search Console после публичного запуска.

## 8. Go / No-Go перед переключением

- [x] Backup и database export проверены.
- [ ] Rollback-команды/шаги записаны и понятны.
- [ ] Hostinger staged site проходит smoke test.
- [ ] Form endpoint на Hostinger проходит validation/reCAPTCHA tests без реальной доставки.
- [ ] Пользователь разрешил один реальный end-to-end test.
- [ ] Legal page обновлена под фактический production flow: Hostinger hosting; Vercel удалить
      из active hosting/form текста только если production больше не отправляет через Vercel.
- [ ] Client/legal `GO` получен непосредственно перед переключением.

## 9. Переключение production

- [ ] Включить короткое maintenance window, если выбранный способ требует простоя.
- [ ] Сохранить последнюю копию изменившихся WordPress файлов/БД после начала окна.
- [ ] Выполнить максимально атомарное переключение подготовленного release в `public_html`.
- [ ] Не удалять backup WordPress и не очищать базу.
- [ ] Проверить HTTPS и отсутствие mixed content.
- [ ] Проверить `/`, все service pages, `/kontakt`, `/blog`, `/impressum`, `/datenschutz`,
      `robots.txt`, `sitemap.xml`, 404 и assets.
- [ ] Проверить canonical redirect (`www` ↔ apex) и HTTP → HTTPS.
- [ ] Убедиться, что MX/SPF/DKIM остались без изменений и Gmail работает.

## 10. Production QA после переключения

- [ ] Очистить/обойти cache и проверить desktop/tablet/mobile.
- [ ] Проверить cookie banner до выбора, reject, accept, settings и revoke.
- [ ] Проверить GA4 Realtime/DebugView только с разрешённым consent.
- [ ] Проверить reCAPTCHA hostname/action/score в production.
- [ ] С разрешения отправить одну уникальную форму.
- [ ] Подтвердить одновременно:
  - success-плашка остаётся до reload;
  - HTTP success;
  - письмо пришло на `maxim@losoma.de`;
  - строка появилась в Google Sheet `Anfragen`;
  - в логах нет payload/secrets.
- [ ] Проверить Search Console, sitemap и отсутствие резкого роста 404.
- [ ] Проверить внешнюю и внутреннюю почту после launch.

## 11. Rollback criteria

Откатывать без затягивания, если:

- главные страницы/стили/assets не открываются;
- HTTPS или canonical routing сломан;
- форма теряет заявки или выдаёт повторяющиеся/опасные ошибки;
- legal pages недоступны;
- email DNS был затронут;
- невозможно быстро доказать целостность production.

Rollback:

- [ ] Убрать новый release из active document root без удаления его диагностической копии.
- [ ] Восстановить WordPress-файлы, `.htaccess` и `wp-config.php` из проверенного backup.
- [ ] При необходимости восстановить database dump.
- [ ] Проверить старый сайт, wp-admin, HTTPS и почту.
- [ ] Зафиксировать причину, время и выполненные действия; следующую попытку делать только
      после исправления и полного повторного QA.

## 12. После стабильного запуска

- [ ] Наблюдать формы, 404, uptime, GA4 и Search Console минимум 72 часа.
- [ ] Оставить Vercel staging и WordPress backup на согласованный переходный период.
- [ ] Не удалять rollback-копии без отдельного решения клиента и политики хранения.
- [ ] Обновить `HANDOFF.md`, `SITE.md`, `README.md`, `DEPLOYMENT_CHECKLIST.md`, legal docs и
      текущий deployment/hosting source of truth.
- [ ] Через 30 дней провести post-launch review: backups, обновления legal, retention заявок,
      reCAPTCHA false positives и доступы бывших владельцев/подрядчиков.
