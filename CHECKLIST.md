# LOSOMA — открытые задачи и release gate

Последнее обновление: 2026-10-02.

Здесь находятся только текущие задачи и решения. Архитектура и состояние production — в
`SITE.md`, постоянные правила — в `CLAUDE.md` и профильных `docs/`. Датированные результаты
проверок сохранены в Git history и локальных `reports/`; закрытую историю сюда не переносить.

## Текущий приоритет: `/hausmeisterservice`

- URL Inspection от 30.09: `URL ist Google nicht bekannt`; основной обход, Google canonical и
  включение в индекс не подтверждены. Page indexing report от 21.09 показывает этот URL как
  discovered-not-indexed. Live Test от 29.09 успешен, но не подтверждает основной обход.
- Два обращения подтверждённого Googlebot 19.09 видны в Hostinger Access Logs, однако доступная
  таблица не показывает HTTP-статус. Публичный canonical и запрос с Googlebot User-Agent
  возвращали 200 на 30.09. Причина отсутствия индекса остаётся неизвестной.
- [ ] Получить raw Access Logs или скриншот Hostinger за 21–30.09 с временем, статусом и
      User-Agent/IP для точного URL; затем сверить свежую URL Inspection. Контроль — 05.10.
- [ ] Если к 05.10 индекс не появился, пересмотреть данные обхода и запросить подтверждённый
      кейс/фото для усиления страницы. URL ради индекса не менять.
- Запрос индексации был принят 21.09. Без новых оснований его не повторять. Не приписывать
  задержку Schema, sitemap или качеству текста без доказательств. Evidence:
  `reports/indexing-2026-09-21/`.

## Legal, privacy и хранение данных

- [ ] Получить зарегистрированное наименование, Rechtsform, Registergericht и Registernummer;
      отдельно проверить Handwerksrolle, Kammer и специальные разрешения. Не публиковать догадки.
- [ ] Уточнить название сервиса счетов/бухгалтерии, его поставщика, место обработки, AVV/DPA
      и место хранения договоров.
- [ ] Решить, нужна ли форме фамилия или достаточно поля `Name`. Изменение синхронизировать
      с PHP, Apps Script/Sheet и Datenschutzerklärung.
- [ ] После прямого входа владельца в Hostinger получить account-specific сведения о принятом
      DPA, contractual account holder, ролях, сроках логов и хранении POST body.
- [ ] Решить срок хранения копий в WEB.DE и дату отключения `Kopien im Postfach behalten`.
- [ ] Утвердить удаление закрытых заявок из Gmail, Sheet и связанных систем с учётом Trash,
      version history и backups; уточнить срок Apps Script execution logs.
- [ ] Определить срок хранения production backups и отдельно решить судьбу старой копии
      WordPress. До решения архивы не удалять.
- [ ] Выбрать закрытую папку вне Git для подтверждений поставщиков, PDF и правовых заключений;
      передать фактический data flow и DPA специалисту по праву Германии.

## Google Business Profile и внешние профили

Профиль `LOSOMA Gebäudeservice` подтверждён, Primary Owner — Maxim Soga. Владелец сам работает
в авторизованном профиле; ассистент помогает по присланным скриншотам. Без нового прямого
разрешения не открывать профиль, не загружать фото и не отправлять изменения за владельца.
Клиентского офиса нет; адрес скрыт, зона обслуживания — Berlin. Обычные часы приёма:
пн–пт 07:00–18:00, сб 09:00–15:00; аварийный выезд 24/7 не равен часам работы.

- [ ] Получить месяц/год открытия, новый официальный логотип, права на публикацию фото людей
      и объектов; проверить, какие загруженные фото и услуги Google опубликовал.
- [ ] Помочь владельцу загрузить логотип и организовать честный процесс сбора отзывов без
      вознаграждений.
- [ ] Исправить устаревшие адрес, email и название в Locanto и Gelbe Seiten. Не включать
      временное объявление Locanto в `Organization.sameAs`.
- [ ] Получить помесячные views и типы interactions в GBP Performance. Срез 18.09:
      149 views и 5 interactions за неполный период апрель–сентябрь; типы не подтверждены.
- Передачу прав и изменения пользователей проводить только по отдельной прямой задаче владельца.
  Подробный сценарий: `docs/GOOGLE_BUSINESS_PROFILE_CHECKLIST_RU.md`.

## SEO, аналитика и контент

- Основной cohort для измерения: canonical Hostinger URL, Germany, одинаковые 28-дневные окна
  до/после. Семидневные окна — только ранний мониторинг. Малая выборка и consent ограничивают
  выводы; Vercel не использовать как SEO-источник.
