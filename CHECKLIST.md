# LOSOMA — актуальный handoff и задачи

Последнее обновление: 2026-08-11.

Это единственная точка истины для текущего состояния и незавершённых задач. Завершённая история,
переписка по шагам и старые чек-листы здесь не хранятся. Техническое состояние production описано
в `SITE.md`; постоянные правила разработки — в `CLAUDE.md` и профильных файлах `docs/`.

## 0. Handoff на закрытие сессии 2026-08-11

- Production остаётся на release 2026-08-10; в этой завершающей сессии deploy не выполнялся.
- Google Business Profile подтверждён и принадлежит только `maxim@losoma.de`; сайт и телефон
  корректны, отдельного публичного email-поля в редакторе нет.
- Search Console подтверждает 15 индексированных canonical URL. Заявка на переобход
  `https://losoma.de/impressum` принята 2026-08-11; главная и `/kontakt` остались без принятой
  заявки из-за ошибки Google. Не повторять до 2026-08-13 и затем отправлять только если сниппет или
  сохранённая версия всё ещё устарели.
- Из `index.html` удалён неактивный закомментированный макет команды с повторяющимися именами и
  неподтверждёнными ролями; из `styles.css` удалены его неиспользуемые правила. Живая секция
  отзывов не менялась; production не обновлялся.
- Следующая содержательная работа начинается после получения клиентского пакета из раздела 6.
  Самый быстрый путь к росту — сначала усилить страницы, уже получающие non-brand impressions,
  параллельно исправляя GBP/citations/reviews; `/hausmeisterservice` остаётся стратегическим
  направлением, но одним текстом local-pack gap не закрыть.

## 1. Обязательные ограничения

- Не угадывать `Inhaber`, Rechtsform, роли людей, регистрационные реквизиты, часы, координаты,
  сертификаты, клиентов, цены или другие бизнес-факты.
- Счёт Hostinger подтверждает плательщика, но не доказывает юридического `Inhaber`.
- Не помещать в Git/chat passwords, codes, secrets, реальные заявки, закрытые договоры, платёжные
  данные, домашние контакты и recovery methods.
- Ownership, пользователей, billing, DPA/legal entity и доступы менять только по отдельной задаче.
- Реальную форму не отправлять без предупреждения и свежего разрешения: тест создаёт Gmail и Sheet
  records.
- Production менять только по прямому запросу, после build/audits, с новым rollback и live smoke.
- Не удалять server rollback/release archives, старый WordPress/file/database backup и закрытые
  доказательства без отдельного решения.
- Не создавать дубликаты Google Business Profile, GA4 или Search Console property.
- Commit и push выполнять только по прямому запросу.

## 2. Текущее production-состояние

- Production: `https://losoma.de` → Hostinger `domains/losoma.de/public_html`.
- Последний release: legal/contact/Schema sync 2026-08-10 для `index.html`, `kontakt.html`,
  `impressum.html`, `datenschutz.html` и `sitemap.xml`.
- Rollback: `domains/losoma.de/losoma-legal-contact-pre-20260810/`.
- Release copy: `domains/losoma.de/releases/losoma-legal-contact-20260810/`.
- В левом блоке `/kontakt` рядом с LinkedIn опубликован Instagram
  `https://www.instagram.com/losomagebaudeservice/` с существующими стилями секции.
- Публичный и form email: `info@losoma.de`; `maxim@losoma.de` — Workspace login/admin и reserve
  sender.
- Форма: browser → Hostinger PHP → reCAPTCHA v3 → Apps Script → Sheet `Anfragen` + Gmail.
- GA4 `G-QPX35L2ZGK` загружается только после consent `Statistik`; user/event retention — 14
  месяцев.
- Production E2E формы, mail delivery, analytics consent, redirects, sitemap и 15 canonical URLs
  уже проверены; не повторять без новой причины.
- Search Console на 2026-08-10 показывает 15 индексированных canonical URL; два исключённых URL —
  штатные редиректы `http://losoma.de/` и `https://www.losoma.de/`.
