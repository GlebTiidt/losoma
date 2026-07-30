# SEO & Schema Checklist — Losoma

> Домен: **https://losoma.de**
> Составлено: 2026-06-23; operational status reconciled 2026-07-30. Источники: Google Search Essentials, Google AI Optimization Guide и schema.org.
> Статус сайта: on-page SEO, structured data, sitemap.xml, robots.txt и production domain настроены. Открыты подтверждение дополнительных бизнес-фактов и внешняя проверка после повторного обхода Google.

---

## 0. Легенда

- 🔴 Обязательно (без этого ключевой кусок SEO/Schema не собрать)
- 🟡 Желательно (усиливает результат)
- ⚙️ Настройка после запуска
- 👤 = делает владелец · 💻 = делает разработчик

---

## 1. Что нужно собрать ВЛАДЕЛЬЦУ (вход для Schema)

Без блока 🔴 нельзя собрать полную разметку `LocalBusiness`.

- [x] 🔴 👤 **Домен `losoma.de`** — подтверждён как production domain для canonical/OG.
  Единственный production hosting target по `HOSTINGER_LAUNCH_CHECKLIST.md` — Hostinger.
- [x] 🔴 👤 **Google-аккаунт для бизнеса:** `maxim@losoma.de`; Search Console и новая GA4 property настроены в нём. Перенос Business Profile ещё открыт.
- [x] 🔴 👤 **Google Business Profile** (Google Unternehmensprofil — карточка в Google Картах) создан
  и одобрен Google.
- [x] 🔴 👤 **Дубль Google Business Profile удалён.** Оставлен один рабочий профиль.
- [x] 🔴 👤 **Услуги в Google Business Profile добавлены:** Treppenhausreinigung,
  Gewerbliche Reinigung, Grundreinigung, Industriereinigung, Winterdienst,
  Garten- und Landschaftspflege, Fassadenreinigung, Höhenarbeiten, Solaranlagenreinigung,
  Photovoltaik-Reinigung, Büroreinigung, Wohnblockreinigung, Gemeinschaftsflächenreinigung,
  Wohnanlagenbetreuung, Objektbetreuung.
- [ ] 🔴 👤 **Координаты из Google Maps** — широта/долгота, минимум 5 знаков после запятой (напр. `52.53412, 13.18234`). Берутся из пункта на карте после регистрации профиля.
- [ ] 🔴 👤 **Подтвердить основной бизнес-адрес для Google/Schema/Legals.**
  Подтверждённая текущая версия на сайте: `Falkenseer Chaussee 247C, 13583 Berlin, Deutschland`.
  Это Geschäftsadresse; клиентского офиса по адресу нет.
  Это адрес Александра как бизнес-адрес; отдельного офиса у компании нет. В Google Business Profile
  адрес для клиентов скрыт, профиль ведём как service-area business с зоной `Berlin, Germany`.
  Юридически ещё проверить, можно ли использовать этот адрес в Impressum/Datenschutz и Schema.
- [ ] 🔴 👤 **Часы работы** (Öffnungszeiten), напр. `Mo–Fr 08:00–18:00`. Если работа «по договорённости» — так и скажи, часы в разметке опустим.
- [ ] 🔴 👤 **Реальные фотографии для Google Business Profile:** добавить логотип и реальные фото
  объектов/работ/команды. Отложено до появления реальных материалов.
- [ ] 🟡 👤 **Ценовой диапазон** (`priceRange`), напр. `€€`.
- [ ] 🟡 👤 **Год основания** компании (`foundingDate`).
- [x] 🟡 👤💻 **Соцсети** для `sameAs`: подтверждены LinkedIn
  (`linkedin.com/in/maxim-soga-575478264`) и Instagram
  (`instagram.com/losomagebaudeservice`); Facebook пока не подтверждён.
- [x] 🟡 💻 **Логотип-растр** для Schema (≥112×112) — используем существующий `assets/static/icon-512.png`.

**Контактные данные (уже в Impressum, для справки):**
Losoma · Maxim Soga / Alexandr Lozinschi · Einzelunternehmen · Falkenseer Chaussee 247C, 13583 Berlin · +49 176 44434111 · maxim@losoma.de · USt-IdNr. DE357950597.

---

## 2. Домен и индексация

- [x] 🔴 👤💻 `losoma.de` запущен и проверен на финальном Hostinger production 2026-07-23.
- [x] 🔴 💻 Обновить `canonical` и `og:url` на абсолютные URL вида `https://losoma.de/...` на всех 13 страницах.
- [x] 🟡 💻 `og:image` использует абсолютные production URL на всех страницах.
- [x] 🔴 💻 Создан и опубликован **`robots.txt`** с разрешением обхода и production sitemap.
- [x] 🔴 💻 Создан и опубликован **`sitemap.xml`** с 15 canonical URL.
- [x] ⚙️ 👤 Domain property подтверждён в **Google Search Console**; sitemap обработан без ошибок, найдено 15 страниц.
- [x] ⚙️ 👤 Запрос на повторную индексацию главной страницы отправлен 2026-07-23.
- [x] ⚙️ 👤 `sitemap.xml` повторно отправлен 2026-07-30; статус успешный, 15 URL.
- [x] ⚙️ 👤 Подтверждённые запросы на индексацию 2026-07-30:
  `/hausmeisterservice`, `/grundreinigung`.