- [ ] Продолжить сопоставимый недельный срез для пяти услуг, обновлённых 22.08; после накопления
      данных сравнить 28-дневные окна по страницам и постоянным группам запросов.
- [ ] Сравнить сохранённый Google HTML для Gewerbliche, Grundreinigung и Industriereinigung
      с опубликованной версией; при подтверждённой устаревшей копии адресно запросить переобход.
- [ ] Связать существующие GA4 `Losoma Website` и Search Console `sc-domain:losoma.de`,
      не создавая новые ресурсы.
- [ ] Проверить `form_success`, `phone_click`, `email_click` и согласие Statistik в тестовой
      среде с заглушкой доставки. После первого настоящего `form_success` проверить его
      соответствие успешной доставке и назначить key event. Реальную форму без отдельного
      разрешения не отправлять.
- [ ] Оптимизировать мобильную загрузку Hausmeister: замер 05.09 — Performance 86, LCP 3,6 s,
      CLS 0, CrUX No Data. Начать с размера hero и responsive images, затем оценить CSS.
- [ ] Проверить field Core Web Vitals после появления достаточных CrUX data.
- [ ] Получить подтверждённые кейсы, собственные фото, references, страховку и квалификации
      для приоритетных услуг. Затем усилить Gewerbliche, Grundreinigung, Winterdienst,
      Gartenpflege, Fassaden-/Höhenarbeiten и Solaranlagenreinigung по реальной фактуре.
- [ ] Для оставшихся четырёх service pages применять предметную структуру после получения
      фактов. Hero/H1/metadata/OG пяти обновлённых услуг менять отдельным измеримым этапом;
      после свежего crawl рассмотреть один metadata-эксперимент для Büroreinigung.
- [ ] Расширить статью `/blog/hausmeister-vs-externer-spezialist` и подготовить материалы
      про состав Hausmeisterservice, факторы стоимости и checklist для Hausverwaltung.
- [ ] Добавить Twitter Card на 13 страниц и размеры OG image на все 15; при замене фото
      проверить alt-тексты.
- [ ] Проверить DMARC после стабильной работы SPF/DKIM; отдельно решить, нужен ли Bing
      Webmaster Tools.
- Не добавлять в Schema неподтверждённые координаты, часы, цены и дату основания. FAQPage
  использовать только при видимом совпадающем FAQ. Правила claims и RU→DE workflow:
  `docs/SEO_AND_CLASS_GUIDELINES.md`. Исследование конкурентов:
  `docs/COMPETITOR_SERVICE_RESEARCH_2026-08-03.md`.

## Фактическая privacy-карта формы

| Данные | Обязательность | Куда попадают | Открытый вопрос |
|---|---|---|---|
| Name, Email, Telefon, Leistung | обязательно | Sheet + Gmail | необходимость полного имени |
| Nachricht | необязательно, до 2000 символов | Sheet + Gmail | — |
| Datenschutz-Kenntnisnahme | обязательно | проверяется Hostinger | не consent; в Sheet не хранится |
| Quellseite | автоматически | Sheet + Gmail | необходимость |
| UTC timestamp | автоматически | Sheet | — |
| User Agent | автоматически | Sheet | необходимость |
| IP | автоматически | Hostinger + reCAPTCHA | в Sheet не передаётся |
| reCAPTCHA token/score | временно | Google + Hostinger | в Sheet не хранится |

Rate limit — 5 запросов за 10 минут; duplicate fingerprint — 2 минуты. Полный payload в
state не записывается. Закрытая заявка без заказа хранится в Gmail/Sheet не более шести
месяцев после завершения; GA4 user/event data — 14 месяцев. Сроки Hostinger logs, WEB.DE
copies и Apps Script logs остаются открытыми. Maxim Soga отвечает за проверку и удаление.

## Единый release gate

- [ ] Проверить `git status`, точный scope, отсутствие secrets и зависимые canonical,
      robots, sitemap, legal/contact/footer/form слои.
- [ ] Выполнить `npm run build`, `npm run audit:classes:strict`, `npm run audit:seo`,
      `node --check script.js` и `git diff --check`; проверить `dist/` и затронутые страницы.
- [ ] По прямому разрешению на production создать датированный откат точных файлов вне
      `public_html`, опубликовать только согласованный scope и сохранить release copy.
- [ ] Сверить local/server SHA-256, публичные HTTPS status, canonical и redirects; проверить
      затронутые страницы в браузере и отсутствие console errors.
- [ ] Записать release/rollback paths и результат проверки в `SITE.md`. Реальную форму не
      отправлять без отдельного предупреждения и разрешения.