- JSON-LD повторно проверен на всех 15 страницах: 42 graph nodes, девять `Service`, общий provider
  `https://losoma.de/#organization`; центральный `legalName` синхронизирован как `Maxim Soga`.
- Все прежние rollback/release archives и старый WordPress/file/database backup сохранять до
  отдельного решения.

## 3. P0 — legal и privacy

### Подтверждённые legal-данные

- Anbieter/Verantwortlicher и подтверждённое имя в GA4 DPA: `Maxim Soga`.
- Публичная Geschäftsbezeichnung: `Losoma Gebäudeservice`.
- Geschäftsadresse: `Falkenseer Chaussee 247C, 13583 Berlin, Deutschland`; на сайте она обозначена
  как `kein Kundenbüro vor Ort`.
- Публичные контакты: `info@losoma.de`, `+49 176 44434111`.
- USt-IdNr.: `DE357950597`.
- `maxim@losoma.de` используется только как закрытый Workspace/DPA/admin-контакт и не публикуется
  на сайте.
- Неподтверждённая Rechtsform и второй человек в Anbieter/Verantwortlicher не указываются.

### Открытые legal/privacy-факты

- [ ] Сообщить применимые Registergericht/Registernummer, Handwerksrolle, Kammer, разрешения или
      подтвердить их отсутствие.
- [ ] Перечислить дополнительные места хранения/получателей заявок кроме Gmail и Google Sheets.
- [ ] Подтвердить business necessity обязательных телефона и полного имени в форме.
- [ ] Подтвердить срок хранения закрытой заявки без заказа; текущий публичный максимум — 12 месяцев
      после закрытия.
- [ ] Сообщить, где хранятся данные, договоры и счета после появления заказа.
- [ ] Получить финальные немецкие формулировки и заключение специалиста по Германии.

### Hostinger owner-side evidence

- [ ] После прямого входа владельца в `losoma@web.de` без `Impersonate mode` получить письменный
      account-specific ответ Hostinger: дата/версия принятого DPA, contractual account holder,
      полный список доступов/ролей, сроки access/error/mail logs и наличие POST body в логах.
- [ ] Ничего не менять в Terms, legal entity, billing, plan, users, domain или ownership.
- [ ] Сохранить закрытый PDF/скриншоты и ticket number; в Git внести только безопасное резюме.

Публичные Hostinger Terms/DPA проверены 2026-08-01; текущая публичная редакция DPA —
`Last revised: 2026-07-14`.

### Google DPA/AVV

- `Zusatz zur Verarbeitung von Cloud-Daten` (Cloud Data Processing Addendum) принят 2026-08-10
  аккаунтом `maxim@losoma.de` от имени `Losoma (losoma.de)`. Google показывает итоговый статус
  `Am Aug 10, 2026 von maxim@losoma.de akzeptiert`; текущая опубликованная редакция помечена
  `Current`, `Last modified September 20, 2022`.
- Профиль организации: `Losoma`; Primary Administrator: `maxim@losoma.de`; Alternative Email:
  `losoma@web.de`. Local representative и Datenschutzbeauftragter не указаны; GCP sharing
  отключён.
- Отдельная `Angabe zur Anwendbarkeit des EU-Datenschutzgesetzes` не принята: Google указывает,
  что этот шаг предназначен для подпадающего под европейское право использования с billing address
  вне EMEA. HIPAA BAA также не принята и для текущего сценария не требуется.
- GA4 Data Processing Terms для аккаунта `Losoma Gebäudeservice` (`402094681`) приняты
  2026-07-23. DPA details заполнены и повторно проверены 2026-08-10: `Firmenname` — `Maxim Soga`;
  единственный `Primärer Kontakt` — Maxim Soga `<maxim@losoma.de>`, Falkenseer Chaussee 247C,
  13583 Berlin, Deutschland.
- Аккаунт не связан с отдельной Marketing Platform organization; интерфейс помечает эту связь как
  опциональную (`bei Bedarf`), для текущего DPA-профиля она не требуется.
