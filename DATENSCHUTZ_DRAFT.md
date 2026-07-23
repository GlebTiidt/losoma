# Datenschutz — фактическая карта обработки

Последнее обновление: 2026-07-23. Публичный текст: `datenschutz.html`.

## Активные сервисы

- Hostinger: hosting, server logs, PHP contact endpoint.
- Google reCAPTCHA v3: защита формы от автоматизированного злоупотребления.
- Google Apps Script: доставка валидированной заявки.
- Google Sheets: таблица `Anfragen`.
- Google Workspace Gmail: уведомление на `maxim@losoma.de`.
- Google Analytics 4: `G-QPX35L2ZGK`, только после согласия `Statistik`.

## Поток заявки

`Browser → Hostinger /api/contact → reCAPTCHA verification → Google Apps Script → Sheets + Gmail`.

Приложение не записывает IP в Sheet. IP временно используется для server-side rate limiting и
защиты от злоупотреблений. Срок для закрытых обращений без договора — максимум 12 месяцев, если
нет отдельной обязанности или обоснованной необходимости хранения. За проверку удаления отвечает
Maxim Soga.

## Открытые юридические задачи

- Сверить Inhaber, Rechtsform и legal entity по регистрационным документам.
- Установить, назначен ли Datenschutzbeauftragter.
- Проверить применимость и статус условий обработки данных Hostinger и Google.
- Сохранить GA4 retention 14 месяцев.
- Получить финальную проверку немецкого юриста/Datenschutz-специалиста.

Публичный текст должен описывать только реально активные сервисы. При добавлении CRM, рекламы,
новой аналитики, чата, Maps embed или другого получателя данных сначала обновить карту обработки,
consent и Datenschutzerklärung.
