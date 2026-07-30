# Losoma — source of truth

Последнее обновление: 2026-07-30.

## Архитектура

- Plain HTML/CSS/JS, без frontend framework.
- Production размещён только на Hostinger: `https://losoma.de`.
- Backend формы — PHP в `api/contact.php`.
- Доставка заявки — Google Apps Script, Google Sheets и Gmail.
- Секреты хранятся вне `public_html` и Git.
- `dist/` — generated output; редактировать исходные файлы, затем запускать build.

## Email migration production release 2026-07-30

- Проверенный email release опубликован в `domains/losoma.de/public_html` из текущего working tree;
  отдельный commit/push ещё не создавался.
- Rollback-копия `domains/losoma.de/losoma-production-pre-info-20260730-2014.zip` сохранена вне
  public web root. Release ZIP находится в `domains/losoma.de/releases/` и имеет SHA-256
  `ec9a512878ef98857461f3d2f54deda4f8ef93fa4b4cc7bdbefe4d064a627d86`.
- Все 15 canonical HTML URL, robots, sitemap и `/api/health` вернули `200`; локальные и server-side
  SHA-256 критических HTML/CSS/JS/PHP файлов совпали. Redirects сохранили query string.
- Live Impressum, Datenschutz, Kontakt, footer/`mailto:` и Schema/contactPoint используют
  `info@losoma.de`; прежний public email отсутствует на всех 15 HTML страницах.
- Один явно разрешённый E2E test подтвердил success UI, письмо `an info` в Workspace и строку
  Google Sheet `Anfragen` с timestamp `2026-07-30T13:37:54Z`. Browser console errors отсутствуют.

## Предыдущий hero/performance production release 2026-07-30

- Проверенная сборка опубликована на Hostinger в `domains/losoma.de/public_html` 2026-07-30
  около `10:54 UTC` (`17:54 Asia/Ho_Chi_Minh`). Перед загрузкой hPanel создал ручную резервную
  копию с timestamp `2026-07-30 17:08`.
- Release ZIP `losoma-release-20260730-1708.zip` имел SHA-256
  `b30d5684a25e69819237bb7adf58cf188c3341d5e48e5f18c488515888dd3a0e`; после распаковки он
  удалён из `public_html` в корзину Hostinger.
- Все 15 канонических HTML URL возвращают `200` и побайтно совпадают с `dist/`. Отдельно совпали
  хеши `styles.css`, `script.js`, `robots.txt`, `sitemap.xml`, poster, responsive AVIF и hero MP4.
  Hero MP4 на production сохранил исходный web-хеш
  `2283c7429ef384598ac4445da183b6450688ce78f99d91193239c94fb894714b`.
- `/api/health` возвращает `200` и `{"ok":true,"service":"losoma-contact"}`. Реальную форму в
  smoke test не отправляли, чтобы не создавать заявку, письмо и строку Google Sheets.
- Проверены `301`: HTTP -> HTTPS, `www` -> apex, `/index.html`, публичные `.html`, trailing slash,
  `/blog/index.html`, `/privacy*`; query string сохраняется.

## Страницы и SEO

- Главная, контакт, Impressum, Datenschutz, blog index, одна статья и девять сервисных страниц.
- Production canonical: `https://losoma.de`.
- Clean URLs обслуживаются правилами Hostinger `.htaccess`. С 2026-07-30 прямые запросы
  `/index.html`, `/blog/index.html`, публичных `*.html` и trailing-slash вариантов страниц
  получают `301` на URL без расширения/слэша; `/`, API и ассеты исключены.
- На всех индексируемых страницах обязательны уникальные title/description, canonical,
  `index, follow`, Open Graph и валидный JSON-LD.
- На всех внутренних страницах обязателен `BreadcrumbList`.
- Видимые FAQ остаются семантическим HTML-контентом, но `FAQPage` JSON-LD не публикуется: Google прекратил поддержку FAQ rich results в мае 2026 года.
- Реальные social/Maps URLs активируются только после подтверждения. Сейчас подтверждены LinkedIn
  и Instagram (`https://www.instagram.com/losomagebaudeservice/`); Facebook остаётся
  HTML-заготовкой и не отображается пользователю.