- [ ] Передать специалисту Hostinger DPA, Workspace CDPA и GA4 terms вместе с фактическим data flow.

### Privacy operations

- [ ] Решить срок retained copies в WEB.DE и дату отключения `Kopien im Postfach behalten`.
- [ ] Утвердить удаление заявки из Gmail, Sheet и дополнительных систем с учётом Trash, version
      history и backups.
- [ ] Зафиксировать срок Apps Script execution logs.
- [ ] Утвердить ротацию production backups и дату пересмотра старого WordPress backup.
- [ ] Выбрать закрытую папку для account/provider confirmations, PDF и заключений специалиста.

## 4. P1 — Google Business Profile

### Текущее состояние

- Existing profile: `LOSOMA Gebäudeservice`, сайт `losoma.de`, CID `3635333874850561864`.
- Primary Owner и единственный подтверждённый управляющий аккаунт: Maxim Soga
  `<maxim@losoma.de>`.
- Передача Primary Ownership и удаление прежнего доступа `losoma@web.de` подтверждены 2026-08-10;
  старый Google Account удалён, отдельный почтовый ящик WEB.DE сохранён для forwarding.
- Профиль остаётся существующим и подтверждённым; повторная верификация и новый профиль не нужны.
- 2026-08-11 профиль повторно проверен в Google Search: отдельного поля публичного email в
  редакторе Business Profile нет. Телефон `0176 44434111`, сайт `https://losoma.de/` и зона
  обслуживания Berlin указаны корректно; часы по-прежнему не заполнены. Неподтверждённые поля не
  менялись.

### Текущие действия

- Открытых задач по передаче ownership или удалению старого доступа нет.
- Не повторять закрытый invitation/support workflow и не создавать новый Business Profile без
  новой подтверждённой проблемы.
- Будущие изменения пользователей и ownership выполнять только из `maxim@losoma.de` по отдельной
  прямой задаче.

## 5. Текущие аккаунты и доступы

- Workspace: Business Starter, Flexible Plan, один active user/paid license — Maxim Soga
  `<maxim@losoma.de>`, Super Admin.
- `info@losoma.de` — бесплатный alias и default Send As, не отдельная лицензия.
- Gmail: нет delegates/external POP/forwarding; POP off.
- Sheet `Losoma Anfragen`: только Maxim owner, general access Restricted.
- Apps Script: только Maxim owner, Restricted; active Version 3 web app executes as Maxim;
  invocation endpoint public only for technical execution.
- GA4: только Maxim Administrator, retention 14 месяцев.
- Search Console: только Maxim verified owner, unused owner tokens 0.
- Hostinger delegated access: `Manage Services & Billing`; полный owner-side access list открыт.
- SSH: один проверенный deploy key.
- Workspace billing исправлен; не менять user/alias/plan и не открывать новый billing case без
  фактического начисления или расхождения в Admin.
- Google Ads не используется; Merchant Center не подключался и не используется. Это подтверждено
  владельцем 2026-08-10; отдельная проверка этих сервисов сейчас не требуется.

## 6. P1/P2 — SEO, Schema и контент

### Зафиксированный baseline

- Базовый ranking snapshot снят 2026-08-10 по данным Search Console до 2026-08-08. Для Германии
  за 22 июля — 8 августа: 31 impression, 4 clicks, CTR 12,9%, average position 51,3. Google раскрыл
  восемь запросов; часть низкочастотных запросов скрыта по privacy threshold. Брендовый `losoma`
  занимает average position 1,2; раскрытые non-brand запросы находятся на позициях 79–105.
- За последние доступные семь дней по Германии: 15 impressions, 1 click, CTR 6,7%, average
  position 62,4. Раскрытые non-brand запросы: `gewerbliche reinigung berlin` — 92,
  `gewerbliche reinigungsmaschinen berlin` — 79, длинный запрос про Reinigungslösungen — 93,
  `böden professionell reinigen berlin` — 98, `fassadenreinigung hochhaus berlin` — 100.
