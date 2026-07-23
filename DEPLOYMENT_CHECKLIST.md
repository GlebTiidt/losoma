# Deployment Checklist

Рабочий чеклист для проекта: верстка сайта, server-side форма, аналитика, reCAPTCHA v3, cookies/consent, полный QA на Vercel preproduction и последующий production launch на Hostinger.

Для фактической миграции production обязательным и более детальным источником является
`HOSTINGER_LAUNCH_CHECKLIST.md`. Этот общий чеклист не заменяет backup/go-no-go/rollback порядок.

## Production checkpoint — 2026-07-23

- [x] Новый статический сайт запущен на Hostinger `https://losoma.de`; WordPress сохранён в
      проверенных rollback backup.
- [x] Hostinger PHP endpoint, reCAPTCHA v3 и обе production-формы работают.
- [x] Cookie consent и GA4 `G-QPX35L2ZGK` проверены; Realtime получил `page_view`, `cta_click`,
      `form_start` только после согласия на Statistik.
- [x] Search Console подтверждён; production sitemap обработан без ошибок, найдено 15 страниц.
- [x] Все 15 canonical URL возвращают 200, `index, follow`, не имеют блокирующего
      `X-Robots-Tag`; robots разрешает обход.
- [x] `npm run build`, class audits и `npm run audit:seo` проходят.
- [ ] Остаются post-launch legal/operations вопросы из `MAXIM_QUESTIONS.md` и мониторинг 72 часа.

Исторические prelaunch-пункты ниже сохранены как журнал миграции; этот checkpoint имеет приоритет
при любом конфликте.

## 0. Правило хостинга и релиза

- [x] **Текущий рабочий контур — только предпродакшн Vercel:** `https://losoma-pi.vercel.app`.
- [x] **WordPress полностью вне текущего scope:** не открывать админку, не инспектировать, не тестировать формы/API, не изменять файлы/БД и не отправлять запросы на WordPress без отдельного прямого разрешения пользователя.
- [x] Все текущие QA-проверки сайта, формы, API, cookies, analytics и legal-страниц выполнять только на Vercel staging.
- [x] Не отправлять тестовые формы и не создавать внешние данные (Google Sheets, email, analytics events) без предварительного предупреждения и разрешения пользователя.
- [x] Зафиксировать: текущий production `losoma.de` остаётся на Hostinger до финального запуска нового сайта.
- [x] Зафиксировать: текущий Hostinger `public_html` содержит WordPress (`wp-admin`, `wp-content`, `wp-includes`) и не должен удаляться/перезаписываться в процессе обычной разработки.
- [x] Зафиксировать: Vercel используется только как staging/preview (`losoma-pi.vercel.app`), не как финальный production.
- [x] Зафиксировать: финальный хостинг нового сайта — только Hostinger.
- [x] Зафиксировать: архитектура — Vercel preproduction → Hostinger production.
- [x] Hostinger/SFTP/SSH, WordPress admin и доступ к базе существуют. Не использовать их без отдельного прямого разрешения пользователя на backup/launch-задачу.
- [x] Доступ к базе текущего WordPress для будущего бэкапа подтверждён; сам бэкап ещё не выполнялся.
- [ ] До отдельного разрешения пользователя вообще не обращаться к WordPress/`public_html`; резервную копию и read-only инспекцию выполнять только как отдельную согласованную задачу перед релизом.
- [ ] Не запускать финальную замену сайта, пока не готовы legal, Google account/profile/map requirements, формы, SEO и QA.
- [ ] Перед любой миграцией Google-сервисов читать и обновлять
  `GOOGLE_ACCOUNT_TRANSFER_CHECKLIST.md`; не удалять существующий Business Profile и не менять
  почтовые DNS/форму до выполнения его проверок.

Финальная схема:

```text
Development repo -> npm run build -> dist/
dist/ -> Hostinger public_html
Current WordPress -> backup / rollback copy
```

Deployable AVIF/WebP/MP4 являются каноническими файлами. Исходные медиа и старый image pipeline
удалены перед Hostinger release; для сборки использовать только `npm run build`.

## 1. Входные данные