### Search Console — актуальное состояние 2026-07-30

- Domain property `losoma.de` доступна под `maxim@losoma.de`.
- `sitemap.xml` с 15 каноническими URL повторно отправлен 2026-07-30; Search Console подтвердил
  успешную отправку. Предыдущая дата чтения sitemap в интерфейсе остаётся 2026-07-24.
- Подтверждённо проиндексированы: `/blog`, `/gewerbliche-reinigung`,
  `/industriereinigung`, `/fassaden-hoehenarbeiten`, `/impressum`.
- Подтверждённые ручные запросы на индексацию: `/hausmeisterservice`, `/grundreinigung`,
  `/garten-landschaftspflege`. Для Garten 2026-07-30 в 18:30 получено явное
  `Indexierung wurde beantragt`; не отправлять повторно.
- Свежие Live URL Test 2026-07-30 подтвердили доступность и разрешённую индексацию для Garten
  (18:30), Solar (18:32), Treppenhaus (18:33) и Kontakt (18:34); у всех распознан один валидный
  Breadcrumb.
- Запрос для `/solaranlagenreinigung` после успешного live test снова завершился общей ошибкой
  Google. После неё запросы для `/treppenhausreinigung` и `/kontakt` в этой сессии не отправлялись.
- Следующая безопасная попытка: позже запросить только три ожидающих URL — Solar, Treppenhaus и
  Kontakt. Не повторять Garten, Hausmeisterservice и Grundreinigung; Impressum уже индексирован.
- Отчёт `Seiten` обновляется с задержкой; для отдельной страницы использовать URL Inspection.
  Успешный live test подтверждает техническую доступность, но не гарантирует включение в индекс.

## Формы и privacy

- Endpoint: `/api/contact`.
- `info@losoma.de` создан как alias существующего Workspace user `maxim@losoma.de`; прямое письмо
  доставлено в Gmail 2026-07-30. WEB.DE forwarding переведён на `info@losoma.de`, копии в WEB.DE
  сохраняются, подтверждение получателя выполнено.
- Независимый тест после активации `LOSOMA Forwarding Activation Test 2026-07-30` подтверждён в
  обоих ящиках в 19:51: копия в WEB.DE Spam и доставленное через forwarding письмо в Gmail Inbox.
- Все исходные HTML, Schema/contactPoint, `mailto:`, form fallback, repository Apps Script template
  и примеры конфигурации используют `info@losoma.de`. Live Apps Script project head также сохранён
  с новым fallback; active deployment остаётся Version 3, но production payload передаёт recipient
  явно, поэтому отдельный Apps Script deploy для смены адреса не нужен. Private Hostinger recipient
  и production site синхронизированы с `info@losoma.de`.
- После изменений успешно выполнены `npm run build`, `npm run audit:classes:strict` и
  `npm run audit:seo`; SEO-аудит подтвердил 15 indexable pages и 15 sitemap URLs.
- Разрешённый production form test подтвердил success state, Gmail delivery на alias и новую строку
  Sheet `Anfragen` в `2026-07-30T13:37:54Z`.
- Success state заменяет форму до перезагрузки.
- Checkbox Datenschutzerklärung — подтверждение ознакомления, не отдельное согласие.
- reCAPTCHA v3 загружается при отправке; обязательный Google legal microtext остаётся видимым.
- GA4 `G-QPX35L2ZGK` загружается только после согласия категории `Statistik`.
- Default Consent Mode v2: analytics и advertising denied.
- Отзыв согласия блокирует дальнейшую аналитику и удаляет доступные `_ga` cookies.

## Визуальные правила

- Lato self-hosted.
- Breakpoints: desktop `>=1025`, tablet `<=1024`, phone `<=560`, burger `<=1150`.
- Phone gutter: 16px.
- Project classes используют block, один underscore для element и `is-*` для state.
- Сторонние классы (`splide__*`, `iti__*`, `cc__*`) являются исключениями.

## Performance и accessibility — production 2026-07-30

