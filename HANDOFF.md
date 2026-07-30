# Losoma — актуальный handoff

Последнее обновление: 2026-07-30.

## Непосредственная точка возобновления после перезапуска Codex

Chrome DevTools MCP уже подключён глобально:

```text
chrome-devtools  /Users/glebstepanovich/.npm-global/bin/chrome-devtools-mcp  enabled
```

- 2026-07-30 обнаружено, что прежняя запись `npx -y chrome-devtools-mcp@latest` не запускалась:
  npm registry дважды отвечал `ETIMEDOUT`, а пакет отсутствовал в локальном кэше.
- Официальный tarball `chrome-devtools-mcp` версии `1.1.1` установлен глобально; конфигурация Codex
  переведена на абсолютный локальный бинарник без сетевого `npx`. Включены изолированный headless
  Chrome, redaction сетевых заголовков, structured output, memory tools и просмотр фоновых страниц;
  Performance, Network, Emulation и CrUX оставлены включёнными, usage statistics/update checks
  отключены.
- В текущей сессии сервер проверен через официальный `chrome-devtools` CLI: daemon отвечает,
  `navigate_page` и `performance_start_trace` успешно выполнены. После следующего перезапуска Codex
  сначала проверить появление одноимённых MCP tools; переустанавливать пакет не нужно.
- Production release выполнен на Hostinger 2026-07-30. Перед загрузкой создана ручная резервная
  копия hPanel `2026-07-30 17:08`; сборка распакована в `domains/losoma.de/public_html` около
  `10:54 UTC`. Release ZIP SHA-256:
  `b30d5684a25e69819237bb7adf58cf188c3341d5e48e5f18c488515888dd3a0e`; после распаковки архив
  перемещён из `public_html` в корзину Hostinger.
- Все 15 production HTML URL возвращают `200` и побайтно совпадают с `dist/`; также совпали
  `styles.css`, `script.js`, `robots.txt`, `sitemap.xml`, poster, responsive AVIF и MP4. Видео
  сохранило SHA-256 `2283c7429ef384598ac4445da183b6450688ce78f99d91193239c94fb894714b`.
  `/api/health` отвечает `200` / `{"ok":true,"service":"losoma-contact"}`; реальная форма не
  отправлялась. Канонические редиректы и сохранение query string повторно проверены.
- Post-deploy cold mobile trace production (`Slow 4G`, CPU `4x`, `412x915@3`): LCP `2,978 ms`,
  CLS `0`, TTFB `511 ms`, render delay `2,467 ms`; LCP — `H1#hero-title`. Lighthouse production:
  Accessibility/Best Practices/SEO/Agentic Browsing `100/100/100/100`, 56/56 проверок, console
  error/warn/issue отсутствуют. Desktop/mobile screenshots подтвердили читаемый H1 поверх видео.
- Контрольный cold mobile trace production-главной выполнен с `Slow 4G`, CPU `4x` и viewport
  `412x915@3`: LCP `2,102 ms`, CLS `0`, LCP-элемент — текстовый `H1#hero-title`; TTFB `406 ms`,
  render delay `1,696 ms` (`80,7%` LCP). CrUX page-level data отсутствуют.
- Отдельная сетевая цепочка `script.js` -> `intl-tel-input/utils.js` достигает `4,662 ms`, но
  DevTools оценивает её прямую экономию LCP как `0 ms`; DOM содержит 587 элементов, крупнейший
  layout update — `118 ms`. Не выдавать эту цепочку за причину LCP без дополнительной проверки.
- Lighthouse mobile: Accessibility `96`, Best Practices `100`, SEO `100`, Agentic Browsing `100`.
  Найдены два класса a11y-ошибок: недостаточный contrast текста `.process-step-card_content > p`
  (`4.06:1`) и placeholder service selector (`3.5:1`), а также accessible-name mismatch у ссылки
  `.details-link` и карточки `.why-contact-card`. Отчёты сохранены временно в
  `/private/tmp/losoma-lighthouse/` и не являются репозиторными артефактами.
