# Deployment Checklist

Рабочий чеклист для проекта: верстка сайта, небольшой backend для автоматизации, Cloudflare, аналитика, Turnstile, cookies/consent и production launch.

## 1. Входные данные

- [ ] Получить ссылку на дизайн.
- [ ] Проверить все адаптивы: desktop, tablet, mobile.
- [ ] Проверить состояния UI: hover, focus, active, disabled, loading, error, success.
- [ ] Получить ассеты: изображения, видео, иконки, favicon.
- [ ] Уточнить шрифты и способ подключения.
- [ ] Получить домен.
- [ ] Уточнить регистратора домена.
- [x] Получить или создать доступ к Cloudflare.
- [ ] Уточнить, какие страницы нужны.
- [ ] Уточнить, какие формы нужны.
- [ ] Уточнить, куда отправлять заявки: email, Telegram, CRM, Google Sheets или другое.
- [ ] Уточнить, нужна ли CMS или контент будет меняться через код.
- [ ] Уточнить языковые версии.
- [ ] Уточнить юридические страницы: Privacy Policy, Cookie Policy, Terms.

## 2. Архитектура

- [ ] Зафиксировать стек frontend.
- [ ] Зафиксировать стек backend.
- [ ] Решить, нужен ли отдельный сервер или достаточно Cloudflare Workers.
- [ ] Решить, нужна ли база данных.
- [ ] Спроектировать поток заявки.
- [ ] Спроектировать поток аналитики.
- [ ] Спроектировать consent flow.
- [ ] Определить окружения: local, staging, production.

Рекомендуемая базовая схема:

```text
User -> Website -> Cloudflare Turnstile -> Backend -> Email / Telegram / CRM / Sheets
User -> Cookie Consent -> Google Tag Manager / GA4
```

## 3. Репозиторий

- [ ] Проверить текущую структуру проекта.
- [ ] Добавить или обновить README.
- [ ] Добавить `.env.example`, если появится backend.
- [x] Проверить `.gitignore`.
- [x] Зафиксировать команды запуска и деплоя.
- [x] Описать структуру проекта.
- [x] Описать, где хранятся настройки и секреты.

## 4. Верстка

- [ ] Разобрать дизайн на компоненты.
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

## 5. SEO

- [x] Прочитать локальную SEO-базу.
- [x] Прочитать Notion-контекст Losoma.
- [x] Зафиксировать правила AI SEO и class naming.
- [ ] Заполнить `title` для каждой страницы.
- [ ] Заполнить `description` для каждой страницы.
- [ ] Настроить Open Graph.
- [ ] Настроить favicon.
- [ ] Добавить `robots.txt`.
- [ ] Добавить `sitemap.xml`.
- [ ] Проверить canonical URL.
- [ ] Проверить 404 страницу.
- [ ] Проверить semantic HTML.

## 6. Backend

- [ ] Определить endpoint'ы.
- [ ] Добавить `GET /api/health`.
- [ ] Добавить endpoint для формы, например `POST /api/contact`.
- [ ] Добавить server-side validation.
- [ ] Добавить Cloudflare Turnstile verification.
- [ ] Добавить rate limiting.
- [ ] Настроить CORS.
- [ ] Настроить отправку заявок.
- [ ] Настроить логирование.
- [ ] Настроить обработку ошибок.
- [ ] Проверить fallback на случай ошибки email/Telegram/CRM.
- [ ] Подготовить `.env.example`.
- [ ] Проверить backend локально.
- [ ] Проверить backend на staging.

Возможные переменные окружения:

```text
TURNSTILE_SECRET_KEY=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
GA_MEASUREMENT_ID=
GTM_ID=
```

## 7. Cloudflare

- [ ] Добавить домен в Cloudflare.
- [ ] Поменять nameservers у регистратора.
- [ ] Настроить DNS.
- [ ] Настроить SSL/TLS.
- [ ] Включить HTTPS redirect.
- [ ] Настроить canonical redirect: `www` -> root или root -> `www`.
- [ ] Включить Brotli.
- [ ] Настроить caching.
- [ ] Настроить Redirect Rules, если нужны.
- [ ] Настроить WAF, если нужен.
- [ ] Настроить environment variables для Pages/Workers.
- [ ] Настроить preview/staging deployments.
- [x] Подготовить Cloudflare Pages headers.
- [x] Подготовить Cloudflare Pages redirects.
- [x] Создать Cloudflare Pages project `losoma`.
- [x] Выполнить Cloudflare Wrangler login.

