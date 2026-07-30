# Losoma — актуальный handoff

Последнее обновление: 2026-07-30.

## Непосредственная точка возобновления

Production release завершён и проверен. Не повторять hero/performance-работу и не деплоить её
снова. Email migration на `info@losoma.de` полностью завершена: Workspace alias, direct delivery,
WEB.DE forwarding с сохранением копий, private Hostinger recipient, source/legal/form release и
разрешённый form-to-Gmail-and-Sheet E2E test подтверждены на production.

Порядок следующему агенту:

1. Прочитать `CLAUDE.md`, `SITE.md`, этот файл и профильный checklist задачи.
2. Проверить `git status`; не откатывать пользовательские изменения.
3. Не повторять email migration или реальный form test без новой причины: раздел 8A
   `GOOGLE_ACCOUNT_TRANSFER_CHECKLIST.md` закрыт. Текущий public/form recipient — `info@losoma.de`.
4. Если работа продолжается с Google Search Console, проверять только три ожидающих canonical URL:
   `/solaranlagenreinigung`, `/treppenhausreinigung`, `/kontakt`. Для неиндексированного URL
   сначала выполнить Live URL Test; запрос считать
   принятым только при явном сообщении `Indexierung wurde beantragt`.
5. Не отправлять повторно `/hausmeisterservice`, `/grundreinigung` и
   `/garten-landschaftspflege`; `/impressum` уже индексирован. Не отправлять redirect, `.html` и
   trailing-slash варианты.
6. Если работа продолжается с Google Business Profile, проверить существующую почтовую цепочку
   support case `2-2514000041594`. Новый дублирующий профиль не создавать.
7. Для следующего изменения кода выполнить полный preflight. Production release — только по
   новому явному запросу пользователя и с новой rollback-копией.

## Email migration production release 2026-07-30

- URL: `https://losoma.de`; Hostinger target: `domains/losoma.de/public_html`.
- Release создан из текущего проверенного working tree; отдельный commit/push ещё не выполнялся.
- Rollback-копия сохранена вне public web root:
  `domains/losoma.de/losoma-production-pre-info-20260730-2014.zip`.
- Release ZIP сохранён вне `public_html`:
  `domains/losoma.de/releases/losoma-release-20260730-2014.zip`, `29,727,654` байт, SHA-256
  `ec9a512878ef98857461f3d2f54deda4f8ef93fa4b4cc7bdbefe4d064a627d86`.
- `npm run build`, `npm run audit:classes:strict`, `npm run audit:seo`,
  `node --check script.js` и `git diff --check` прошли до upload; секретов в `dist/` нет.
- Server-side и local SHA-256 совпали для `.htaccess`, index/legal/contact HTML, CSS/JS,
  robots/sitemap и PHP API. Все 15 canonical URL, robots, sitemap и `/api/health` вернули `200`.
- Проверены `301` HTTP/www/`.html`/trailing slash/privacy и сохранение query string.
- На 15 live HTML страницах найден только `info@losoma.de`; прежний public email отсутствует.
  Impressum, Datenschutz, Kontakt, footer/`mailto:` и Schema/contactPoint проверены отдельно.
- Private Hostinger recipient переключён на `info@losoma.de`; секреты остались вне Git и
  `public_html`. Live Apps Script project head имеет тот же fallback, active Version 3 принимает
  приоритетный `payload.recipient`, поэтому новый Apps Script deployment не требовался.
- Разрешённый тест `LOSOMA Techniktest` показал production success UI. Workspace Gmail получил
  `Neue Losoma Anfrage: Hausmeisterservice` с получателем `an info`; в Sheet `Anfragen` появилась
  строка `2026-07-30T13:37:54Z`. Console errors на form и legal pages отсутствуют.

## Предыдущий hero/performance production release 2026-07-30

- URL: `https://losoma.de`.
- Hostinger target: `domains/losoma.de/public_html`.
- Source commit: `b28859c` (`Deploy hero performance and responsive media fixes`).
- Перед загрузкой hPanel создал ручную backup-копию `2026-07-30 17:08`.
- Release ZIP: `losoma-release-20260730-1708.zip`, SHA-256
  `b30d5684a25e69819237bb7adf58cf188c3341d5e48e5f18c488515888dd3a0e`.
- ZIP распакован непосредственно в `public_html` с overwrite и после проверки перемещён в
  Hostinger Trash; публично архив не оставлен.
- Все 15 canonical HTML URL вернули `200` и побайтно совпали с `dist/`.
- Побайтно совпали `styles.css`, `script.js`, `robots.txt`, `sitemap.xml`, hero poster,
  representative responsive AVIF и hero MP4.
- Hero MP4: `1920x1080`, `5,731,171` байт, SHA-256
  `2283c7429ef384598ac4445da183b6450688ce78f99d91193239c94fb894714b`.