- Исправление hero и accessibility опубликовано на production 2026-07-30. First-visit loader
  заканчивается независимо от видео через `900 ms`
  (`0 ms` при reduced motion), MP4 получает `src` только после `window.load` и idle-паузы и не
  загружается при reduced motion, Save-Data или `2g`. Вариант MP4 `960x540` пользователь отклонил
  из-за заметной потери качества; восстановлен исходный `1920x1080`, `5,731,171` байт. Poster
  остаётся оптимизированным: примерно `131 KiB` вместо `247 KiB`.
- Пользователь уточнил, что исходный 30-секундный мастер весил около `444 MB`, а текущий web-MP4
  `5.73 MB` — уже нижняя приемлемая граница качества. Не перекодировать его повторно без отдельного
  явного решения; performance улучшать отложенной загрузкой, poster и окружающими ресурсами.
- Поверх hero-видео добавлен responsive contrast scrim: desktop затемняется справа/снизу под H1,
  tablet/phone — к нижнему текстовому блоку. Видео, разрешение и object-fit не менялись; локально
  проверено в Chrome на desktop и `390x844`.
- Post-fix mobile trace локальной сборки (`Slow 4G`, CPU `4x`, `412x915@3`) подтвердил CLS `0`,
  текстовый LCP `H1#hero-title`, запуск запроса MP4 после `load` и cold/no-cache LCP `2,128 ms`.
  Прогретый повтор дал `1,533 ms`. Локальный Python-сервер не сжимает HTML/CSS, поэтому эти числа
  не считать production-сравнением. Post-fix production trace зафиксирован выше. Локальный
  Lighthouse: Accessibility/Best Practices/SEO/Agentic Browsing — `100/100/100/100`.
- Responsive AVIF/WebP для трёх карточек ниже hero реализованы (`480/768/1200 px`, `srcset` и
  `sizes`). В чистом Chrome-контексте mobile `412x915@3` выбрал три 1200px AVIF общим размером
  `286,561` байт вместо `1,702,306` (`-83.2%`); desktop `1440@1` выбрал 480px варианты общим
  размером `65,878` байт (`-96.1%`). Insight `ImageDelivery` исчез.
- Финальный локальный mobile trace после responsive images: LCP `1,720 ms`, CLS `0`; Lighthouse
  Accessibility/Best Practices/SEO/Agentic Browsing — `100/100/100/100`. Render-blocking в
  локальном trace сосредоточен в CSS и `lenis.min.js`; абсолютную оценку Python-сервера не
  переносить на production без post-deploy trace. Forced reflow составил `38 ms`, но DevTools не
  оценил для него экономию метрик, поэтому он не является текущим приоритетом.
- Из пяти ожидающих URL повторно проверен только `/garten-landschaftspflege`: Search Console всё
  ещё показывает `URL ist nicht auf Google` / `URL ist Google nicht bekannt`. Повторная заявка не
  отправлялась. Остальные четыре URL в этой сессии не проверены.
- Пользователь явно попросил продолжить одновременно индексацию, hero/LCP и актуализацию всей
  документации на 2026-07-30.

Строгая последовательность продолжения:

1. Проверить `git status` и сохранить текущие пользовательские изменения в `.htaccess`,
   `CLAUDE.md`, `GOOGLE_ACCOUNT_TRANSFER_CHECKLIST.md`, `HANDOFF.md`, `SEO_CHECKLIST.md` и
   `SITE.md`.
2. В Search Console проверять только `/garten-landschaftspflege`,
   `/solaranlagenreinigung`, `/treppenhausreinigung`, `/kontakt`, `/impressum`. Для
   неиндексированного URL сначала выполнить `Live-URL testen`, затем запросить индексацию только
   при доступности URL для Google. Успехом считать только явное сообщение
   `Indexierung wurde beantragt`; одинаковую общую/quota/server ошибку повторно не спамить.