- [ ] Получить ссылку на дизайн.
- [ ] Проверить все адаптивы: desktop, tablet, mobile.
- [ ] Проверить состояния UI: hover, focus, active, disabled, loading, error, success.
- [ ] Получить ассеты: изображения, видео, иконки, favicon.
- [ ] Уточнить шрифты и способ подключения.
- [ ] Получить домен.
- [ ] Уточнить регистратора домена.
- [ ] Уточнить, какие страницы нужны.
- [ ] Уточнить, какие формы нужны.
- [x] Уточнить, куда отправлять заявки: Google Sheets + email на `maxim@losoma.de`.
- [ ] Уточнить, нужна ли CMS или контент будет меняться через код.
- [ ] Уточнить языковые версии.
- [ ] Уточнить юридические страницы: Privacy Policy, Cookie Policy, Terms.

## 2. Архитектура

- [ ] Зафиксировать стек frontend.
- [ ] Зафиксировать стек backend.
- [x] Preproduction backend проверяется на Vercel; production endpoint переносится на Hostinger только после полного QA.
- [ ] Решить, нужна ли база данных.
- [ ] Спроектировать поток заявки.
- [ ] Спроектировать поток аналитики.
- [ ] Спроектировать consent flow.
- [ ] Определить окружения: local, staging, production.

Рекомендуемая базовая схема:

```text
User -> Website -> reCAPTCHA v3 -> server-side endpoint -> Google Sheets + email
User -> Cookie Consent -> Google Tag Manager / GA4
```

## 3. Репозиторий

- [ ] Проверить текущую структуру проекта.
- [ ] Добавить или обновить README.
- [x] Добавить `.env.example`, если появится backend.
- [x] Проверить `.gitignore`.
- [x] Зафиксировать команды запуска и деплоя.
- [x] Описать структуру проекта.
- [x] Описать, где хранятся настройки и секреты.

## 4. Верстка

- [ ] Разобрать дизайн на компоненты.
- [x] Зафиксировать правило верстки: сначала Figma `get_design_context` / CSS Dev Mode values, затем перевод в веб-систему через semantic classes, grid/flex, `rem` и `clamp()`.
- [x] Зафиксировать Finsweet Client-First как стандарт нейминга классов.
- [x] Мигрировать существующие project-owned классы с `__` / `--` на Client-First.
- [x] После миграции включить `npm run audit:classes:strict` в проверочный процесс.
- [ ] Зафиксировать дизайн-токены: цвета, типографика, spacing, breakpoints, radius.
- [ ] Подключить шрифты.
- [ ] Оптимизировать изображения.
- [ ] Сверстать desktop.
- [ ] Сверстать tablet.
- [ ] Сверстать mobile.
- [ ] Реализовать header/navigation.
- [ ] Реализовать footer.
- [ ] Реализовать формы.
- [ ] Реализовать модальные окна, если нужны.
- [ ] Реализовать меню на мобильных.
- [ ] Проверить hover/focus states.
- [ ] Проверить keyboard navigation.
- [ ] Проверить доступность labels у форм.
- [ ] Проверить контраст.
- [ ] Проверить отсутствие горизонтального скролла.
- [ ] Проверить, что текст не вылезает из контейнеров.
- [ ] Опционально: перевести desktop-типографику и desktop-размеры ключевых блоков на `clamp()` с сохранением текущих максимальных значений из макета.

## 5. SEO

- [x] Прочитать локальную SEO-базу.
- [x] Прочитать Notion-контекст Losoma.
- [x] Зафиксировать правила AI SEO и class naming.
- [ ] Заполнить `title` для каждой страницы.
- [ ] Заполнить `description` для каждой страницы.
- [ ] Настроить Open Graph.
- [ ] Настроить favicon.
- [x] Добавить `robots.txt`.
- [ ] Добавить `sitemap.xml`.
- [ ] Проверить canonical URL.
- [ ] Проверить 404 страницу.
- [ ] Проверить semantic HTML.

## 6. Backend

- [ ] Определить endpoint'ы.
- [x] Добавить `GET /api/health` для Hostinger PHP backend.
- [x] Добавить endpoint для формы: `POST /api/contact`.
- [x] Добавить server-side validation.
- [ ] Включить подготовленную reCAPTCHA v3 verification после staged upload на Hostinger;
      базовый form/email QA завершён 2026-07-22.
