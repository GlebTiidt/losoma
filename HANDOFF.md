# Losoma — актуальный handoff

Последнее обновление: 2026-07-28.

## Production

- Сайт: `https://losoma.de`.
- Хостинг: Hostinger, каталог `domains/losoma.de/public_html`.
- Публичная сборка создаётся командой `npm run build` в `dist/`.
- Формы: `POST /api/contact` → Hostinger PHP → Google Apps Script → Google Sheet `Anfragen`
  и Gmail `maxim@losoma.de`.
- Защита форм: server validation, honeypot, rate limit, duplicate protection и Google
  reCAPTCHA v3 с серверной проверкой.
- Аналитика: GA4 `G-QPX35L2ZGK`, загружается только после согласия `Statistik`.
- Search Console доступна под `maxim@losoma.de`; `sitemap.xml` содержит 15 канонических URL.

## Проверено на production

- Все 15 индексируемых URL отвечают `200` и имеют `index, follow`, canonical и JSON-LD.
- Релиз 2026-07-28 добавил подтверждённый Instagram
  `https://www.instagram.com/losomagebaudeservice/` во все 15 футеров, контактный social-блок
  и homepage `sameAs`.
- JSON-LD обновлён по актуальным правилам: главная содержит полный
  `Organization` + `HomeAndConstructionBusiness` + `WebSite`; все 9 услуг содержат связанные
  `WebPage` + `Service`; blog index содержит `CollectionPage` + `ItemList`; статья содержит
  полный `BlogPosting`; все 14 внутренних страниц сохраняют `BreadcrumbList`.
- Устаревший `FAQPage` удалён из JSON-LD после прекращения Google FAQ rich results в мае 2026;
  видимые FAQ на страницах сохранены без изменений.
- Официальный Schema.org Validator показал 0 ошибок и 0 предупреждений на проверенных типах:
  главная, service page, blog index, article, contact и legal page.
- Перед релизом сохранена Hostinger-копия
  `domains/losoma.de/public_html.pre-instagram-schema-20260728-01`.
- `robots.txt` и `sitemap.xml` доступны.
- Контактные формы доставляют письмо и строку в Sheet.
- Cookie consent, отзыв согласия и GA4 Realtime проверены.
- Production deployment от 2026-07-23 сохранён в Git commit `90b4240` и последующих commits.

## Деплой

1. Проверить `git status` и не затронуть чужие изменения.
2. Запустить `npm run build`, `npm run audit:classes:strict`, `npm run audit:seo` и
   `node --check script.js`.
3. Загрузить содержимое `dist/` в Hostinger `domains/losoma.de/public_html`.
4. Сверить хеши критических файлов и выполнить production smoke/SEO проверки.
5. Очистить Hostinger cache только если он отдаёт прежние версии файлов.

SSH-параметры и секреты не записывать в публичные файлы или Git. Не удалять резервную копию
предыдущего WordPress и базы без отдельного явного решения.

## Открытые вопросы

- Подтвердить точного зарегистрированного Inhaber и Rechtsform: сочетание
  `Einzelunternehmen` и двух имён нельзя считать финально подтверждённым.
- Подтвердить, назначен ли формальный Datenschutzbeauftragter.
- Включить 2FA для Google Workspace и Hostinger.
- Сохранить в GA4 retention 14 месяцев и повторно проверить настройку.
- Проверить договорные условия обработки данных Hostinger и Google на точное legal entity.
- После передачи Google Business Profile добавить подтверждённую Maps/Profile URL в сайт и Schema.

## Search Console и SEO — состояние на 2026-07-28

### Доступ и аккаунты

- `losoma@web.de` намеренно удалён из владельцев property `losoma.de` и больше не имеет
  доступа.
- Актуальный аккаунт `maxim@losoma.de` открывает property `losoma.de` вместе с
  историческими данными Search Console.
- Управление браузером к текущему чату Codex не было подключено; данные собраны по
  скриншотам Search Console и прямым HTTP-проверкам production.

### Индексация

Отчёт Search Console, последнее обновление 2026-07-24:

