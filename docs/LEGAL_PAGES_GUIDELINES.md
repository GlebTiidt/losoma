# Legal Pages Guidelines (Losoma)

Правила для юридических/технических страниц сайта: **Impressum** (`/impressum`),
**Datenschutzerklärung** (`/datenschutz`) и будущих (`/datenschutz` для соискателей,
и т.п.). Применять при любых правках этих страниц и при создании новых.

> **⚠️ Дисклеймер.** Мы не юристы. Эти страницы составляются под технические факты
> сайта и по структуре немецких генераторов (e-Recht24 / activeMind). Финал ОБЯЗАТЕЛЬНО
> сверять с генератором или юристом — ответственность за точность на владельце.
> Рабочие исходники текста живут в `DATENSCHUTZ_DRAFT.md`; список открытых задач — в
> `LEGALS_CHECKLIST.md`.

---

## 1. Методология (самое важное — не нарушать)

1. **Privacy policy описывает то, что делает ИМЕННО наш сайт** — какие данные он реально
   собирает и какие сторонние сервисы подключены. Источник правды — **технический аудит
   сайта**, а не чужой текст.
2. **Никогда не копировать Datenschutz у конкурентов.** У них другие инструменты (GA,
   Maps, свои формы) — чужой текст будет врать про наш сайт, а это прямое основание для
   **Abmahnung** (платное предупреждение, в Германии это индустрия). Конкуренты — максимум
   для тона/структуры.
3. **Описывать только то, что РЕАЛЬНО работает** (вариант «минимальный/Variante A»).
   Публиковать раздел про сервис раньше, чем он запущен → политика описывает
   несуществующую обработку. Недо-раскрытие хуже, но и over-disclosure некорректен.
   - **Исключение (текущее состояние, по решению владельца 2026-06-22):** на странице
     `/datenschutz` НАМЕРЕННО присутствуют ещё не запущенные сервисы (баннер согласия,
     Turnstile, Google Analytics, Google-Sheets-форма) — **для проверки юристом**. Пока
     это так, страница НЕ является «боевой» политикой: перед реальным использованием либо
     эти сервисы должны заработать, либо юрист уберёт лишнее под факт.
4. **Cookie-Einstellungen — это НЕ страница, а кнопка в футере**, переоткрывающая баннер
   согласия (отзыв согласия по §25 TDDDG). Отдельную куки-страницу не заводим. Появляется
   вместе с баннером и GA.

---

## 2. Компонент `.legal-page` (вёрстка — переиспользовать, не плодить новое)

Обе legal-страницы используют ОДИН компонент. CSS — в `styles.css` (искать
`.legal-page`, `.legal-block`, `.legal-label`). Структура разметки:

```html
<section class="legal-page" aria-labelledby="legal-page-title">
  <div class="legal-page__inner">                 <!-- 12-кол. грид -->
    <h1 class="legal-page__title" id="legal-page-title">Заголовок</h1>   <!-- слева 1/6 -->
    <div class="legal-page__content">              <!-- справа 6/-1, flex-column gap 2.5rem -->
      <section class="legal-block" aria-label="…"> <!-- одна секция = один legal-block -->
        <h2 class="legal-block__title">N. Überschrift</h2>
        <div class="legal-block__group">           <!-- текст 18px, gap 0.25rem -->
          <p>…</p>
          <ul><li>…</li></ul>                      <!-- маркеры = синий кружок (см. ниже) -->
        </div>
      </section>
      <!-- ещё legal-block … -->
    </div>
  </div>
</section>
```

Особенности компонента:
- **Десктоп:** H1 слева (`grid-column: 1 / 6`), контент справа (`6 / -1`). Планшет/телефон →
  одна колонка (`1 / -1`).
- **Разделители** между секциями — `border-bottom: 1px solid #c0c0c0` на `.legal-block`.
- **Двухколоночные блоки** (как в Impressum: Adresse|Kontakt, USt-ID|Steuernummer) —
  `.legal-block__row` (`404fr / 523fr`, схлопывается в одну колонку ≤560px) + `.legal-block__col`.
- **Приглушённые инлайн-лейблы** («Telefon:», «E-Mail:») — `<span class="legal-label">` (`#767a7b`).
- **Маркеры списков** = синий кружок, как у точки `.section-label__dot`. Реализовано на
  `.legal-block__group li::before` (8px круг, `background: var(--color-blue)`, `list-style: none`,
  `padding-left: 1.5rem`). Для новых legal-списков просто использовать `<ul><li>` — стиль применится.
- **Отступы страницы:** `.legal-page { padding: 11.5rem 0 6.25rem }` (≈100px под фикс-шапкой и
  над футером); планшет/телефон — меньше (см. медиазапросы в `styles.css`).

---

## 3. Оболочка страницы (shell) — копировать у Impressum/Datenschutz

- `<body class="page--solid-header">` — **нет тёмного hero**, поэтому шапка тёмная (ink-логотип
  + ink-навигация) и frosted с самого верха, статично (без перехода). Детали `page--solid-header`
  см. в `SITE.md` / `docs/RESPONSIVE_GUIDELINES.md` §7c.
- **Шапка + бургер + мобильное меню + футер** — идентичны другим страницам (тот же markup).
- **Вендоры:** только `lato.css` (self-hosted шрифт) + `lenis` + `script.js`. **Никаких
  form-вендоров** (splide / intl-tel-input / mailcheck) — на legal-страницах формы нет, их
  init'ы в `script.js`no-op при отсутствии элементов.
- **Шрифт — self-hosted Lato** (`/assets/vendor/lato/lato.css`). НЕ подключать Google Fonts
  `<link>` (убрано со всего сайта 2026-06-22, чтобы не было передачи IP в Google).

---

## 4. Контент и SEO каждой legal-страницы