- [x] Добавить rate limiting.
- [ ] Настроить CORS.
- [x] Подтвердить end-to-end отправку: `HTTP 200`, письмо на `maxim@losoma.de` и строка в Google Sheet визуально проверены 2026-07-22.
- [ ] Настроить логирование.
- [ ] Настроить обработку ошибок.
- [ ] Проверить fallback на случай ошибки email/Telegram/CRM.
- [x] Подготовить `.env.example`.
- [ ] Проверить backend локально.
- [ ] Проверить backend на staging.

Возможные переменные окружения:

```text
RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
RECAPTCHA_MIN_SCORE=0.5
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
GA_MEASUREMENT_ID=
GTM_ID=
```

## 7. Preproduction Vercel → Production Hostinger

- [x] Vercel используется только для полного preproduction QA.
- [x] На Vercel проверить текущую форму, email и Sheets.
- [ ] На Vercel завершить общий page/responsive QA, cookies/consent и GA4; reCAPTCHA
      настраивается уже на Hostinger.
- [x] Подготовить Hostinger-совместимый PHP endpoint формы.
- [x] Перед переносом сделать полный backup WordPress/public_html и базы.
- [ ] Только по прямому разрешению пользователя загрузить проверенный `dist/` и backend на Hostinger.

## 8. reCAPTCHA v3

- [ ] После staged upload на Hostinger создать production reCAPTCHA v3 key pair.
- [ ] Добавить production domain; Vercel не является обязательным доменом для этого этапа.
- [ ] Подключить невидимый token на Hostinger frontend непосредственно при submit.
- [ ] Проверять token, action, hostname и score только на Hostinger backend.
- [ ] Проверить ошибочный, просроченный и повторно использованный token.
- [ ] Обновить Datenschutzerklärung одновременно с фактическим включением.

## 9. Деплой frontend

- [x] Выбрать хостинг frontend.
- [ ] Подключить репозиторий к хостингу.
- [x] Создать GitHub repo `glebtiidt-work/losoma`.
- [x] Запушить чистую `main` history без `node_modules`.
- [x] Настроить build command, если появится сборка.
- [x] Настроить output directory.
- [x] Настроить production branch.
- [x] Настроить preview deployments.
- [x] Подключить Vercel CLI к аккаунту `glebtiidt-work`.
- [x] Связать Vercel project с GitHub repo.
- [x] Проверить Vercel production URL.
- [x] Проверить, что в Vercel остался только alias `losoma-pi.vercel.app`.
- [x] Добавить env variables для текущей формы: Apps Script webhook + secret + recipient.
- [x] Выполнить первый staging deploy.
- [ ] Проверить staging URL.
- [ ] Подключить custom domain.
- [x] Проверить production URL.

## 10. Деплой backend

- [x] Проверить текущий endpoint на Vercel preproduction.
- [ ] Реализовать эквивалентный Hostinger-совместимый endpoint перед production launch.
- [ ] Перенести webhook URL, secret, recipient и reCAPTCHA secret в защищённые Hostinger variables/config вне public repository.
- [ ] Проверить endpoint и логи на Hostinger до переключения формы.

## 11. Формы

- [x] Подключить frontend-формы к backend.
- [x] Добавить client-side validation.
- [x] Добавить server-side validation.
- [ ] Добавить невидимую reCAPTCHA v3 после staged upload на Hostinger.
- [ ] Проверить reCAPTCHA v3 server-side непосредственно на Hostinger до публичного запуска.
- [x] Добавить состояния: idle, submitting, success, validation error, server error.
- [x] Защитить от повторной отправки.
- [ ] Проверить rate limit на live endpoint после настройки доставки.
- [x] Проверить доставку заявки: Google Sheet + email на `maxim@losoma.de` подтверждены 2026-07-22.
- [x] Проверить ошибку доставки.
- [x] Проверить UX после успешной отправки: вся форма заменяется зелёной плашкой с чёрным увеличенным текстом до перезагрузки.

## 12. Analytics

