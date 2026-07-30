# Losoma — актуальный handoff

Последнее обновление: 2026-07-30.

## Непосредственная точка возобновления

Production release завершён и проверен. Не повторять hero/performance-работу и не деплоить её
снова. Следующая полезная работа — Search Console, Google Business Profile и подтверждение
владельцем открытых юридических/безопасностных фактов.

Порядок следующему агенту:

1. Прочитать `CLAUDE.md`, `SITE.md`, этот файл и профильный checklist задачи.
2. Проверить `git status`; не откатывать пользовательские изменения.
3. Если работа продолжается с Google Search Console, проверять только пять ожидающих canonical URL:
   `/garten-landschaftspflege`, `/solaranlagenreinigung`, `/treppenhausreinigung`, `/kontakt`,
   `/impressum`. Для неиндексированного URL сначала выполнить Live URL Test; запрос считать
   принятым только при явном сообщении `Indexierung wurde beantragt`.
4. Не отправлять повторно `/hausmeisterservice` и `/grundreinigung`; не отправлять redirect,
   `.html` и trailing-slash варианты.
5. Если работа продолжается с Google Business Profile, проверить существующую почтовую цепочку
   support case `2-2514000041594`. Новый дублирующий профиль не создавать.
6. Для следующего изменения кода выполнить полный preflight. Production release — только по
   новому явному запросу пользователя и с новой rollback-копией.

## Production release 2026-07-30

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
- Явное подтверждение запроса индексации получено для `/hausmeisterservice` и
  `/grundreinigung` — их не отправлять повторно.
- `/garten-landschaftspflege` и `/solaranlagenreinigung` прошли Live URL Test. Запросы для них и
  `/treppenhausreinigung` завершились одинаковой общей ошибкой Google и не считаются принятыми.
- `/kontakt`: `URL ist Google nicht bekannt`.
- `/impressum`: `Gefunden – zurzeit nicht indexiert`.
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
- После принятия приглашения выдержать 7 полных дней, затем передать `Primärer Inhaber`;
  `losoma@web.de` оставить резервным владельцем ещё 2–4 недели.
- Workspace, Gmail, Sheet `Anfragen`, Apps Script, GA4 `G-QPX35L2ZGK` и Search Console работают
  под `maxim@losoma.de`.
- Gmail/DNS migration завершена: Google MX, один SPF, DKIM 2048, DMARC `p=none`; внешняя доставка и
  пересылка WEB.DE проверены.
- Полный operational checklist: `GOOGLE_ACCOUNT_TRANSFER_CHECKLIST.md`.

## Открытые блокеры, которые нельзя закрывать предположением

- Точный зарегистрированный Inhaber, Rechtsform и legal entity. Текущая связка
  `Einzelunternehmen` + `Maxim Soga / Alexandr Lozinschi` требует документального подтверждения.
- Факт назначения Datenschutzbeauftragter.
- Hostinger DPA, Google Workspace DPA и Google Analytics data-processing terms/AVV.
- GA4 retention: выбран срок 14 месяцев, но сохранение и повторная проверка в Admin не завершены.
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
