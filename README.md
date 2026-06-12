# Losoma Website

Рабочий README проекта. Здесь фиксируем все детали по сайту, backend-автоматизации, Cloudflare, аналитике, cookies/consent и деплою.

## Project Notes

- Статус: подготовка к верстке и деплою.
- Дизайн: ожидается ссылка.
- Домен: ожидается.
- Cloudflare: Pages project `losoma` создан.
- Backend: планируется небольшой backend для автоматизации.
- Analytics: планируется Google Analytics / Google Tag Manager.
- Anti-spam: планируется Cloudflare Turnstile.
- Cookies/consent: планируется cookie banner и связка с аналитикой.

## Working Checklist

Основной чеклист процесса: [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

## Project Structure

```
index.html       # Homepage
about.html       # About page
styles.css       # All styles
script.js        # All JavaScript
CLAUDE.md        # Instructions for Claude Code
README.md        # Project notes and operational details
DEPLOYMENT_CHECKLIST.md
```

## Local Development

Сейчас проект работает как обычный статический сайт без build step. Можно открыть `index.html` напрямую в браузере или запустить Cloudflare Pages dev server.

Команды:

```text
npm run dev
npm run build
npm run deploy:preview
npm run deploy
```

## Deployment Plan

Предварительная схема:

```text
Frontend -> Cloudflare Pages or static hosting
Backend -> Cloudflare Workers or small Node.js service
DNS/CDN/SSL -> Cloudflare
Anti-spam -> Cloudflare Turnstile
Analytics -> Google Tag Manager / GA4
Consent -> Cookie banner + Google Consent Mode
```

Текущий Cloudflare Pages project name:

```text
losoma
```

Production URL:

```text
https://losoma.pages.dev
```

Latest production deployment:

```text
https://3b280962.losoma.pages.dev
```

Latest preview deployment:

```text
https://69844c6b.losoma.pages.dev
```

Preview alias:

```text
https://preview.losoma.pages.dev
```

Direct Upload deploy command:

```text
npm run deploy
```

Preview deploy command:

```text
npm run deploy:preview
```

Vercel production URL:

```text
https://losoma-pi.vercel.app
```

GitHub repository:

```text
https://github.com/glebtiidt-work/losoma
```

## Access And Services

Заполняем по мере появления доступов.

```text
Domain registrar:
Cloudflare account: gleb.tiidt.freelance@gmail.com
Cloudflare account ID: 2bedcd032916f6e9d1b1b63562113a3d
Hosting: Cloudflare Pages, project `losoma`
Vercel account: glebtiidt-work
Vercel project: gleb-projects-work/losoma
Vercel production URL: https://losoma-pi.vercel.app
GitHub repository: https://github.com/glebtiidt-work/losoma
Backend hosting:
GA4 property:
GTM container:
Turnstile site:
Email/Telegram/CRM destination:
```

## Environment Variables

Заполняем после выбора backend и интеграций. Секреты не записываем в README, только названия переменных и где они используются.

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

## Decisions Log

- 2026-06-12: Создан общий чеклист процесса и README для фиксации деталей проекта.
- 2026-06-12: Для первого Cloudflare-подключения выбран Cloudflare Pages Direct Upload с project name `losoma`. Backend позже добавляем отдельно как Worker или Pages Functions.
- 2026-06-12: Wrangler 4.100.0 установлен локально, Cloudflare login выполнен, Pages project `losoma` создан, production deploy доступен на `https://losoma.pages.dev`.
- 2026-06-12: Vercel CLI перелогинен на `glebtiidt-work`, проект `gleb-projects-work/losoma` связан с GitHub repo.
- 2026-06-12: GitHub repo `glebtiidt-work/losoma` создан и запушен чистой историей без `node_modules`.
- 2026-06-12: Vercel production deployment от GitHub push готов и отвечает `200` на `https://losoma-pi.vercel.app`.

## Known Issues

- 2026-06-12: Production URL отвечает `200`. Preview deployment создан, но `curl` с этой машины получил SSL handshake failure на preview URL; перепроверить позже, возможно SSL/alias еще прогревается.
- 2026-06-12: Первый Vercel CLI deploy упал из-за output directory `public`, затем resolved через `vercel.json`, GitHub push и новый Vercel deployment.

## Open Questions

- Какой финальный домен?
- Где зарегистрирован домен?
- Где будет хоститься frontend?
- Backend делаем на Cloudflare Workers или на отдельном сервере?
- Куда отправлять заявки?
- GA4/GTM уже созданы или создаем с нуля?
- Нужны ли CMS и многоязычность?