- В отдельном Search Console report по generative AI за 22 июля — 8 августа зафиксированы четыре
  impressions, из них две в Германии; видимы главная и `/kontakt`, но Google не раскрывает тексты
  AI-запросов и позиции. Контрольный live AI-ответ по выбору Hausmeisterservice + Gebäudereinigung
  для Wohn-/Gewerbeimmobilien в Berlin Losoma не упомянул.
- Неперсонализированная live-выдача Google для Berlin 2026-08-10: `hausmeisterservice berlin` —
  Losoma отсутствует в первых 100 organic results.
- Актуальный top-10/direct-provider срез по `hausmeisterservice berlin` добавлен в
  `docs/COMPETITOR_SERVICE_RESEARCH_2026-08-03.md`. Главные gaps Losoma: service-specific proof,
  точный состав/исключения, фактический процесс визита и отчётности, reviews, citations и GBP.
- Брендовая выдача 2026-08-10 показывает старые внешние citations: Gelbe Seiten с `Soga Maxim,
  Lozinschi Alexandr` и Berlin-Moabit, а также старое имя `Losoma Facility & Gebäudeservice` на
  Locanto. Сайт, GBP и публичный email уже исправлены; старые внешние записи нужно обновлять, а не
  возвращать их данные на сайт.
- 2026-08-11 в URL Inspection для канонического `https://losoma.de/impressum` Google явно
  подтвердил `Indexierung wurde beantragt`; URL добавлен в приоритетную очередь обхода. Главная и
  `/kontakt` получили общую ошибку и не считаются отправленными. Обновление сниппета не мгновенно.

### Проверка наполнения 2026-08-11

- Техническая SEO-база исправна: `npm run audit:seo` проходит, в sitemap 15 из 15 canonical URL;
  title, description, canonical, H1 и JSON-LD присутствуют.
- Девять service pages построены почти одним шаблоном: примерно 680–779 видимых слов, пять H2 и
  шесть FAQ на страницу. Объём достаточен, но повторяющаяся структура и общие формулировки слабо
  доказывают конкретный способ работы Losoma.
- Первый H2 на каждой service page является длинным абзацем, а не сканируемым заголовком. Ещё один
  длинный H2 описывает начало продажи, но не реальный процесс выполнения услуги.
- В тексте услуг нет контекстных ссылок между связанными страницами: 18 service links в каждом
  файле находятся только в mobile menu и footer.
- H1 не содержит Berlin на `/hausmeisterservice`, `/fassaden-hoehenarbeiten` и
  `/solaranlagenreinigung`, хотя metadata и коммерческий intent локальные.
- Не хватает уникальных блоков `что входит / опции / не входит`, периодичности, факторов цены,
  обычного рабочего визита, отчётности, кейса, собственных фотографий результата и проверяемых
  references. Именно эти gaps чаще всего отличают Losoma от top-10.
- На `/fassaden-hoehenarbeiten` упомянуты Baum-/Astarbeiten, а на нескольких страницах — конкретные
  методы и типы объектов. До усиления текста клиент должен подтвердить, что Losoma действительно
  выполняет это своими силами или через партнёра; неподтверждённое следует убрать.
- Запрос `gewerbliche reinigungsmaschinen berlin` имеет другой intent — поиск оборудования. Не
  оптимизировать под него service page, несмотря на impression.

### Приоритеты для максимально быстрого роста

