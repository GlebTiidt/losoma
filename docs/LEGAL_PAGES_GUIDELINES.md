# Legal Pages Guidelines

Правила для `/impressum` и `/datenschutz`. Последнее обновление: 2026-07-22.

## 1. Source of truth

- Публичный текст: `impressum.html`, `datenschutz.html`.
- Технические/legal факты: `DATENSCHUTZ_DRAFT.md`.
- Открытые проверки: `LEGALS_CHECKLIST.md`.
- Production migration: `HOSTINGER_LAUNCH_CHECKLIST.md`.
- Общий статус: `HANDOFF.md` и `SITE.md`.

Нельзя копировать чужую privacy policy или добавлять сервис «на будущее» как уже активный.
Страница должна описывать фактический data flow конкретного deployment.

## 2. Обязательная синхронизация

Данные Verantwortlicher в Impressum и Datenschutz должны совпадать:

- имя/владелец и Rechtsform;
- business address;
- телефон;
- email.

Текущая рабочая формулировка `Einzelunternehmen` вместе с двумя именами
`Maxim Soga / Alexandr Lozinschi` остаётся legal blocker до сверки документов.

При изменении hosting, form backend, Google services, CAPTCHA, analytics, cookies,
retention, embedded content или recipient обновлять одновременно:

1. техническую реализацию;
2. `datenschutz.html`;
3. `DATENSCHUTZ_DRAFT.md`;
4. `LEGALS_CHECKLIST.md`;
5. `HANDOFF.md` / `SITE.md`;
6. Hostinger launch checklist, если изменение влияет на production.

## 3. Фактический processing на 2026-07-22

- Production `losoma.de` пока остаётся на Hostinger/WordPress.
- Новый сайт доступен на Vercel preproduction.
- Форма: Vercel `/api/contact` → Google Apps Script → Sheet `Anfragen` + Gmail
  `maxim@losoma.de`.
- Form test: `HTTP 200`, email и Sheet row подтверждены.
- GA4 работает только после consent (`G-QPX35L2ZGK`, Consent Mode v2).
- Consent choice сохраняется в Local Storage; homepage intro — в Session Storage.
- Lato self-hosted; внешних Google Fonts нет.
- reCAPTCHA v3, Turnstile и Google Maps не активны.

## 4. Checkbox формы

Checkbox остаётся обязательным для UX-подтверждения ознакомления, но не изображает
отдельное согласие на обработку заявки:

```text
Ich habe die Datenschutzerklärung zur Kenntnis genommen.
```

Юридические основания самой заявки: Art. 6 Abs. 1 lit. b DSGVO для договорных/
преддоговорных обращений и Art. 6 Abs. 1 lit. f DSGVO для общих business inquiries.

## 5. Компонент legal page

Использовать существующие классы:

```html
<section class="legal-page" aria-labelledby="legal-page-title">
  <div class="legal-page_inner">
    <h1 class="legal-page_title" id="legal-page-title">…</h1>
    <div class="legal-page_content">
      <section class="legal-block" aria-label="…">
        <h2 class="legal-block_title">N. …</h2>
        <div class="legal-block_group">…</div>
      </section>
    </div>
  </div>
</section>
```

- Не создавать второй legal design system.
- Десктоп: title слева, content справа; tablet/mobile — одна колонка.
- Списки используют существующие синие markers.
- Один H1; разделы H2 с последовательной нумерацией.
- `body.is-solid-header`; общий header/footer сайта.
- Lato только из `/assets/vendor/lato/lato.css`.
- Legal pages не подключают form vendors.

## 6. SEO и ссылки

- Canonical: `https://losoma.de/impressum` и `https://losoma.de/datenschutz`.
- Уникальные title/description/OG.
- Footer `Rechtliches`: обе страницы, текущая с `aria-current="page"`.
- Datenschutz link формы открывается как обычная ссылка; checkbox остаётся отдельным control.
- Stand-дата обновляется при содержательном изменении.

## 7. Hosting transition rule

До Hostinger launch политика может описывать Hostinger production и отдельную Vercel
preproduction/form environment. Непосредственно перед switch нужно сверить final architecture:

- если form endpoint перенесён на Hostinger и Vercel больше не получает production data —
  удалить Vercel из active production form text;
- если production форма продолжает обращаться к Vercel — Vercel остаётся в policy и DPA scope;
- после включения reCAPTCHA добавить provider, purposes, data categories, legal basis,
  international transfer и withdrawal/alternative information.

## 8. Запрещено

- Утверждать, что DPA/AVV принят, пока это не подтверждено в аккаунте.
- Обещать фиксированный retention, который фактически не выполняется.
- Называть Kenntnisnahme формы Einwilligung, если processing основан на Art. 6(1)(b)/(f).
- Указывать неактивные Maps, reCAPTCHA, Turnstile, CRM или marketing tools.
- Публиковать secret, Sheet access credentials или webhook URL как legal content.
- Менять Impressum и Datenschutz независимо друг от друга.