- [x] ⚙️ 👤 Актуальной проверкой URL Inspection подтверждена индексация `/blog`,
  `/gewerbliche-reinigung`, `/industriereinigung`, `/fassaden-hoehenarbeiten`.
- [ ] ⚙️ 👤 Позже повторить ручную отправку `/garten-landschaftspflege`,
  `/solaranlagenreinigung`, `/treppenhausreinigung`, `/kontakt`, `/impressum`.
  Первые две страницы прошли Live URL Test; запросы первых трёх вернули общую ошибку Google.
  Не считать их отправленными и не спамить повторными запросами в одной сессии.
- [ ] 🟡 👤 **Bing Webmaster Tools** (Bing питает ChatGPT/Copilot) — опционально.

---

## 3. Structured Data (Schema.org / JSON-LD)

> Формат — **JSON-LD** в `<head>` (Google рекомендует именно его). Разметка не меняет вид сайта.

- [x] 🔴 💻 Главная содержит `Organization`, `HomeAndConstructionBusiness` и `WebSite` с подтверждёнными данными. Неподтверждённые `geo`, `openingHours`, `foundingDate` и `priceRange` пока не выдумываем.
- [x] 🔴 💻 **`Organization`** + **`WebSite`** объединены в общий граф; `SearchAction` не добавлен.
- [x] 🔴 💻 **`Service`** присутствует на каждой из 9 страниц услуг.
- [x] 🟡 💻 **`BreadcrumbList`** присутствует на всех 14 не-главных страницах.
- [x] 🟡 💻 Видимые FAQ сохранены как семантический HTML, а устаревший **`FAQPage`** удалён из JSON-LD: Google прекратил показ FAQ rich results 7 мая 2026 года и удалил документацию функции в июне 2026 года.
- [x] 🟡 💻 Главная business schema дополнена подтверждёнными `contactPoint`, `vatID`, `sameAs` и `hasOfferCatalog`; неподтверждённые часы, координаты, цены и дату основания не публикуем.
- [x] 🟡 💻 Все 9 `Service` связаны со своей `WebPage`, провайдером, зоной обслуживания и релевантным изображением; blog index содержит `ItemList`, статья — полный `BlogPosting`.
- [ ] ⚙️ 💻👤 Проверить всю разметку в **Rich Results Test** (https://search.google.com/test/rich-results) и Schema Markup Validator (https://validator.schema.org/).

---

## 4. On-page SEO (статус: почти всё ✅)

- [x] 💻 **Title** — уникальные, формула «Услуга + in Berlin + для кого | Losoma».
- [x] 💻 **Meta description** — уникальные, с локацией, без воды.
- [x] 💻 **alt** у изображений — описательные, с гео.
- [x] 💻 **title** у изображений — есть.
- [x] 💻 `canonical`, `meta robots`, `lang="de"`, семантический HTML, внутренняя перелинковка.
- [ ] 🟡 💻 Добавить `og:site_name` и Twitter-card теги (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`).
- [x] 🟡 💻 `og:image` использует абсолютный URL.
- [ ] 🟡 💻 Добавить `og:image:width`/`height` и `image alt` для OG.

---

## 5. Контент и AI-SEO (правила Google)

> Главное правило Google AI-гайда: **«AEO/GEO-хаки» НЕ работают.** Никаких `LLMS.txt`, спец-разметки «для AI», дробления текста или переписывания «под нейросети» — Google это игнорирует. Оптимизация под AI = обычное хорошее SEO.

- [x] 💻 Контент написан для людей, понятная структура (заголовки, абзацы).
- [ ] 🟡 👤 **E-E-A-T**: усилить доверие — реальные кейсы/опыт, фото объектов, отзывы клиентов.
- [ ] 🟡 👤 Собирать **отзывы** в Google Business Profile (влияет на локальную выдачу и AI).
- [ ] 🟡 👤 Регулярно обновлять контент (актуальные данные, новые услуги).
- [ ] 🟡 👤 Упоминания бренда на внешних сайтах (каталоги, локальные справочники Берлина) — естественные ссылки.

---

## 6. Технические основы (статус: ✅)

- [x] 💻 Mobile-first / адаптив (desktop + tablet + phone).
- [x] 💻 Скорость: оптимизированные изображения (AVIF/WebP), self-hosted шрифты, минимум зависимостей.
- [x] 💻 Безопасные заголовки (`X-Content-Type-Options`, `Referrer-Policy` и т.д. в `.htaccess`).
- [x] 💻 Фавикон + webmanifest + apple-touch-icon.
- [ ] ⚙️ 👤 После запуска — проверить **Core Web Vitals** в PageSpeed Insights / Search Console.

---

## 7. Порядок действий (рекомендуемый)

1. 👤 Подключить/проверить домен `losoma.de` на Hostinger production.
2. 👤 Завести Google Business Profile → получить координаты, часы, основной адрес.
3. 💻 robots.txt + sitemap.xml + перевод canonical/og на `losoma.de` + OG-фиксы.
4. 💻 JSON-LD: Organization/WebSite/Service/Breadcrumb (база), затем LocalBusiness (когда есть гео/часы).
5. 👤 Search Console: подтвердить домен, отправить sitemap, запросить индексацию.
6. ⚙️ Проверить разметку в Rich Results Test, метрики в Search Console.

---

## 8. Обязательный план после SEO-аудита 2026-07-30

> Все пункты этого раздела обязательны. Закрывать только после проверки результата на production.

### P0 — техническая консолидация и скорость

- [x] 🔴 💻 Настроить и проверить на production единый `301` (2026-07-30):
  `/index.html` → `/`, `/blog/` и `/blog/index.html` → `/blog`, все публичные
  `/*.html` → соответствующий URL без расширения, trailing-slash страниц → URL без слэша.
  `/`, API и каталоги ассетов не затронуты; query string сохраняется.
- [x] 🔴 💻 Старые legal URL направлены постоянными редиректами:
  `/privacy`, `/privacy/`, `/privacy.html` → `/datenschutz`;
  `/impressum/`, `/impressum.html` → `/impressum`.
- [ ] 🔴 💻 Оптимизировать мобильный hero: отказаться от `preload="auto"`, показывать
  лёгкий poster до загрузки видео, уменьшить размер/битрейт видео и повторно измерить LCP.
  Контрольный результат PageSpeed от 2026-07-30: mobile LCP `4,4 s`, payload около `9,4 MB`.
- [ ] 🔴 💻 Уточнить главный коммерческий запрос в Title/H1 главной страницы:
  приоритет — `Gebäudeservice Berlin` для Hausverwaltungen и владельцев объектов,
  без переспама и потери текущего позиционирования.

### P1 — самостоятельная ценность услуг

- [ ] 🔴 👤💻 В первую очередь усилить `/grundreinigung` и `/hausmeisterservice`:
  уникальный объём/границы работ, частота, оборудование, безопасность, факторы цены,
  реальный берлинский кейс с результатом и фотографиями, отдельный FAQ.
- [ ] 🔴 👤💻 Затем усилить `/treppenhausreinigung`, `/garten-landschaftspflege` и
  `/solaranlagenreinigung`; не делать формальный рерайт одинаковых шаблонных блоков.
- [ ] 🔴 👤 Предоставить реальные кейсы и отзывы именно по Gebäudeservice, Reinigung,
  Hausmeisterservice и Winterdienst. Не выдавать садовые отзывы за подтверждение других услуг.
- [ ] 🔴 💻 Добавить контекстные ссылки на услуги из главной, релевантных статей и кейсов;
  не ограничиваться одинаковым меню/футером.
- [ ] 🔴 👤💻 Публиковать полезные кейсы/материалы по вопросам Hausverwaltung,
  избегая тонких районных страниц и массового шаблонного SEO-контента.

### P1 — локальная известность и доверие

- [ ] 🔴 👤 Завершить перенос Google Business Profile на `maxim@losoma.de` и заполнить
  часы, точные категории, услуги, service area и реальные фотографии.
- [ ] 🔴 👤 Системно собирать настоящие отзывы клиентов в Google Business Profile,
  без покупки и стимулированных фиктивных отзывов.
- [ ] 🔴 👤 Получить качественные локальные упоминания/ссылки: партнёры, клиенты с их
  разрешения, отраслевые организации и корректные берлинские справочники; исключить ссылочный спам.

### Контроль индексации

- [ ] 🔴 👤 После содержательных изменений запросить индексацию только изменённых
  приоритетных URL; не повторять запросы ежедневно.
- [ ] 🔴 👤 Через 7–14 дней повторно проверить URL Inspection и отчёты Search Console:
  индексирование, запросы, страницы, клики, показы, CTR и среднюю позицию.
- [ ] 🔴 👤💻 Еженедельно контролировать небрендовые запросы отдельно от `losoma` и
  фиксировать изменения за сопоставимый 28-дневный период.

---

*Когда соберёшь данные из блока 1 — дай знать, и пройдём по пунктам 💻 в коде.*