- **Язык — немецкий.** Один `<h1>` на страницу. Заголовки секций — `<h2>` с нумерацией `N.`.
- **Meta (уникальные на страницу):** `<title>`, `<meta name="description">`,
  `<meta name="robots" content="index, follow">`, `<link rel="canonical">` (абсолютный,
  чистый, без якорей: `https://losoma-pi.vercel.app/<slug>`), OG (`type/url/title/description/locale=de_DE`).
- **Favicon/иконки/манифест** — те же 4 строки в `<head>`, что и на всех страницах
  (favicon 32/16, apple-touch-icon, manifest).
- **Footer «Rechtliches»:** `Impressum` (`/impressum`) + `Datenschutzerklärung` (`/datenschutz`).
  Текущая страница помечает себя `aria-current="page"`. Ссылка на Datenschutz — `/datenschutz`
  на ВСЕХ страницах сайта (не якорь).
- **Класс-нейминг — BEM** (как и весь проект): `legal-page`, `legal-page__inner`, `legal-block`,
  `legal-block__title`, `legal-block__group`, `legal-block__row`, `legal-block__col`, `legal-label`.
  См. `docs/SEO_AND_CLASS_GUIDELINES.md`.

---

## 5. Verantwortlicher / согласованность с Impressum

- Блок **Verantwortlicher** в Datenschutz должен совпадать с данными **Impressum**
  (имя/форма/адрес/телефон/e-mail). Если меняется Impressum — синхронно меняется Datenschutz.
- **Открытая нестыковка:** Impressum указывает «Rechtsform: Einzelunternehmen», но перечисляет
  ДВОИХ (Maxim Soga / Alexandr Lozinschi). Einzelunternehmen = один владелец; двое = обычно GbR.
  Решить и привести в порядок (см. `LEGALS_CHECKLIST.md`).
- В Impressum указаны **два адреса** без пояснения (Falkenseer Chaussee 247C / Mindener Strasse 5).
  В Datenschutz/футере используется `Falkenseer Chaussee 247C, 13583 Berlin`. Уточнить юридический.

---

## 6. Технические факты, на которых стоит текст Datenschutz

| Что | Факт | Раздел политики |
|---|---|---|
| Хостинг | **Vercel Inc.** (США), демо `losoma-pi.vercel.app`. Cloudflare — позже. | Hosting + Server-Logfiles, передача в США (DPF/SCC) |
| Шрифты | **Self-hosted Lato** (`assets/vendor/lato/`) — внешних запросов нет | (раздел Google Fonts НЕ нужен) |
| Форма | План: Cloudflare Function (Turnstile) → Apps Script → **Google Sheet + письмо** на `losoma@web.de`. Бэкенда пока нет. | Kontaktformular (Google как Auftragsverarbeiter) |
| Спам | План: **Cloudflare Turnstile** | Spam-Schutz / Turnstile |
| Аналитика | План: **Google Analytics** (только после согласия) | Webanalyse / Google Analytics + Cookies/Einwilligung |
| Cookies | Сейчас нет; с GA появятся → нужен **consent-баннер (CMP)** | Cookies und Einwilligungsverwaltung |
| Соцсети | Простые ссылки (LinkedIn реальный, FB/IG — заглушки), не виджеты | Links zu sozialen Netzwerken |
| Надзорный орган | **Berliner Beauftragte für Datenschutz und Informationsfreiheit**, Alt-Moabit 59–61, 10555 Berlin | Beschwerderecht |
| Передача в США | Vercel / Google / Cloudflare — все США → **EU-US Data Privacy Framework + SCC** | в каждом релевантном разделе |

---

## 7. Текущий состав `/datenschutz` (11 секций, по состоянию 2026-06-22)

1. Verantwortlicher
2. Hosting und Server-Logfiles
3. SSL- bzw. TLS-Verschlüsselung
4. Cookies und Einwilligungsverwaltung  ⚠️ *(баннера пока нет)*
5. Kontaktaufnahme und Kontaktformular  ⚠️ *(форма без бэкенда; текст уже с Google Sheets)*
6. Spam-Schutz (Cloudflare Turnstile)  ⚠️ *(не подключён)*
7. Webanalyse mit Google Analytics  ⚠️ *(не подключён)*
8. Links zu sozialen Netzwerken
9. Ihre Rechte als betroffene Person
10. Beschwerderecht bei der Aufsichtsbehörde
11. Aktualität und Änderung

⚠️ = описывает ещё не запущенный сервис (присутствует по запросу владельца для юриста).

---

## 8. Как добавлять / активировать раздел

1. Текст брать из `DATENSCHUTZ_DRAFT.md` (там полные немецкие формулировки + RU-комментарии).
2. Новая секция = новый `<section class="legal-block">` с `<h2 class="legal-block__title">N. …</h2>`
   и `.legal-block__group`. Перенумеровать последующие.
3. При **запуске** сервиса: убедиться, что сервис реально работает И подписан AVV/DPA,
   синхронно обновить раздел; при необходимости включить баннер до GA.
4. При **отключении/смене** (напр. переезд на Cloudflare) — обновить раздел Hosting
   (Vercel → Cloudflare), добавить EU-локализацию, проверить адреса обработчиков.
5. Дату «Stand: …» ставить актуальную при каждой публикации.

---

## 9. Запрещено

- Копировать чужие privacy policy.
- Публиковать раздел про сервис, которого нет (кроме явного «для юриста» режима — и тогда
  это не боевая политика).
- Подключать Google Fonts `<link>` (только self-host).
- Заводить отдельную страницу «Cookie-Einstellungen» (это кнопка-триггер баннера).
- Ставить форм-вендоры на legal-страницы.
- Менять Verantwortlicher вразрез с Impressum.