- Изменения опубликованы на production и проверены после релиза.
- First-visit loader показывает intro `900 ms` и исчезает независимо от готовности hero-видео;
  при `prefers-reduced-motion: reduce` задержка равна `0 ms`.
- Hero MP4 назначается только после `window.load` и idle-паузы. При reduced motion, Save-Data,
  `slow-2g` и `2g` остаётся статический poster.
- Сжатый hero MP4 `960x540` был отклонён пользователем из-за заметной потери качества. Восстановлен
  исходный H.264 `1920x1080`, `5,731,171` байт; его отложенная загрузка сохраняется. WebP poster
  остаётся оптимизированным: примерно `131 KiB` вместо `247 KiB`.
- По уточнению пользователя исходный 30-секундный мастер весил около `444 MB`; текущий web-файл
  `5.73 MB` уже является минимально приемлемым уровнем качества. Его больше не перекодировать и не
  уменьшать разрешение без нового явного решения пользователя.
- Hero использует направленный contrast scrim поверх видео: на desktop затемнение усиливается
  справа и снизу под H1, на tablet/phone — плавно к нижнему текстовому блоку. Слой не меняет
  видеофайл и кадрирование, но не даёт движущимся светлым кадрам мешать чтению H1 и описания.
- Chrome DevTools mobile trace (`Slow 4G`, CPU `4x`, `412x915@3`) подтвердил CLS `0`, LCP-элемент
  `H1#hero-title` и начало MP4-запроса после `load`. Cold/no-cache локальный LCP — `2,128 ms`,
  повторный прогретый — `1,533 ms`; это не production-сравнение, так как локальный сервер не
  использует production compression/cache/CDN.
- Локальный Lighthouse после правок: Accessibility `100`, Best Practices `100`, SEO `100`,
  Agentic Browsing `100`. Исправлены contrast muted/placeholder-текста и accessible-name mismatch.
- Для трёх карточек ниже hero подключены responsive AVIF/WebP варианты `480`, `768` и `1200 px`
  через `srcset`/`sizes`; оригиналы сохранены как верхняя граница и fallback.
- Chrome DevTools в чистых контекстах подтвердил фактический выбор: mobile `412x915@3` загружает
  три AVIF общим размером `286,561` байт вместо `1,702,306` (`-83.2%`), desktop `1440@1` —
  `65,878` байт (`-96.1%`). Insight `ImageDelivery` после правки исчез.
- Финальный локальный mobile trace: LCP `1,720 ms`, CLS `0`; Lighthouse Accessibility,
  Best Practices, SEO и Agentic Browsing — `100/100/100/100`. Это локальный результат, не
  post-deploy production-замер.
- Post-deploy cold mobile trace production (`Slow 4G`, CPU `4x`, `412x915@3`) показал LCP
  `2,978 ms`, CLS `0`, TTFB `511 ms`; LCP-элемент — текстовый `H1#hero-title`, render delay
  `2,467 ms`. Render-blocking и cache insights оценили прямую экономию FCP/LCP как `0 ms`.
- Production Lighthouse mobile: Accessibility `100`, Best Practices `100`, SEO `100`, Agentic
  Browsing `100`; 56 проверок пройдены, ошибок нет. Console error/warn/issue отсутствуют, все
  42 сетевых запроса завершились `200`, `204` или корректным range-response `206` для MP4.
- Визуальная проверка production на `412x915@3` и `1440x1000` подтвердила, что contrast scrim
  сохраняет H1 и описание читаемыми поверх движущегося видео; перекрытия hero-текста нет.

## Обязательная проверка

```text
npm run build
npm run audit:classes:strict
npm run audit:seo
node --check script.js
```

Production deployment выполнять только по явному запросу и по
`HOSTINGER_LAUNCH_CHECKLIST.md`.

Последнее изменение production `.htaccess` выполнено 2026-07-30. Rollback-копия:
`domains/losoma.de/public_html/.htaccess.pre-global-canonical-20260730-01`.

Мониторинг позиций и утверждённая карта ключевых запросов находятся в
`SEO_RANKING_CHECKLIST.md`. Актуальный снимок индексации и приоритетов —
`SEO-AUDIT-2026-07-30.md`.