- `/api/health`: `200`, `{"ok":true,"service":"losoma-contact"}`.
- Реальная форма не отправлялась: такой тест создаёт письмо и строку Google Sheet и требует
  отдельного предупреждения/разрешения.
- Проверены `301`: HTTP -> HTTPS, `www` -> apex, `/index.html`, публичные `.html`, trailing slash,
  `/blog/`, `/blog/index.html`, вложенная blog `.html`/slash, `/privacy*`, `/impressum/`.
  Query string сохраняется.
- Hostinger cache не очищался: production сразу отдавал актуальные хеши.
- Git `main` отправлен в `origin/main`; после release working tree был чистым.

## Hero, video и performance — зафиксированное решение

- First-visit loader заканчивается независимо от видео через `900 ms`; при reduced motion — `0 ms`.
- MP4 получает `src` только после `window.load` и idle-паузы. При Save-Data, `slow-2g`, `2g` или
  reduced motion остаётся статический poster.
- Пользователь отклонил `960x540` MP4 из-за заметной потери качества. Исходный 30-секундный мастер
  весил около `444 MB`; текущий web-MP4 `5.73 MB` — минимально приемлемое качество. Не сжимать и
  не уменьшать разрешение без нового явного решения пользователя.
- Poster оптимизирован с `253,086` до `133,868` байт.
- Три карточки ниже hero используют AVIF/WebP `480/768/1200` через `srcset`/`sizes`.
- Contrast scrim усиливается под hero-текстом и не меняет видео/object-fit. Production screenshots
  `412x915@3` и `1440x1000` подтвердили: H1 и описание читаемы, видео их не перекрывает.

Post-release Chrome DevTools mobile trace (`Slow 4G`, CPU `4x`, `412x915@3`):

- LCP `2,978 ms`; LCP-элемент — `H1#hero-title`.
- TTFB `511 ms`; render delay `2,467 ms`.
- CLS `0`.
- DOM: 582 элемента; largest layout update `137 ms`.
- Forced reflow `171 ms`, unattributed; estimated metric savings отсутствует.
- Render-blocking и cache insights оценили прямую экономию FCP/LCP как `0 ms`; не выдавать их
  за высокий приоритет без новой измеримой экономии.
- Lighthouse production mobile: Accessibility `100`, Best Practices `100`, SEO `100`, Agentic
  Browsing `100`; 56 passed, 0 failed.
- Console `error`/`warn`/`issue`: отсутствуют. 42 наблюдавшихся network request завершились
  `200`, `204` или корректным MP4 range-response `206`.
- CrUX page-level data пока отсутствуют. Lab trace не заменяет полевые Core Web Vitals.

## Chrome DevTools environment

- Установлен официальный `chrome-devtools-mcp` `1.1.1`.
- Codex configuration использует абсолютный binary
  `/Users/glebstepanovich/.npm-global/bin/chrome-devtools-mcp` без сетевого `npx`.
- Не возвращать `npx -y chrome-devtools-mcp@latest`: npm registry давал `ETIMEDOUT`.
- После перезапуска сначала проверить наличие MCP tools `navigate_page` и
  `performance_start_trace`. Официальный `chrome-devtools` CLI — тот же настроенный server и может
  использоваться, если прямые tools не появились.

## Search Console — срез 2026-07-30

- Актуальный аккаунт: `maxim@losoma.de`; domain property `losoma.de` доступна.
- Sitemap повторно отправлен и принят; Google обнаружил 15 URL.
- Отчёт `Seiten` всё ещё показывал срез 2026-07-24: 6 индексировано, 13 не индексировано.
- URL Inspection подтвердил индексацию `/blog`, `/gewerbliche-reinigung`,
  `/industriereinigung`, `/fassaden-hoehenarbeiten`.
- Явное подтверждение запроса индексации получено для `/hausmeisterservice`,
  `/grundreinigung` и `/garten-landschaftspflege` — их не отправлять повторно.
- `/impressum` подтверждённо индексирован актуальной URL Inspection.
- Свежие Live URL Test подтвердили доступность Garten, Solar, Treppenhaus и Kontakt и по одному
  валидному Breadcrumb. Запрос Solar снова завершился общей ошибкой Google; после неё
  Treppenhaus и Kontakt в этой сессии не отправлялись.
- `Leistung` на момент последней проверки: 5 кликов, 11 показов, CTR `45,5%`, средняя позиция
  `1,6`; запрос `losoma` — 4 клика / 5 показов.
- Детальный срез и приоритеты: `SEO-AUDIT-2026-07-30.md`, `SEO_CHECKLIST.md`,
  `SEO_RANKING_CHECKLIST.md`.

## Google Business Profile и Workspace

- Существующий публичный профиль `LOSOMA Gebäudeservice` нельзя удалять или дублировать.
- `losoma@web.de` остаётся `Primärer Inhaber`; приглашение `maxim@losoma.de` как `Inhaber`
  зависло и не отображается у получателя.