| Приоритет | URL/канал | Почему сейчас | Что нужно сделать |
|---|---|---|---|
| P0 | GBP + citations + reviews | local pack лидеры превосходят Losoma прежде всего отзывами и локальным entity trust | подтвердить часы/categories/services/service area, добавить реальные фото, исправить Gelbe Seiten/Locanto, запустить честный review process |
| P1 | `/gewerbliche-reinigung` | уже есть релевантные impressions по `gewerbliche reinigung berlin` | раскрыть реальные типы объектов, зоны, график, контроль качества, exclusions, расчёт и один кейс |
| P1 | `/fassaden-hoehenarbeiten` | уже есть impression по `fassadenreinigung hochhaus berlin`; H1 не локализован | подтвердить доступ/высоту/безопасность/материалы и Baum-/Astarbeiten, затем усилить H1, состав, процесс и proof |
| P1 | `/grundreinigung` | запросы про профессиональную очистку полов уже видны около позиции 98 | описать покрытия, загрязнения, методы, подготовку, exclusions, результат и факторы цены |
| P2 | `/hausmeisterservice` | стратегический основной intent, но Losoma пока вне top-100 | совместить глубокую service page с GBP, reviews, citations, отчётностью и реальным кейсом |
| P3 | остальные пять услуг + blog | расширяют topical authority после основных страниц | обновлять только после получения собственной фактуры; не создавать массовые district pages |

### Пакет данных, который нужно получить от клиента

- [ ] Реальные opening hours, service area и подтверждённые primary/additional GBP categories.
- [ ] Для четырёх приоритетных услуг: 5–8 базовых работ, options, exclusions и работы через
      Fachbetrieb/партнёра.
- [ ] Типы объектов, минимальный/типичный объём, периодичность, доступ/ключи, порядок визита,
      контроль качества, отчётность и реакция на проблему.
- [ ] Факторы цены и данные, необходимые для расчёта; без выдуманного прайса.
- [ ] По одному реальному обезличенному кейсу: тип объекта, задача, процесс, результат и разрешение
      на публикацию.
- [ ] Реальные фотографии до/после, команды или процесса с правом публикации; stock images не
      использовать как доказательство выполненных работ.
- [ ] Подтверждённые references, страховка, сертификаты и квалификации — только если существуют и
      их можно публично назвать.
- [ ] Список реальных клиентов, которым допустимо отправить ссылку на отзыв; без покупки,
      вознаграждения и навязывания ключевых слов.

### Реализация на сайте и для AI-поиска после получения фактов

- [ ] На каждой приоритетной странице дать в первых 40–70 словах прямой ответ: кто, какую услугу,
      для каких объектов и где выполняет.
- [ ] Заменить paragraph-H2 короткими предметными H2 и раскрыть под ними состав, процесс, частоту,
      exclusions, факторы цены, доказательство и CTA.
- [ ] Переписать FAQ из общих определений в реальные вопросы клиента: доступ, сроки реакции,
      отчётность, замена сотрудника, допработы, безопасность и расчёт после осмотра.
- [ ] Добавить контекстные внутренние ссылки между коммерческими страницами и статьями с
      объяснением связи, а не оставлять перелинковку только в меню/footer.
- [ ] Синхронизировать видимый текст, metadata, `Service` JSON-LD, GBP и citations; не добавлять
      `FAQPage` Schema и не публиковать неподтверждённые часы, цены, рейтинги или обещания.
- [ ] Расширить `/blog/hausmeister-vs-externer-spezialist` и затем подготовить материалы про состав
      Hausmeisterservice, факторы стоимости и checklist для Hausverwaltung. Для AI-intents важнее
      ясные ответы и собственные доказательства, чем искусственное повторение ключей.

### Schema, social metadata и контроль

- [ ] Подтвердить coordinates, address, hours, реальные фотографии, price range и founding date.
- [ ] Добавлять только подтверждённые факты; затем проверить JSON-LD через Rich Results Test и
      Schema Markup Validator.
- `og:site_name` уже присутствует на всех 15 страницах; закрытую задачу не повторять.
- [ ] Добавить Twitter Card на 13 страниц, где её ещё нет, и размеры OG image на все 15 страниц;
      повторно проверить реальные alt-тексты при замене изображений.
- [ ] Проверить field Core Web Vitals после появления достаточных CrUX data.
- [ ] После 2026-08-13 при необходимости повторить indexing request только для изменённых
      canonical `/` и `/kontakt`; считать успехом только явное `Indexierung wurde beantragt`.