- [x] Создать GA4 account/property/web stream в business Google account.
- [x] Account name: `Losoma Gebäudeservice`.
- [x] Property name: `Losoma Website`.
- [x] Reporting timezone: Germany/Berlin.
- [x] Currency: EUR.
- [x] Industry category: `Immobilien`.
- [x] Business size: `Klein: 1 bis 10 Mitarbeiter`.
- [x] Business goals: `Leads generieren` и `Web- und/oder App-Traffic analysieren`.
- [x] Web stream URL: `https://losoma.de`.
- [x] Web stream name: `Losoma Website`.
- [x] Enhanced measurement left enabled.
- [x] Получить Measurement ID: `G-QPX35L2ZGK`.
- [x] Решить: прямой GA4 через `gtag.js`, без Google Tag Manager на текущем этапе.
- [x] Подключить GA4 только после consent.
- [x] Добавить Consent Mode v2 default denied до загрузки/активации GA4.
- [x] Настроить default denied для `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`.
- [x] После согласия на `Statistik` выдавать только `analytics_storage: granted`; ads fields оставить denied.
- [x] Настроить page view через GA4 config после consent.
- [x] Настроить form start.
- [x] Настроить form submit.
- [x] Настроить form success.
- [x] Настроить form error.
- [x] Настроить CTA click.
- [x] Настроить phone click.
- [x] Настроить email click.
- [ ] Настроить messenger click, если появится реальный messenger link.
- [x] Настроить outbound click.
- [ ] Настроить conversions в GA4.
- [ ] Проверить события через GA4 DebugView.
- [x] Проверить события после consent: production Realtime подтвердил `page_view`, `cta_click` и `form_start` 2026-07-23; 1Blocker корректно блокирует GA4 у пользователей с активной защитой.

## 13. Cookies / Consent

- [x] Определить категории cookies: только `necessary` и `statistics` для текущего сайта.
- [x] Зафиксировать первый слой: `Ihre Privatsphäre ist uns wichtig`, ссылка на `/datenschutz`, кнопки `Alle ablehnen`, `Alle akzeptieren`, `Einstellungen`, без close icon до первого выбора.
- [x] Зафиксировать второй слой: `Notwendige Cookies` disabled ON / `Immer aktiv`, `Statistik` OFF by default, кнопки `Alle akzeptieren` и primary `Auswahl speichern`.
- [x] Зафиксировать cookie icon: после сохранённого выбора открывает сразу второй слой настроек.
- [x] Зафиксировать: баннер закрывается только после явного выбора (`Alle ablehnen`, `Alle akzeptieren`, `Auswahl speichern`).
- [x] Зафиксировать: на первом визите нет `X`/close icon; после сохранённого выбора settings panel можно закрывать без изменений, если UI это предусматривает.
- [x] Зафиксировать: `Marketing`, `Externe Medien`, `Preferences` не добавлять, пока реально нет Ads, внешних media/maps или preference storage.
- [x] Добавить cookie banner.
- [x] Добавить хранение выбора пользователя.
- [x] Добавить возможность изменить выбор.
- [x] Интегрировать Google Consent Mode v2.
- [x] Не грузить/не активировать analytics до согласия на `Statistik`.
- [x] При отзыве `Statistik` выставлять consent denied и удалять GA cookies (`_ga`, `_ga_*`).
- [ ] Проверить отказ пользователя вручную в браузере.
- [ ] Проверить повторный визит вручную в браузере.
- [ ] Проверить повторное открытие настроек через cookie icon и footer button вручную в браузере.
- [x] Подготовить/обновить Cookie/Consent section в Datenschutzerklärung.
- [x] Синхронизировать Privacy Policy с фактически активным потоком данных (2026-07-22).
- [ ] Получить финальное юридическое подтверждение владельца/формы, DPO, retention и DPA/AVV.

## 14. Безопасность

- [ ] Проверить, что секреты не попали в код.
- [ ] Проверить `.env` и `.gitignore`.
- [ ] Ограничить CORS.
- [x] Добавить rate limit.
- [x] Валидировать все backend inputs.
- [ ] Проверять reCAPTCHA token/action/score только server-side.
- [ ] Настроить security headers.
- [ ] Проверить HTTPS.
- [ ] Проверить доступ к служебным endpoint'ам.
- [ ] Проверить dependency audit, если появятся зависимости.

Security headers к проверке:

```text
Content-Security-Policy
X-Frame-Options или frame-ancestors
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
```

## 15. Performance

