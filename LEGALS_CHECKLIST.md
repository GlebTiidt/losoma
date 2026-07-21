# Legals Checklist — что нужно для полноценной legals-страницы

Чеклист доведения `/datenschutz` (+ `/impressum`) до **боевого** состояния.
Правила и обоснования — в `docs/LEGAL_PAGES_GUIDELINES.md`. Исходник текста — `DATENSCHUTZ_DRAFT.md`.

> Сейчас `/datenschutz` опубликована в **полной 11-секционной версии для проверки юристом**,
> но она описывает сервисы, которые ещё НЕ запущены. Пока все пункты ниже не закрыты —
> это не «боевая» политика. ⚠️

---

## A. Юридические данные (подтвердить у владельца)

- [x] **Форма юрлица для Verantwortlicher/Impressum:** текущая рабочая версия —
      `Einzelunternehmen`; на сайте указаны **Maxim Soga / Alexandr Lozinschi**. Перед финальным
      запуском сверить формулировку владельца/Verantwortlicher с регистрационными документами.
- [x] **Юридический/бизнес-адрес:** владелец подтвердил текущий публичный адрес —
      `Falkenseer Chaussee 247C, 13583 Berlin, Deutschland`. Отдельного клиентского офиса нет;
      на сайте адрес помечен как Geschäftsadresse / kein Kundenbüro vor Ort.
- [ ] **Datenschutzbeauftragter (DPO):** подтвердить, что не назначается (для малого бизнеса —
      норма; сейчас в тексте так и написано).
- [x] **Финальный домен:** staging остаётся `losoma-pi.vercel.app`, production — `losoma.de`.
      Canonical и `og:url` на всех HTML-страницах переключены на `https://losoma.de`.

## B. Сервисы — запустить ИЛИ убрать из политики

Каждый пункт = решение «активируем (и тогда раздел остаётся)» или «не используем (раздел убрать)».

- [x] **Consent-баннер (CMP).** Реализован кастомный баннер в `script.js`/`styles.css` без внешнего CMP.
      UX: первый слой `Ihre Privatsphäre ist uns wichtig` + `Alle ablehnen` / `Alle akzeptieren` /
      `Einstellungen`; второй слой `Notwendige Cookies` (disabled ON, `Immer aktiv`) + `Statistik`
      (OFF по умолчанию) с `Alle akzeptieren` и primary `Auswahl speichern`. До первого выбора нет close icon.
      Перед production ещё нужна ручная browser QA и финальная legal-сверка текста.
- [x] **Google Analytics.** GA4 подключён в коде через direct `gtag.js` + Consent Mode v2:
      default denied, `analytics_storage` granted только после согласия на `Statistik`.
      При отзыве согласия код ставит denied и удаляет GA cookies (`_ga`, `_ga_*`).
      Если позже Google Ads → отдельно добавить/пересмотреть Consent Mode fields и Datenschutzerklärung.
- [ ] **Форма → бэкенд.** Vercel endpoint `POST /api/contact` добавлен:
      server-side validation, honeypot, rate limit, защита от дублей, защита от повторного клика.
      Google Sheet через Apps Script работает. Email-уведомление через Apps Script не дошло;
      следующий шаг — SMTP через WEB.DE после получения логина/app password.
- [ ] **Cloudflare Turnstile.** Пока не включать: без CF-инфраструктуры в проекте он не обязателен.
      Вернуться к нему, если появится спам или начнётся платный трафик; тогда добавить widget,
      server-side verification и обновить Datenschutzerklärung/DPA.
- [x] **Cookie-Einstellungen — только floating cookie icon.** Кнопка в футере намеренно удалена.
      После сохранённого выбора floating icon открывает второй слой настроек и имеет
      `aria-label="Cookie-Einstellungen öffnen"`. Отдельной cookie-страницы НЕ делать.

## C. Договоры обработки (AVV / DPA) — подписать/активировать

- [ ] **Hostinger** — активировать/проверить AVV/DPA в аккаунте (хостинг, server-logs,
      возможные subprocessors/передачи вне EU/EWR).
- [ ] **Vercel** — активировать DPA в аккаунте, пока `POST /api/contact` работает как
      staging/backend endpoint и обрабатывает заявки.
- [ ] **Google** — AVV на используемые сервисы (Sheets/Apps Script/Gmail + Analytics).
      Удобно одним Workspace-аккаунтом.
- [ ] **Cloudflare** — DPA на Turnstile (и на хостинг, если переедем на Pages).
- [ ] Сверить во всех разделах формулировку про передачу в США (DPF + SCC) с реальными
      провайдерами.

## D. Техническая увязка на сайте

- [x] **Чекбокс согласия в форме** ссылается на `/datenschutz`: кликабелен только сам чекбокс,
      слово `Datenschutzerklärung` подчёркнуто и ведёт на одноимённую страницу.
- [x] **Stand-дата** в разделе 11 — обновлена на `Juli 2026` после подключения GA4/cookie banner.
- [x] Раздел Hosting обновлён под финальный Hostinger production вместо Vercel.
      Если позже переедем на Cloudflare Pages — обновить раздел Hosting ещё раз
      (Hostinger → Cloudflare, EU-локализация), пересобрать/передеплоить.
- [ ] Проверить, что **нигде нет внешних запросов** (Google Fonts уже убраны; следить, чтобы
      новые виджеты/карты не добавляли скрытых обращений без согласия).

## E. Проверка и публикация

- [ ] **Сверка с генератором** (e-Recht24 / activeMind) ИЛИ **юристом** — финальная.
- [ ] После сверки: привести live-страницу в соответствие с реальным состоянием
      (убрать неактивные разделы ИЛИ убедиться, что все сервисы запущены).
- [ ] Проверить адаптив legal-страницы на 320/360/390/414px (как для всех страниц).
- [ ] Финальный деплой на Hostinger production (`https://losoma.de`) и проверка ссылок/иконок/шрифта.

---

## Опционально / на будущее

- [ ] Отдельная политика для **соискателей** (Bewerberdatenschutz), если появится найм через сайт.
- [ ] Если встроим **Google Maps** — добавить раздел + согласие (сейчас Maps НЕ встроена).
- [ ] Реальные ссылки соцсетей **Facebook/Instagram** (сейчас заглушки `#facebook`/`#instagram`).
- [ ] `FAQPage` / прочий JSON-LD — это для контентных страниц, для legals не требуется.