- Support case: `2-2514000041594`. Последний ответ от Kushal 2026-07-30: проверка продолжается,
  нового действия от клиента пока не запрошено. Отвечать только в существующей цепочке.
- Повторная проверка `Personen und Zugriffsrechte` 2026-07-30 подтвердила: `losoma@web.de` —
  `Primärer Inhaber`, а `maxim@losoma.de` всё ещё находится в `Ausstehend` как `Inhaber`.
- После принятия приглашения выдержать 7 полных дней, затем передать `Primärer Inhaber`;
  `losoma@web.de` оставить резервным владельцем ещё 2–4 недели.
- Workspace, Gmail, Sheet `Anfragen`, Apps Script, GA4 `G-QPX35L2ZGK` и Search Console работают
  под `maxim@losoma.de`.
- В Drive подтверждено владение `Losoma Anfragen` и `Losoma Contact Form` аккаунтом Максима.
- GA4 data-processing terms приняты 2026-07-10. Retention сохранён и повторно проверен:
  `Nutzerdaten = 14 Monate`, `Ereignisdaten = 14 Monate`.
- Gmail/DNS migration завершена: Google MX, один SPF, DKIM 2048, DMARC `p=none`; внешняя доставка и
  пересылка WEB.DE проверены.
- `info@losoma.de` добавлен как alias существующего user `maxim@losoma.de`; admin/login/owner
  идентификаторы не менялись. Прямой WEB.DE -> alias test доставлен в Gmail в 19:21.
- WEB.DE forwarding изменён на `info@losoma.de`, режим `Dauerhaft weiterleiten` и
  `Kopie im Postfach behalten` включены. Recipient-side подтверждение завершено; WEB.DE показал
  успешную активацию. Независимый тест после активации получен в обоих ящиках в 19:51: retained
  copy в WEB.DE Spam и forwarded copy в Gmail Inbox.
- Public/legal/form references и private Hostinger recipient заменены на `info@losoma.de` и
  опубликованы на production. Live Apps Script project head сохранён с
  `RECIPIENT_EMAIL = "info@losoma.de"`; active deployment остаётся Version 3, но endpoint использует
  переданный PHP `payload.recipient`, поэтому новый Apps Script deployment для этой смены не нужен.
- Локальные `npm run build`, `npm run audit:classes:strict` и `npm run audit:seo` прошли; SEO-аудит
  подтвердил 15 indexable pages и 15 sitemap URLs.
- Разрешённый production E2E test подтвердил success UI, письмо `an info` в Workspace и строку
  Sheet `Anfragen` с timestamp `2026-07-30T13:37:54Z`.
- Полный operational checklist: `GOOGLE_ACCOUNT_TRANSFER_CHECKLIST.md`.

## Открытые блокеры, которые нельзя закрывать предположением

- Точный зарегистрированный Inhaber, Rechtsform и legal entity. Текущая связка
  `Einzelunternehmen` + `Maxim Soga / Alexandr Lozinschi` требует документального подтверждения.
- Факт назначения Datenschutzbeauftragter.
- Hostinger DPA и Google Workspace DPA/AVV.
- 2FA и recovery/backup codes для Google Workspace и Hostinger.
- Часы, координаты, founding date, priceRange, реальные кейсы/фото/отзывы для Schema и GBP.
- Финальная проверка Impressum/Datenschutz немецким юристом/Datenschutz-специалистом.

Список вопросов владельцу: `MAXIM_QUESTIONS.md`. Legal tracking: `LEGALS_CHECKLIST.md`.

## Следующая SEO/контентная работа

1. Через 7–14 дней после release 2026-07-30 снять сопоставимый Search Console срез.
2. Уточнить Title/H1 главной под intent `Gebäudeservice Berlin` без переспама и потери текущего
   позиционирования.
3. Усилить `/grundreinigung` и `/hausmeisterservice` только реальными service-specific фактами:
   границы работ, частота, оборудование, безопасность, факторы цены, кейс, фото и отдельный FAQ.
4. Затем усилить `/treppenhausreinigung`, `/garten-landschaftspflege` и
   `/solaranlagenreinigung`; не делать одинаковый шаблонный рерайт.
5. Завершить GBP transfer, добавить реальные фото/отзывы и только после подтверждения добавить
   Maps/Profile URL в сайт и Schema.

## Проверки перед любым следующим release

```text
npm run build
npm run audit:classes:strict
npm run audit:seo
node --check script.js
git diff --check
```

Дополнительно обязательны новый dated Hostinger backup, проверка secrets, сверка production с
`dist/`, smoke всех 15 URL, redirects/canonical/health и фиксация commit/result в документации.

Не удалять старые WordPress/file/database backups и Hostinger rollback-копии без отдельного
письменного решения. Старые SSH-реквизиты `metropoolvastgoedbe@ssh002.webhosting.be` относятся к
другому hosting account и не должны использоваться для LOSOMA.
