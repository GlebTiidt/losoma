# LOSOMA — актуальный handoff и задачи

Последнее обновление: 2026-08-06.

Это единственная точка истины для текущего состояния и незавершённых задач. Завершённая история,
переписка по шагам и старые чек-листы здесь не хранятся. Техническое состояние production описано
в `SITE.md`; постоянные правила разработки — в `CLAUDE.md` и профильных файлах `docs/`.

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
- Последний release: legal update 2026-08-01 для `datenschutz.html` и `sitemap.xml`.
- Rollback: `domains/losoma.de/losoma-legal-pre-20260801/`.
- Release copy: `domains/losoma.de/releases/losoma-legal-20260801/`.
- Публичный и form email: `info@losoma.de`; `maxim@losoma.de` — Workspace login/admin и reserve
  sender.
- Форма: browser → Hostinger PHP → reCAPTCHA v3 → Apps Script → Sheet `Anfragen` + Gmail.
- GA4 `G-QPX35L2ZGK` загружается только после consent `Statistik`; user/event retention — 14
  месяцев.
- Production E2E формы, mail delivery, analytics consent, redirects, sitemap и 15 canonical URLs
  уже проверены; не повторять без новой причины.
- Все прежние rollback/release archives и старый WordPress/file/database backup сохранять до
  отдельного решения.

## 3. P0 — legal и privacy

### Ответы Максима

Семь вопросов отправлены 2026-07-31 и остаются без ответа. Повторно не отправлять без новой причины.

- [ ] Подтвердить официального владельца бизнеса и роль второго человека.
- [ ] Подтвердить официальный business address и получение корреспонденции по адресу
      `Falkenseer Chaussee 247C, 13583 Berlin`.
- [ ] Сообщить применимые Registergericht/Registernummer, Handwerksrolle, Kammer, разрешения или
      подтвердить их отсутствие.
- [ ] Перечислить дополнительные места хранения/получателей заявок кроме Gmail и Google Sheets.
- [ ] Подтвердить необходимость обязательных телефона, email и полного имени.
- [ ] Подтвердить срок хранения закрытой заявки без заказа; текущий публичный максимум — 12 месяцев
      после закрытия.
- [ ] Сообщить, где хранятся данные, договоры и счета после появления заказа.

### Hostinger owner-side evidence

- [ ] После прямого входа владельца в `losoma@web.de` без `Impersonate mode` получить письменный
      account-specific ответ Hostinger: дата/версия принятого DPA, contractual account holder,
      полный список доступов/ролей, сроки access/error/mail logs и наличие POST body в логах.
- [ ] Ничего не менять в Terms, legal entity, billing, plan, users, domain или ownership.
- [ ] Сохранить закрытый PDF/скриншоты и ticket number; в Git внести только безопасное резюме.

Публичные Hostinger Terms/DPA проверены 2026-08-01; текущая публичная редакция DPA —
`Last revised: 2026-07-14`.

### Google DPA/AVV

- [ ] В Workspace Admin read-only записать статус, дату, организацию и контакты принятого
      Data Processing Terms/CDPA.
- [ ] Не принимать и не переоформлять CDPA до подтверждения правильного `Inhaber`/legal entity.
- [ ] После ответа Максима сверить legal entity/contact details в GA4 data-processing terms; факт
      принятия GA4 terms 2026-07-10 подтверждён.
- [ ] Передать специалисту Hostinger DPA, Workspace CDPA и GA4 terms вместе с фактическим data flow.

### Следующее изменение legal-страниц

- [ ] В `/impressum` заменить спорный блок `Maxim Soga / Alexandr Lozinschi` и
      `Rechtsform: Einzelunternehmen` только подтверждёнными данными.
- [ ] Подтвердить business address, формулировку `kein Kundenbüro vor Ort` и применимые
      регистрационные сведения.
- [ ] Сохранить `info@losoma.de`, телефон `+49 176 44434111` и USt-IdNr. `DE357950597`, если не
      появится подтверждённого изменения.
- [ ] В `/datenschutz` синхронизировать Verantwortlicher, processors, поля, сроки и системы с
      подтверждённой фактической схемой.
- [ ] При изменении полей синхронно обновить все HTML-формы, PHP validation, Apps Script/Sheet
      mapping и Datenschutzerklärung.