- [x] Удалить старый Sharp image pipeline и исходные медиа; оставить канонические deployable assets.
- [x] Настроить AVIF + WebP + JPEG/PNG fallback.
- [x] Зафиксировать правила нейминга изображений.
- [ ] Использовать WebP/AVIF, где возможно.
- [ ] Настроить responsive image sizes.
- [ ] Добавить lazy loading для тяжелых изображений.
- [ ] Минимизировать JS.
- [ ] Убрать неиспользуемый CSS.
- [ ] Проверить font loading.
- [ ] Проверить Lighthouse Performance.
- [ ] Проверить Lighthouse Accessibility.
- [ ] Проверить Lighthouse Best Practices.
- [ ] Проверить Lighthouse SEO.
- [ ] Проверить LCP.
- [ ] Проверить CLS.
- [ ] Проверить INP.
- [ ] Настроить кеширование статики.

## 16. QA

- [ ] Проверить desktop.
- [ ] Проверить tablet.
- [ ] Проверить mobile.
- [ ] Проверить Chrome.
- [ ] Проверить Safari.
- [ ] Проверить Firefox.
- [ ] Проверить iOS Safari.
- [ ] Проверить Android Chrome.
- [ ] Проверить все ссылки.
- [ ] Проверить все формы.
- [ ] Проверить ошибки форм.
- [ ] Проверить 404.
- [ ] Проверить robots/sitemap.
- [ ] Проверить Open Graph preview.
- [ ] Проверить redirects.
- [ ] Проверить analytics events.
- [ ] Проверить consent behavior.
- [ ] Проверить backend logs.
- [ ] Проверить доставку заявок.

## 17. Production Launch

Выполнять этот раздел только вместе с `HOSTINGER_LAUNCH_CHECKLIST.md` и после отдельного
прямого разрешения пользователя на конкретное окно переноса.

- [ ] Сделать финальный build: `npm run build`.
- [ ] Проверить, что `dist/` содержит только публичные файлы сайта и не содержит `assets/source`, `assets/normalized`, `.vercel`, `node_modules`, локальные `.env`.
- [ ] Проверить staging на Vercel/preview URL.
- [ ] Сделать полный файловый бэкап Hostinger `public_html`.
- [ ] Сделать бэкап базы данных WordPress.
- [ ] Отдельно сохранить `.htaccess`, `wp-config.php`, `wp-content/uploads`.
- [ ] Зафиксировать точный rollback-план: как вернуть текущий WordPress, если новый сайт нужно откатить.
- [ ] Перевести текущий WordPress в безопасное состояние для отката: скачать архив или переместить файлы в timestamped backup folder, если позволяет место.
- [ ] Залить содержимое `dist/` в корень Hostinger `public_html`.
- [ ] Проверить, что корень `public_html` отдаёт новый `index.html`, а не старый WordPress `index.php`.
- [ ] Проверить `.htaccess`/rewrite rules для clean URLs (`/hausmeisterservice`, `/kontakt`, `/datenschutz`, `/impressum`).
- [ ] Проверить `losoma.de` по HTTPS.
- [ ] Проверить redirects и canonical URL.
- [ ] Проверить все основные страницы на production.
- [ ] Проверить формы на production.
- [ ] Проверить reCAPTCHA v3 на production domain после переноса на Hostinger.
- [ ] Проверить GA4 realtime, если аналитика включена.
- [ ] Проверить cookie banner, если он включён.
- [ ] Проверить `robots.txt` и `sitemap.xml`.
- [ ] Уже после загрузки сайта на Hostinger добавить сайт в Google Search Console.
- [ ] Подтвердить ownership в Search Console через DNS TXT либо размещённый на Hostinger
      HTML/meta verification.
- [ ] Отправить sitemap в Search Console.
- [ ] Зафиксировать launch date и список файлов/бэкапов.

## 18. После запуска

- [ ] Мониторить backend errors.
- [ ] Проверить первые заявки.
- [ ] Проверить GA4 события и conversions.
- [ ] Проверить индексацию в Search Console.
- [ ] Проверить performance через 24-48 часов.
- [ ] Настроить алерты, если нужны.
- [ ] Документировать финальные доступы и места деплоя.
- [ ] Документировать процесс обновления контента.
- [ ] Документировать процесс деплоя.
- [ ] Документировать процесс ротации ключей.