- 6 URL проиндексировано.
- 13 URL не проиндексировано по трём причинам.

`Seite mit Weiterleitung` — 2 URL, оба корректны и не требуют исправления или запуска
валидации:

- `http://losoma.de/` → `https://losoma.de/`, последний обход 2026-07-21.
- `https://www.losoma.de/` → `https://losoma.de/`, последний обход 2026-07-12.

`Gefunden – zurzeit nicht indexiert` — 10 канонических URL. Для всех указано
`Zuletzt gecrawlt: Nicht zutreffend`, то есть Google их ещё не сканировал:

- `https://losoma.de/fassaden-hoehenarbeiten`
- `https://losoma.de/garten-landschaftspflege`
- `https://losoma.de/gewerbliche-reinigung`
- `https://losoma.de/grundreinigung`
- `https://losoma.de/hausmeisterservice`
- `https://losoma.de/impressum`
- `https://losoma.de/industriereinigung`
- `https://losoma.de/kontakt`
- `https://losoma.de/solaranlagenreinigung`
- `https://losoma.de/treppenhausreinigung`

`Gecrawlt – zurzeit nicht indexiert` — 1 URL:

- `https://losoma.de/blog`, последний обход 2026-07-25.
- Технических запретов нет: `200`, `index, follow`, self-canonical и sitemap корректны.
- Вероятная причина — слабая самостоятельная ценность каталога: общий H1 `Unser Blog`
  и только одна карточка статьи. Перед повторной отправкой желательно добавить вводный
  тематический текст и ещё несколько содержательных публикаций.

### Поисковая эффективность

В Search Console выбран период `3 Monate`, но фактические данные есть только за
2026-07-22–2026-07-25:

- 4 клика.
- 8 показов.
- CTR 50%.
- Средняя позиция 1,3.
- Запрос `losoma`: 3 клика, 3 показа, CTR 100%, средняя позиция 1,0.
- По коммерческим небрендовым запросам подтверждённых данных пока нет. Разница между
  общими показателями и видимой строкой запросов относится к скрытым Google
  низкочастотным запросам.

Страницы с видимостью:

- `/`: 4 клика, 7 показов, CTR 57,1%, средняя позиция 1,3.
- `/privacy/`: 0 кликов, 4 показа, средняя позиция 4,8; сейчас возвращает `404`.
- `/impressum/`: 0 кликов, 2 показа, средняя позиция 2,5; сейчас возвращает `200` и
  дублирует канонический `/impressum`.
- `/datenschutz`: 0 кликов, 1 показ, средняя позиция 3,0.

Публичная неперсонализированная проверка не нашла `losoma.de` среди показанных первых
результатов по основным коммерческим запросам. Это контрольное наблюдение, а не точное
место в Google. По брендовому запросу Search Console подтверждает позицию 1,0.

### Технические проверки

- Все 15 URL из `sitemap.xml` возвращают `200 OK`.
- Production `robots.txt` и `sitemap.xml` возвращают `200`.
- HTTP → HTTPS, `www` → без `www`, `/blog/` → `/blog` работают через 301.
- `/privacy` и `/privacy/` возвращают 404, хотя старый `/privacy/` ещё получает показы.
- `/index.html`, `/hausmeisterservice.html` и `/hausmeisterservice/` возвращают 200 вместо
  единого 301 на канонический URL. Аналогичные `.html` и trailing-slash варианты могут
  создавать дубли по всему сайту.
- `/impressum` и `/impressum/` оба возвращают 200.

### Что делать при продолжении

1. Перед изменениями проверить `git status` и актуальный production `.htaccess`.
2. Добавить 301: `/privacy` и `/privacy/` → `/datenschutz`.
3. Настроить безопасную канонизацию `.html`, `/index.html` и trailing-slash URL на
   адреса без расширения и без завершающего слэша. Не сломать `/`, внутренние API и
   `/blog`.
4. Запустить сборку и проверки из раздела «Деплой», проверить редиректы локально и на
   production после отдельного разрешения на деплой.