3. Не отправлять повторно `/hausmeisterservice` и `/grundreinigung`: для них запрос уже
   подтверждён. Не отправлять редиректы, `.html` и trailing-slash дубли.
4. Hero/LCP и accessibility уже опубликованы и проверены; повторно не реализовывать. Следующее
   изменение выпускать только отдельным Hostinger release с новой rollback-копией.
5. Post-deploy production trace выполнен с `Slow 4G`, CPU `4x` и viewport `412x915@3`; результат
   зафиксирован выше. PageSpeed baseline `LCP 4,4 s`, payload около `9,4 MB` относится к pre-fix
   версии и не является результатом текущего production release.
6. Локально уже прошли `npm run audit:seo`, `npm run audit:classes:strict`, `npm run build` и
   `node --check script.js`; перед будущим деплоем выполнить их заново на финальном diff.
7. После технической проверки привести документацию к одному срезу 2026-07-30: создать текущий
   SEO-аудит и только затем удалить `SEO-AUDIT-2026-07-28.md`; удалить из этого handoff устаревшие
   дублирующие исторические разделы; обновить `SITE.md`, `SEO_CHECKLIST.md`,
   `SEO_RANKING_CHECKLIST.md`, `GOOGLE_ACCOUNT_TRANSFER_CHECKLIST.md`, `MAXIM_QUESTIONS.md`.
   Не удалять действующие deployment/legal/privacy/account safety runbooks.
8. Следующий production release не выполнять без отдельного явного запроса. Для каждого выпуска
   обязательны новая датированная rollback-копия, сверка хешей и полный production smoke test.

Последний подтверждённый срез Search Console в этой сессии:

- sitemap успешно отправлен и прочитан 2026-07-30, обнаружено 15 URL;
- отчёт `Seiten` всё ещё показывает срез 2026-07-24: 6 индексировано, 13 не индексировано;
- `Leistung`, обновлённый примерно за 7,5 часа до проверки: 5 кликов, 11 показов,
  CTR `45,5%`, средняя позиция `1,6`; видимый запрос `losoma` — 4 клика / 5 показов;
- ручных мер и проблем безопасности нет; HTTPS — 0 проблем; Breadcrumbs — 6 валидных,
  0 невалидных; для Core Web Vitals пока недостаточно полевых данных за 90 дней.

## Следующему агенту: продолжение обязательного SEO-плана

1. Сначала прочитать `CLAUDE.md`, `SITE.md` и раздел 8
   «Обязательный план после SEO-аудита 2026-07-30» в `SEO_CHECKLIST.md`.
2. Проверить `git status` и сохранить все текущие пользовательские изменения. Не откатывать
   `.htaccess`, `SEO_CHECKLIST.md`, `SITE.md`, `HANDOFF.md` и остальные изменённые документы.
3. Канонизацию URL не переделывать: она уже выпущена и проверена на production 2026-07-30.
   HTTPS canonical-варианты старых URL дают один `301`; query string сохраняется. Полная цепочка
   `http://www` может содержать дополнительные host/scheme-переходы Hostinger/CDN, но заканчивается
   корректным `200` на `https://losoma.de/<clean-url>` без циклов.
4. Мобильный hero/LCP опубликован и проверен на production 2026-07-30; post-deploy cold trace
   зафиксирован выше. Не возвращать `preload="auto"` и ожидание video `canplay` в loader.
5. После скорости перейти к Title/H1 главной под основной intent `Gebäudeservice Berlin`, затем
   к самостоятельному усилению `/grundreinigung` и `/hausmeisterservice` реальными фактами,
   кейсами, фото и service-specific FAQ. Не делать формальный синонимический рерайт.
6. Любое следующее изменение сайта: `npm run audit:seo`, `npm run audit:classes:strict`,
   `npm run build`, `node --check script.js`; production-деплой только по явному запросу,
   с новой датированной rollback-копией и smoke test.
7. Chrome DevTools MCP `1.1.1` установлен глобально и настроен на локальный бинарник. После
   перезапуска Codex проверить наличие его инструментов; повторная установка и возврат к
   `npx ...@latest` не нужны.
