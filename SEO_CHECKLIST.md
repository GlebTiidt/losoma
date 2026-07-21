# SEO & Schema Checklist — Losoma

> Домен: **https://losoma.de**
> Составлено: 2026-06-23. Источники: Google Search Essentials, Google AI Optimization Guide, schema.org, Zapier SEO Guide.
> Статус сайта: on-page SEO уже сильное (title/description/alt/canonical/og — везде есть). Главные пробелы — **structured data, sitemap.xml** и подключение домена `losoma.de`. `robots.txt` уже создан.

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
  Финальный hosting target по launch-чеклисту — Hostinger; Vercel остаётся staging/backend.
- [ ] 🔴 👤 **Google-аккаунт для бизнеса** (лучше отдельный, не личный). Нужен для Search Console и Business Profile.
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
- [ ] 🟡 👤 **Соцсети** для `sameAs`: LinkedIn уже есть (`linkedin.com/in/maxim-soga-575478264`). Есть ли **Instagram / Facebook**?
- [x] 🟡 💻 **Логотип-растр** для Schema (≥112×112) — используем существующий `assets/static/icon-512.png`.

**Контактные данные (уже в Impressum, для справки):**
Losoma · Maxim Soga / Alexandr Lozinschi · Einzelunternehmen · Falkenseer Chaussee 247C, 13583 Berlin · +49 176 44434111 · losoma@web.de · USt-IdNr. DE357950597.

---

## 2. Домен и индексация

- [ ] 🔴 👤💻 Подключить/проверить `losoma.de` на финальном Hostinger production.
- [x] 🔴 💻 Обновить `canonical` и `og:url` на абсолютные URL вида `https://losoma.de/...` на всех 13 страницах.
- [ ] 🟡 💻 `og:image` сделать абсолютным URL вида `https://losoma.de/...` на всех страницах.
- [x] 🔴 💻 Создать **`robots.txt`** (пока без ссылки на sitemap, sitemap отложен).
- [ ] 🔴 💻 Создать **`sitemap.xml`** (автогенерация в `scripts/build-static.mjs` по всем страницам).
- [ ] ⚙️ 👤 Подтвердить сайт в **Google Search Console** (DNS или meta-тег) и отправить sitemap.
- [ ] ⚙️ 👤 Отправить запрос на индексацию главных страниц в Search Console.
- [ ] 🟡 👤 **Bing Webmaster Tools** (Bing питает ChatGPT/Copilot) — опционально.

---

## 3. Structured Data (Schema.org / JSON-LD)

> Формат — **JSON-LD** в `<head>` (Google рекомендует именно его). Разметка не меняет вид сайта.

- [ ] 🔴 💻 **`LocalBusiness`** (подтип `HomeAndConstructionBusiness`) на главной: name, address, telephone, email, geo, openingHours, areaServed=Berlin, sameAs (соцсети), logo, url. ← *требует данные из блока 1.*
- [ ] 🔴 💻 **`Organization`** + **`WebSite`** (объединяется с LocalBusiness; SearchAction НЕ нужен — поиска по сайту нет).
- [ ] 🔴 💻 **`Service`** на каждой из 9 страниц услуг: serviceType, provider=Losoma, areaServed=Berlin, описание.
- [ ] 🟡 💻 **`BreadcrumbList`** (Home → Услуга) — помогает навигации AI.
- [ ] ❌ **`FAQPage` — НЕ делаем.** Google отключил FAQ-сниппеты (с мая 2026 не показываются в выдаче). Размечать ради «звёздочек» смысла нет.
- [ ] ⚙️ 💻👤 Проверить всю разметку в **Rich Results Test** (https://search.google.com/test/rich-results) и Schema Markup Validator (https://validator.schema.org/).

---

## 4. On-page SEO (статус: почти всё ✅)

- [x] 💻 **Title** — уникальные, формула «Услуга + in Berlin + для кого | Losoma».
- [x] 💻 **Meta description** — уникальные, с локацией, без воды.
- [x] 💻 **alt** у изображений — описательные, с гео.
- [x] 💻 **title** у изображений — есть.
- [x] 💻 `canonical`, `meta robots`, `lang="de"`, семантический HTML, внутренняя перелинковка.
- [ ] 🟡 💻 Добавить `og:site_name` и Twitter-card теги (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`).
- [ ] 🟡 💻 `og:image` сделать абсолютным URL (сейчас относительный путь — в соцсетях превью не подтянется).
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
- [x] 💻 Безопасные заголовки (`X-Content-Type-Options`, `Referrer-Policy` и т.д. в `vercel.json`).
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

*Когда соберёшь данные из блока 1 — дай знать, и пройдём по пунктам 💻 в коде.*