- [ ] Первые 6–8 недель после контентного release еженедельно сравнивать одинаковые Germany / 7-day
      Search Console срезы: non-brand impressions, disclosed queries, clicks, CTR, page position и
      generative-AI impressions. Не оценивать результат по одному ручному поиску.
- [ ] Опционально решить, нужен ли Bing Webmaster Tools.
- [ ] После стабильной работы SPF/DKIM проверить DMARC и только затем постепенно усиливать policy.

Полный top-10 срез и вопросы по девяти услугам сохранены в
`docs/COMPETITOR_SERVICE_RESEARCH_2026-08-03.md`; копировать факты конкурентов нельзя.

## 7. Фактическая privacy-карта формы

| Данные | Обязательность | Куда попадают | Открытый вопрос |
|---|---:|---|---|
| Name | обязательно | Sheet + Gmail | необходимость полного имени |
| Email | обязательно | Sheet + Gmail | нет |
| Telefon | обязательно | Sheet + Gmail | business necessity |
| Leistung | обязательно | Sheet + Gmail | нет |
| Nachricht | необязательно, до 2000 символов | Sheet + Gmail | нет |
| Datenschutz-Kenntnisnahme | обязательно | проверяется Hostinger | не consent, в Sheet не хранится |
| Quellseite | автоматически | Sheet + Gmail | необходимость |
| UTC timestamp | автоматически | Sheet | нет |
| User Agent | автоматически | Sheet | необходимость |
| IP | автоматически | Hostinger + reCAPTCHA | в Sheet не передаётся |
| reCAPTCHA token/score | временно | Google + Hostinger | в Sheet не хранится |

- Rate limit: 5 запросов за 10 минут; хранится SHA-256 fingerprint IP.
- Duplicate fingerprint: 2 минуты; полный payload в state не записывается.
- Private config/state находятся вне `public_html`; directory `700`, config `600`.
- Gmail/Sheet closed inquiry without order: публичный максимум 12 месяцев, ожидает подтверждения.
- GA4 user/event data: 14 месяцев.
- Hostinger logs, WEB.DE retained copy и Apps Script execution logs: сроки открыты.
- Maxim Soga сейчас отвечает за регулярную проверку и удаление Gmail/Sheet.

## 8. Release gate

### До deploy

- [ ] Проверить `git status`, точный scope и отсутствие secrets; не откатывать чужие изменения.
- [ ] Синхронизировать canonical, robots, sitemap, legal/contact/footer links и связанные form
      layers, если они затронуты.
- [ ] Выполнить:

```text
npm run build
npm run audit:classes:strict
npm run audit:seo
node --check script.js
git diff --check
```

- [ ] Проверить `dist/`, затронутые страницы и отсутствие console errors.

### Deploy и фиксация

- [ ] Создать dated rollback точных targets вне `public_html`.
- [ ] Загрузить только согласованный scope и сохранить release copy вне web root.
- [ ] Сверить local/server SHA-256; cache очищать только если live отдаёт старую версию.
- [ ] Проверить HTTPS status, markers, redirects/query strings и затронутые canonical endpoints.
- [ ] Реальную форму проверять только после отдельного предупреждения и разрешения.
- [ ] Записать актуальные release/rollback paths, hashes и smoke result в `SITE.md` и здесь только
      как текущее production-состояние.

## 9. Не повторять без нового основания

- Email migration на `info@losoma.de`, Gmail delivery, WEB.DE forwarding и default Send As уже
  проверены.
- Production form E2E уже подтвердил success UI, Gmail и Sheet.
- Workspace/Gmail/Sheet/Apps Script/GA4/Search Console/SSH access audits выполнены.
- Workspace billing исправлен на Business Starter Flexible с одной лицензией.
- Не создавать новые GA4/Search Console/GBP сущности вместо исправления существующих.
- Не пересжимать hero MP4 `1920×1080`, `5,731,171` байт без нового решения пользователя.