8. Не повторять уже подтверждённые запросы индексации `/hausmeisterservice` и
   `/grundreinigung`. Позже пробовать только ожидающие URL из раздела ниже и фиксировать только
   явное подтверждение Search Console.

### Проверенное состояние редирект-релиза

- Production SHA-256 `.htaccess`:
  `621718aea7590dae3a4caa5eed021990674bd5b3a3854de6d5b58ba5b2a798c0`.
- Rollback:
  `domains/losoma.de/public_html/.htaccess.pre-global-canonical-20260730-01`.
- Проверены `301` для `/index.html`, service `.html`, service trailing slash, `/blog/`,
  `/blog/index.html`, вложенной blog `.html`/trailing slash, `/privacy*`, `/impressum/`.
- Проверены конечные `200` для главной, clean service URL, blog, legal pages,
  `/api/health` и статического ассета.
- В проекте отсутствует script `npm test`; использовать перечисленные выше реальные audits.

## Точка завершения сессии 2026-07-30

- На production настроена единая канонизация URL: `/index.html` → `/`,
  `/blog/` и `/blog/index.html` → `/blog`, публичные `*.html` → URL без расширения,
  trailing-slash страницы → URL без слэша. Проверены `301`, сохранение query string,
  конечные `200`, работоспособность `/api/health` и ассетов.
- Активный `.htaccess` совпал с локальной сборкой по SHA-256. Rollback-копия:
  `domains/losoma.de/public_html/.htaccess.pre-global-canonical-20260730-01`.
- В Search Console под `maxim@losoma.de` повторно отправлен sitemap с 15 URL; отправка успешна.
- Подтверждённые ручные запросы на индексацию: `/hausmeisterservice`, `/grundreinigung`.
- Уже индексируются: `/blog`, `/gewerbliche-reinigung`, `/industriereinigung`,
  `/fassaden-hoehenarbeiten`.
- `/garten-landschaftspflege` и `/solaranlagenreinigung` проходят Live URL Test и доступны
  Google, но ручная отправка вернула общую ошибку. Та же ошибка получена для
  `/treppenhausreinigung`; `/kontakt` и `/impressum` остаются неиндексированными и после
  повторяющейся ошибки не отправлялись.
- При продолжении позже запросить только пять ожидающих URL: Garten, Solar, Treppenhaus,
  Kontakt и Impressum. Не повторять уже подтверждённые Hausmeisterservice и Grundreinigung.
- Google Business Profile по-прежнему не передан. 2026-07-30 Kushal из поддержки сообщил,
  что команда продолжает проверку по Fall-ID `2-2514000041594`; нового действия не запрошено.
  Ждать следующий ответ и продолжать только в существующей почтовой цепочке.

## Точка завершения сессии 2026-07-28

- Релиз Instagram и расширенной Schema уже находится на production и подтверждён проверками;
  базовый feature-коммит: `2ea52f9` (`feat: publish Instagram and update structured data`).
- Незавершённых изменений сайта по Instagram или JSON-LD нет. Закрывающий коммит этой сессии
  меняет только документацию, поэтому повторный деплой на Hostinger не требуется.
- При возобновлении сначала прочитать `CLAUDE.md`, этот файл и `SITE.md`, затем проверить
  `git status` и актуальный production `.htaccess`.
- Следующие рабочие приоритеты: безопасная канонизация старых URL и повторная индексация в Search
  Console; передача существующего публичного Google Business Profile на `maxim@losoma.de` через
  текущую цепочку поддержки. Новый дублирующий Business Profile не создавать и существующий
  публичный профиль не удалять.
- Аккаунт `losoma@web.de` уже удалён из владельцев Search Console. Из Business Profile его можно
  удалить только после того, как `maxim@losoma.de` станет Primary owner с учётом 7-дневного
  ограничения Google.

## Production