5. Повторно отправить sitemap в Search Console.
6. Через URL-Prüfung запросить индексацию приоритетных коммерческих страниц, начиная с
   `/hausmeisterservice`, `/treppenhausreinigung`, `/gewerbliche-reinigung`,
   `/grundreinigung` и `/industriereinigung`. Не запускать валидацию для двух нормальных
   главных редиректов.
7. Усилить `/blog` до повторного запроса индексации либо временно не считать каталог
   приоритетным.
8. Через 7–14 дней повторно снять индексирование, запросы, страницы, клики, показы, CTR
   и позиции.

Подробный снимок проверки: `SEO-AUDIT-2026-07-28.md`.

## Google Business Profile — состояние на 2026-07-28

- Это отдельная система прав и не связана с владением Search Console.
- Поддержка Google Business Profile ответила по `LOSOMA Gebäudeservice` 2026-07-23 в
  22:45: они понимают, что приглашение не найдено.
- Рекомендация поддержки: повторно отправить приглашение на точный Google-аккаунт.
- Если приглашение снова не появится, записать короткое видео экрана с актуальными
  датой и временем и ответить в той же почтовой цепочке поддержки, приложив запись.
- После успешной передачи добавить подтверждённую Google Maps/Profile URL в сайт и
  Schema, как указано в открытых вопросах.
- Пользователь хочет полностью отвязать `losoma@web.de` и рассматривал удаление
  существующего профиля с созданием нового под `maxim@losoma.de`. Этого не делать:
  Google разрешает только один Business Profile для одного бизнеса; новый профиль той
  же LOSOMA может быть признан дубликатом и не показываться в Search/Maps.
- Уточнение пользователя: в старом профиле пока нет отзывов, публикаций и другого
  ценного содержимого. Поэтому риск потери контента при удалении низкий. Решение теперь
  зависит от публичного статуса: если LOSOMA ещё не опубликована и не находится в
  Google Maps/Search, пустой профиль можно удалить и создать новый под
  `maxim@losoma.de`; если карточка уже видна или была верифицирована, нужно передать или
  повторно заявить права на существующую карточку, не создавая дубликат.
- Публичный статус подтверждён скриншотом Google Maps: карточка `LOSOMA Gebäudeservice`
  уже существует и показывается как `Hausmeisterservice`, содержит service area по
  Берлину, сайт `losoma.de`, телефон `+49 176 44434111` и счётчик 28 просмотров. На
  текущем аккаунте видна кнопка `Unternehmensprofil verwalten`, то есть аккаунт
  управляет карточкой. Несмотря на отсутствие отзывов/публикаций, это уже существующий
  публичный Business Profile; новый профиль создавать нельзя из-за риска дубликата.
- Удаление `profile content and managers` необратимо: могут быть удалены публикации,
  фотографии/видео и ответы владельцев, при этом карточка не гарантированно исчезнет из
  Maps. Это не является безопасным способом смены аккаунта.
- Предпочтительный путь, если текущий владелец ещё управляет карточкой:
  `Business Profile settings → People and access` → добавить `maxim@losoma.de` как
  Owner → дождаться 7 дней → передать ему Primary owner → удалить `losoma@web.de` из
  пользователей. Google ограничивает передачу primary ownership и удаление других
  владельцев для нового владельца в первые 7 дней.
- Если приглашение повторно не приходит, под `maxim@losoma.de` запросить владение
  существующим профилем, а не создавать новый. Для storefront/hybrid profile:
  `business.google.com/add` → найти LOSOMA → `Request access`. У текущего владельца есть
  3 дня на ответ; после отсутствия ответа Google иногда предлагает Claim/Verify.
- LOSOMA, вероятно, относится к Service Area Business, потому что клиенты не
  обслуживаются по бизнес-адресу. Для такого профиля официальный путь — обратиться в
  Google Business Profile Support и выбрать/указать `Transfer ownership of listing`.
  Продолжать существующую почтовую цепочку поддержки, приложив запрошенную запись экрана
  с актуальными датой и временем.

Подробные вопросы: `MAXIM_QUESTIONS.md`. Legal-контроль: `LEGALS_CHECKLIST.md`.