## 8. Cloudflare Turnstile

- [ ] Создать Turnstile site.
- [ ] Получить site key.
- [ ] Получить secret key.
- [ ] Добавить production domain.
- [ ] Добавить staging domain.
- [ ] Подключить widget на frontend.
- [ ] Проверять token только на backend.
- [ ] Проверить ошибочный token.
- [ ] Проверить успешную отправку.

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
- [ ] Добавить env variables.
- [x] Выполнить первый staging deploy.
- [ ] Проверить staging URL.
- [ ] Подключить custom domain.
- [x] Проверить production URL.

## 10. Деплой backend

Если Cloudflare Workers:

- [ ] Подготовить `wrangler.toml`.
- [ ] Настроить routes.
- [ ] Добавить secrets.
- [ ] Задеплоить Worker.
- [ ] Проверить endpoint'ы.
- [ ] Проверить логи.

Если VPS:

- [ ] Подготовить сервер.
- [ ] Установить Node.js.
- [ ] Настроить process manager: `pm2` или `systemd`.
- [ ] Настроить reverse proxy: Nginx или Caddy.
- [ ] Настроить SSL.
- [ ] Закрыть прямой доступ к серверу, если Cloudflare проксирует.
- [ ] Настроить deploy через GitHub Actions, rsync или SSH.

## 11. Формы

- [ ] Подключить frontend-формы к backend.
- [ ] Добавить client-side validation.
- [ ] Добавить server-side validation.
- [ ] Добавить Turnstile widget.
- [ ] Проверить Turnstile verification на backend.
- [ ] Добавить состояния: idle, submitting, success, validation error, server error.
- [ ] Защитить от повторной отправки.
- [ ] Проверить rate limit.
- [ ] Проверить доставку заявки.
- [ ] Проверить ошибку доставки.
- [ ] Проверить UX после успешной отправки.

## 12. Analytics

- [ ] Создать или получить GA4 property.
- [ ] Получить Measurement ID.
- [ ] Решить: прямой GA4 или Google Tag Manager.
- [ ] Подключить GTM/GA4.
- [ ] Настроить page view.
- [ ] Настроить form start.
- [ ] Настроить form submit.
- [ ] Настроить form success.
- [ ] Настроить form error.
- [ ] Настроить CTA click.
- [ ] Настроить phone click.
- [ ] Настроить email click.
- [ ] Настроить messenger click.
- [ ] Настроить outbound click, если нужен.
- [ ] Настроить conversions в GA4.
- [ ] Проверить события через GA4 DebugView.
- [ ] Проверить события после consent.

## 13. Cookies / Consent

- [ ] Определить категории cookies: necessary, analytics, marketing, preferences.
- [ ] Добавить cookie banner.
- [ ] Добавить хранение выбора пользователя.
- [ ] Добавить возможность изменить выбор.
- [ ] Интегрировать Google Consent Mode v2.
- [ ] Не грузить analytics/marketing до согласия, если выбран строгий режим.
- [ ] Проверить отказ пользователя.
- [ ] Проверить повторный визит.
- [ ] Подготовить Cookie Policy.
- [ ] Подготовить Privacy Policy.

## 14. Безопасность

- [ ] Проверить, что секреты не попали в код.
- [ ] Проверить `.env` и `.gitignore`.
- [ ] Ограничить CORS.
- [ ] Добавить rate limit.
- [ ] Валидировать все backend inputs.
- [ ] Проверять Turnstile server-side.
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

- [x] Добавить Sharp image pipeline.
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

- [ ] Сделать финальный build.
- [ ] Проверить staging.
- [ ] Подключить production domain.
- [ ] Проверить DNS propagation.
- [ ] Проверить SSL.
- [ ] Проверить redirects.
- [ ] Проверить формы на production.
- [ ] Проверить Turnstile на production domain.
- [ ] Проверить GA4 realtime.
- [ ] Проверить cookie banner.
- [ ] Проверить sitemap.
- [ ] Добавить сайт в Google Search Console.
- [ ] Подтвердить ownership в Search Console.
- [ ] Отправить sitemap в Search Console.
- [ ] Зафиксировать launch date.

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