- Сайт: `https://losoma.de`.
- Хостинг: Hostinger, каталог `domains/losoma.de/public_html`.
- Публичная сборка создаётся командой `npm run build` в `dist/`.
- Формы: `POST /api/contact` → Hostinger PHP → Google Apps Script → Google Sheet `Anfragen`
  и Gmail `maxim@losoma.de`.
- Защита форм: server validation, honeypot, rate limit, duplicate protection и Google
  reCAPTCHA v3 с серверной проверкой.
- Аналитика: GA4 `G-QPX35L2ZGK`, загружается только после согласия `Statistik`.
- Search Console доступна под `maxim@losoma.de`; `sitemap.xml` содержит 15 канонических URL.

## Проверено на production

- Все 15 индексируемых URL отвечают `200` и имеют `index, follow`, canonical и JSON-LD.
- Релиз 2026-07-28 добавил подтверждённый Instagram
  `https://www.instagram.com/losomagebaudeservice/` во все 15 футеров, контактный social-блок
  и homepage `sameAs`.
- JSON-LD обновлён по актуальным правилам: главная содержит полный
  `Organization` + `HomeAndConstructionBusiness` + `WebSite`; все 9 услуг содержат связанные
  `WebPage` + `Service`; blog index содержит `CollectionPage` + `ItemList`; статья содержит
  полный `BlogPosting`; все 14 внутренних страниц сохраняют `BreadcrumbList`.
- Устаревший `FAQPage` удалён из JSON-LD после прекращения Google FAQ rich results в мае 2026;
  видимые FAQ на страницах сохранены без изменений.
- Официальный Schema.org Validator показал 0 ошибок и 0 предупреждений на проверенных типах:
  главная, service page, blog index, article, contact и legal page.
- Перед релизом сохранена Hostinger-копия
  `domains/losoma.de/public_html.pre-instagram-schema-20260728-01`.
- `robots.txt` и `sitemap.xml` доступны.
- Контактные формы доставляют письмо и строку в Sheet.
- Cookie consent, отзыв согласия и GA4 Realtime проверены.
- Production deployment от 2026-07-23 сохранён в Git commit `90b4240` и последующих commits.

## Деплой

1. Проверить `git status` и не затронуть чужие изменения.
2. Запустить `npm run build`, `npm run audit:classes:strict`, `npm run audit:seo` и
   `node --check script.js`.
3. Загрузить содержимое `dist/` в Hostinger `domains/losoma.de/public_html`.
4. Сверить хеши критических файлов и выполнить production smoke/SEO проверки.
5. Очистить Hostinger cache только если он отдаёт прежние версии файлов.

SSH-параметры и секреты не записывать в публичные файлы или Git. Не удалять резервную копию
предыдущего WordPress и базы без отдельного явного решения.

## Открытые вопросы

- Подтвердить точного зарегистрированного Inhaber и Rechtsform: сочетание
  `Einzelunternehmen` и двух имён нельзя считать финально подтверждённым.
- Подтвердить, назначен ли формальный Datenschutzbeauftragter.
- Включить 2FA для Google Workspace и Hostinger.
- Сохранить в GA4 retention 14 месяцев и повторно проверить настройку.
- Проверить договорные условия обработки данных Hostinger и Google на точное legal entity.
- После передачи Google Business Profile добавить подтверждённую Maps/Profile URL в сайт и Schema.

## Search Console и SEO — состояние на 2026-07-28

### Доступ и аккаунты

- `losoma@web.de` намеренно удалён из владельцев property `losoma.de` и больше не имеет
  доступа.
- Актуальный аккаунт `maxim@losoma.de` открывает property `losoma.de` вместе с
  историческими данными Search Console.
- Управление браузером к текущему чату Codex не было подключено; данные собраны по
  скриншотам Search Console и прямым HTTP-проверкам production.

### Индексация

Отчёт Search Console, последнее обновление 2026-07-24:

- 6 URL проиндексировано.
- 13 URL не проиндексировано по трём причинам.

`Seite mit Weiterleitung` — 2 URL, оба корректны и не требуют исправления или запуска
валидации:

- `http://losoma.de/` → `https://losoma.de/`, последний обход 2026-07-21.
- `https://www.losoma.de/` → `https://losoma.de/`, последний обход 2026-07-12.

`Gefunden – zurzeit nicht indexiert` — 10 канонических URL. Для всех указано
`Zuletzt gecrawlt: Nicht zutreffend`, то есть Google их ещё не сканировал:

- `https://losoma.de/fassaden-hoehenarbeiten`
- `https://losoma.de/garten-landschaftspflege`
- `https://losoma.de/gewerbliche-reinigung`
- `https://losoma.de/grundreinigung`
- `https://losoma.de/hausmeisterservice`
- `https://losoma.de/impressum`
- `https://losoma.de/industriereinigung`
- `https://losoma.de/kontakt`
- `https://losoma.de/solaranlagenreinigung`
- `https://losoma.de/treppenhausreinigung`

`Gecrawlt – zurzeit nicht indexiert` — 1 URL:

- `https://losoma.de/blog`, последний обход 2026-07-25.
- Технических запретов нет: `200`, `index, follow`, self-canonical и sitemap корректны.
- Вероятная причина — слабая самостоятельная ценность каталога: общий H1 `Unser Blog`
  и только одна карточка статьи. Перед повторной отправкой желательно добавить вводный
  тематический текст и ещё несколько содержательных публикаций.

### Поисковая эффективность

В Search Console выбран период `3 Monate`, но фактические данные есть только за
2026-07-22–2026-07-25:

- 4 клика.
- 8 показов.
- CTR 50%.
- Средняя позиция 1,3.
- Запрос `losoma`: 3 клика, 3 показа, CTR 100%, средняя позиция 1,0.
- По коммерческим небрендовым запросам подтверждённых данных пока нет. Разница между
  общими показателями и видимой строкой запросов относится к скрытым Google
  низкочастотным запросам.

Страницы с видимостью:

- `/`: 4 клика, 7 показов, CTR 57,1%, средняя позиция 1,3.
- `/privacy/`: 0 кликов, 4 показа, средняя позиция 4,8; сейчас возвращает `404`.
- `/impressum/`: 0 кликов, 2 показа, средняя позиция 2,5; сейчас возвращает `200` и
  дублирует канонический `/impressum`.
- `/datenschutz`: 0 кликов, 1 показ, средняя позиция 3,0.

Публичная неперсонализированная проверка не нашла `losoma.de` среди показанных первых
результатов по основным коммерческим запросам. Это контрольное наблюдение, а не точное
место в Google. По брендовому запросу Search Console подтверждает позицию 1,0.

### Технические проверки

- Все 15 URL из `sitemap.xml` возвращают `200 OK`.
- Production `robots.txt` и `sitemap.xml` возвращают `200`.
- HTTP → HTTPS, `www` → без `www`, `/blog/` → `/blog` работают через 301.
- `/privacy` и `/privacy/` возвращают 404, хотя старый `/privacy/` ещё получает показы.
- `/index.html`, `/hausmeisterservice.html` и `/hausmeisterservice/` возвращают 200 вместо
  единого 301 на канонический URL. Аналогичные `.html` и trailing-slash варианты могут
  создавать дубли по всему сайту.
- `/impressum` и `/impressum/` оба возвращают 200.

### Что делать при продолжении

1. Перед изменениями проверить `git status` и актуальный production `.htaccess`.
2. Добавить 301: `/privacy` и `/privacy/` → `/datenschutz`.
3. Настроить безопасную канонизацию `.html`, `/index.html` и trailing-slash URL на
   адреса без расширения и без завершающего слэша. Не сломать `/`, внутренние API и
   `/blog`.
4. Запустить сборку и проверки из раздела «Деплой», проверить редиректы локально и на
   production после отдельного разрешения на деплой.
