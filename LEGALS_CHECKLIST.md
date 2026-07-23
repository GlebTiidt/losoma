# Legals Checklist

Чек-лист для `/impressum` и `/datenschutz`. Последнее обновление: 2026-07-23.

## A. Controller / Impressum

- [ ] Сверить по регистрационным документам точное имя Inhaber и Rechtsform.
      Текущая пара `Einzelunternehmen` + `Maxim Soga / Alexandr Lozinschi` требует
      обязательного подтверждения: Einzelunternehmen обычно имеет одного Inhaber.
- [x] Адрес на сайте: `Falkenseer Chaussee 247C, 13583 Berlin, Deutschland`.
- [x] Адрес обозначен как `Geschäftsadresse · kein Kundenbüro vor Ort`.
- [x] Телефон: `+49 176 44434111`.
- [x] Email: `maxim@losoma.de`.
- [x] USt-IdNr.: `DE357950597`.
- [x] Обычная Steuernummer удалена с публичной страницы как не требуемая § 5 DDG;
      USt-IdNr. `DE357950597` оставлена.
- [ ] Подтвердить, назначен ли Datenschutzbeauftragter; до подтверждения не заявлять
      публично, что обязанности точно нет.

## B. Реальные сервисы

- [x] Hostinger production и текущий `/api/contact` отражены в Datenschutz.
- [x] Предыдущая инфраструктура не описывается как активный production.
- [x] Contact flow описан: Hostinger PHP endpoint → Google Apps Script → Google Sheets + Gmail.
- [x] Recipient указан: `maxim@losoma.de`.
- [x] Технические form metadata и IP-based security processing раскрыты.
- [x] Обязательный checkbox изменён на Kenntnisnahme, а не фиктивное Einwilligung.
- [x] Custom cookie settings, Local Storage и Session Storage описаны.
- [x] GA4 `G-QPX35L2ZGK` + Consent Mode v2 описаны как consent-only.
- [x] Self-hosted Lato; раздел Google Fonts не нужен.
- [x] Социальные ссылки описаны как обычные links, не plugins.
- [x] Turnstile и Maps не описаны как активные.
- [x] reCAPTCHA v3 включена для Hostinger production и одновременно добавлен legal-раздел.

## C. DPA / AVV и international transfers

- [ ] Подтвердить/принять Hostinger DPA в аккаунте.
- [ ] Подтвердить Google Workspace data-processing terms для Apps Script/Sheets/Gmail.
- [ ] Подтвердить Google Analytics data-processing terms.
- [ ] Проверить актуальные subprocessors и transfer safeguards каждого provider.
- [ ] Зафиксировать дату проверки договоров и ответственного.

## D. Retention и доступы

- [x] Клиент утвердил срок хранения заявок без договора: 12 месяцев после
      закрытия обращения, если нет иной обязанности хранения.
- [x] Ответственный за регулярное удаление из Sheet и Gmail: Maxim Soga.
- [x] По ответу пользователя административный доступ к Sheet, Apps Script, Gmail, GA4,
      Search Console и Hostinger имеет Maxim Soga; при настройке проверить отсутствие лишних ролей.
- [ ] Включена 2FA для административных аккаунтов. На 2026-07-23 пользователь подтвердил, что 2FA
      пока не включена.
- [x] Клиент выбрал GA4 retention **14 месяцев**.
- [ ] Настройка 14 месяцев фактически сохранена в GA4 Admin и проверена повторным открытием.

## E. Production QA и финальная legal-проверка

- [x] Form test 2026-07-22: `HTTP 200`, email и Sheet row подтверждены.
- [x] После success форма заменяется зелёной плашкой до reload на всех страницах.
- [x] reCAPTCHA production QA и работа форм подтверждены 2026-07-23.
- [x] Cookie/GA4 production QA подтверждён: GA Realtime получил события после consent; revoke и
      визуальная синхронизация переключателя проверены.
- [ ] Проверить legal pages на desktop/tablet/mobile и с клавиатуры.
- [x] Hosting/Form sections обновлены под Hostinger backend и активную reCAPTCHA.
- [ ] Получить финальную проверку немецким юристом/Datenschutz-специалистом.
- [x] Production switch выполнен; rollback backup сохранён.

## F. Правила актуализации

- Legal page описывает только реально активный processing.
- reCAPTCHA section добавляется только вместе с фактическим включением.
- При смене email/Sheet/CRM/hosting/analytics обновлять страницу и документацию одновременно.
- Stand-дата меняется при каждом содержательном legal update.