- [ ] Получить финальные немецкие формулировки и заключение специалиста по Германии.
- [ ] После утверждения обновить `Stand` и sitemap `lastmod`, выполнить отдельный legal release и
      проверить обе страницы на desktop/mobile и keyboard navigation.

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
- Primary Owner: `losoma@web.de`.
- `maxim@losoma.de` — активный внутренний Google Workspace account компании.
- Support case: `2-2514000041594`; не создавать новый case.
- Community thread: `https://support.google.com/business/thread/457103263?hl=de`.
- 2026-08-05 старое pending invitation было отозвано один раз и создано заново с ролью `Inhaber`;
  при вводе явно выбрана нижняя подсказка связанного Google-аккаунта.
- Письмо не пришло в Inbox/Spam/All Mail, приглашение не видно в Business Profile Manager, а у
  Primary Owner оно остаётся `AUSSTEHEND`.
- Результат контролируемого теста передан Jens и в существующий support case.
- Agency route не используется: нет Agentur-Organisation, Nutzergruppe или Standortgruppe. Jens
  это подтверждено 2026-08-06 без публикации адресов аккаунтов.

### Текущие действия

- [ ] Проверять Community, существующую support chain, Gmail/Business Profile Максима и статус у
      Primary Owner только после нового уведомления или в согласованную контрольную точку.
- [ ] Дождаться содержательного ответа Jens/support о technical/manual reset либо официальном
      прямом способе принятия.
- [ ] До технического изменения не отзывать и не отправлять приглашение повторно, не менять
      account structure, не удалять существующий профиль и не создавать дубликат.
- [ ] Не отправлять support третью копию того же видео; отвечать только на новое содержательное
      действие или запрос технического специалиста.
- [ ] После исправления принять приглашение под `maxim@losoma.de` и подтвердить управление именно
      существующей карточкой.
- [ ] Выдержать 7 полных дней после принятия, затем назначить `maxim@losoma.de` Primary Owner.
- [ ] Оставить `losoma@web.de` резервным Owner на 2–4 недели и отдельно решить дальнейшую роль.

Удаление текущего профиля не является обходным путём: оно не гарантирует исчезновение карточки из
Search/Maps, потребует повторной верификации и создаёт риск duplicate.

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
- [ ] Проверить, существуют ли Google Ads, Merchant Center или другие бизнес-сервисы, которым нужен
      доступ `maxim@losoma.de`.

## 6. P1/P2 — SEO, Schema и контент

### Операционные проверки

- [ ] После стабильной работы SPF/DKIM проверить DMARC и только затем постепенно усиливать policy.
- [ ] Позже повторить indexing request только для canonical `/treppenhausreinigung`; считать
      успехом только явное `Indexierung wurde beantragt`.
- [ ] `/hausmeisterservice` мониторить без повторной отправки до новой содержательной причины.
- [ ] Через сопоставимый период проверить Search Console: coverage, queries, clicks, impressions,
      CTR и average position отдельно от брендового `losoma`.
- [ ] Опционально решить, нужен ли Bing Webmaster Tools.

### Факты для LocalBusiness/Service Schema

- [ ] Подтвердить coordinates, address, hours, реальные фотографии, price range и founding date.
- [ ] Добавлять только подтверждённые факты; затем проверить JSON-LD через Rich Results Test и
      Schema Markup Validator.
- [ ] Добавить `og:site_name`, Twitter Card, размеры OG image и корректные alt.
- [ ] Проверить field Core Web Vitals после появления достаточных CrUX data.

### Отложенный контент

Не начинать без отдельного возвращения пользователя к контентному этапу. Исследование конкурентов и
вопросы по девяти услугам сохранены в `docs/COMPETITOR_SERVICE_RESEARCH_2026-08-03.md`.

- [ ] Сначала собрать подтверждённые факты/фотографии/кейсы/FAQ для `/grundreinigung` и
      `/hausmeisterservice`, затем для остальных приоритетных услуг.
- [ ] Подготовить немецкие Title, H1, Meta Description, вводный ответ, состав/исключения, процесс,
      частоту, факторы цены, кейс, FAQ и внутренние ссылки.
- [ ] Не переносить чужие услуги, методы, сертификаты, цифры или обещания; всё неподтверждённое
      маркировать `[нужно подтверждение]`.

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