5. Повторно отправить sitemap в Search Console.
6. Через URL-Prüfung запросить индексацию приоритетных коммерческих страниц, начиная с
   `/hausmeisterservice`, `/treppenhausreinigung`, `/gewerbliche-reinigung`,
   `/grundreinigung` и `/industriereinigung`. Не запускать валидацию для двух нормальных
   главных редиректов.
7. Усилить `/blog` до повторного запроса индексации либо временно не считать каталог
   приоритетным.
8. Через 7–14 дней повторно снять индексирование, запросы, страницы, клики, показы, CTR
   и позиции.

Подробный снимок проверки: `SEO-AUDIT-2026-07-28.md`.

## Google Business Profile — состояние на 2026-07-28

- Это отдельная система прав и не связана с владением Search Console.
- Поддержка Google Business Profile ответила по `LOSOMA Gebäudeservice` 2026-07-23 в
  22:45: они понимают, что приглашение не найдено.
- Рекомендация поддержки: повторно отправить приглашение на точный Google-аккаунт.
- Если приглашение снова не появится, записать короткое видео экрана с актуальными
  датой и временем и ответить в той же почтовой цепочке поддержки, приложив запись.
- После успешной передачи добавить подтверждённую Google Maps/Profile URL в сайт и
  Schema, как указано в открытых вопросах.
- Пользователь хочет полностью отвязать `losoma@web.de` и рассматривал удаление
  существующего профиля с созданием нового под `maxim@losoma.de`. Этого не делать:
  Google разрешает только один Business Profile для одного бизнеса; новый профиль той
  же LOSOMA может быть признан дубликатом и не показываться в Search/Maps.
- Уточнение пользователя: в старом профиле пока нет отзывов, публикаций и другого
  ценного содержимого. Поэтому риск потери контента при удалении низкий. Решение теперь
  зависит от публичного статуса: если LOSOMA ещё не опубликована и не находится в
  Google Maps/Search, пустой профиль можно удалить и создать новый под
  `maxim@losoma.de`; если карточка уже видна или была верифицирована, нужно передать или
  повторно заявить права на существующую карточку, не создавая дубликат.
- Публичный статус подтверждён скриншотом Google Maps: карточка `LOSOMA Gebäudeservice`
  уже существует и показывается как `Hausmeisterservice`, содержит service area по
  Берлину, сайт `losoma.de`, телефон `+49 176 44434111` и счётчик 28 просмотров. На
  текущем аккаунте видна кнопка `Unternehmensprofil verwalten`, то есть аккаунт
  управляет карточкой. Несмотря на отсутствие отзывов/публикаций, это уже существующий
  публичный Business Profile; новый профиль создавать нельзя из-за риска дубликата.
- Удаление `profile content and managers` необратимо: могут быть удалены публикации,
  фотографии/видео и ответы владельцев, при этом карточка не гарантированно исчезнет из
  Maps. Это не является безопасным способом смены аккаунта.
- Предпочтительный путь, если текущий владелец ещё управляет карточкой:
  `Business Profile settings → People and access` → добавить `maxim@losoma.de` как
  Owner → дождаться 7 дней → передать ему Primary owner → удалить `losoma@web.de` из
  пользователей. Google ограничивает передачу primary ownership и удаление других
  владельцев для нового владельца в первые 7 дней.
- Если приглашение повторно не приходит, под `maxim@losoma.de` запросить владение
  существующим профилем, а не создавать новый. Для storefront/hybrid profile:
  `business.google.com/add` → найти LOSOMA → `Request access`. У текущего владельца есть
  3 дня на ответ; после отсутствия ответа Google иногда предлагает Claim/Verify.
- LOSOMA, вероятно, относится к Service Area Business, потому что клиенты не
  обслуживаются по бизнес-адресу. Для такого профиля официальный путь — обратиться в
  Google Business Profile Support и выбрать/указать `Transfer ownership of listing`.
  Продолжать существующую почтовую цепочку поддержки, приложив запрошенную запись экрана
  с актуальными датой и временем.

Подробные вопросы: `MAXIM_QUESTIONS.md`. Legal-контроль: `LEGALS_CHECKLIST.md`.
