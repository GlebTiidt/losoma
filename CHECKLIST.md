# LOSOMA — актуальные задачи и handoff

Последнее обновление: 2026-08-24.

Это единственная точка истины для незавершённых задач и release gate. Текущее техническое и
production-состояние описано в `SITE.md`; постоянные правила — в `CLAUDE.md` и профильных файлах
`docs/`; исторические SEO-метрики и исходные данные — в `reports/`. Закрытую историю здесь не
дублировать.

## 0. Текущий фокус

- Canonical production на Hostinger и Vercel review синхронизированы с release 2026-08-22.
  Актуальные release/rollback paths, hashes и smoke-результат находятся в `SITE.md`.
- Body content, FAQ, contextual links и Service Schema для `/hausmeisterservice`,
  `/grundreinigung`, `/treppenhausreinigung`, `/gewerbliche-reinigung` и
  `/industriereinigung` опубликованы. Рабочие RU→DE-файлы сохранены локально в
  `docs/content-drafts/` и исключены из публичного Git.
- Hero/H1/metadata/OG-варианты для этих пяти услуг намеренно отложены. Не смешивать будущий
  metadata-эксперимент с baseline body/FAQ/Schema release от 2026-08-22.
- Следующие обязательные направления: получить недостающие legal/privacy-реквизиты, заполнить
  существующий Google Business Profile подтверждёнными фактами и измерять SEO-эффект релиза по
  сопоставимым Germany / 28-day окнам.
- Локальные аналитические артефакты: `reports/seo-analytics-2026-08-20/` и
  `reports/seo-content-baseline-2026-08-22/`. Они исключены из публичного Git и production build.

## 1. P0 — legal и privacy

Подтверждённые публичные данные и фактический data flow перечислены в `SITE.md`,
`docs/LEGAL_PAGES_GUIDELINES.md` и privacy-карте ниже. Не угадывать Rechtsform, роли,
регистрационные реквизиты или данные поставщиков.

- [ ] Получить точные `Registergericht`, `Registernummer`, `Rechtsform` и зарегистрированное
      наименование. Отдельно уточнить Handwerksrolle, Kammer и специальные разрешения. Одного
      утверждения о записи в Handelsregister недостаточно для публикации.
- [ ] Получить точное название сервиса счетов/бухгалтерии, данные поставщика, место обработки и
      применимую AVV/DPA; уточнить место хранения договоров.
- [ ] Решить, действительно ли форма требует фамилию, или поле можно честно обозначить просто как
      `Name`. Любое изменение синхронизировать во всех слоях формы и Datenschutzerklärung.
- [ ] После прямого owner-login в Hostinger без `Impersonate mode` получить account-specific ответ:
      дата/версия принятого DPA, contractual account holder, полный список ролей и доступов, сроки
      access/error/mail logs и наличие POST body в логах. Ничего не менять в Terms, legal entity,
      billing, plan, users, domain или ownership.
- [ ] Решить срок retained copies в WEB.DE и дату отключения `Kopien im Postfach behalten`.
- [ ] Утвердить удаление закрытых заявок из Gmail, Sheet и дополнительных систем с учётом Trash,
      version history и backups; зафиксировать срок Apps Script execution logs.
- [ ] Утвердить ротацию production backups и дату пересмотра старого WordPress backup.
- [ ] Выбрать закрытую папку вне Git для provider confirmations, PDF и юридических заключений.
- [ ] Передать специалисту по праву Германии Hostinger DPA, Workspace CDPA, GA4 terms и
      фактический data flow; получить финальные немецкие формулировки.

## 2. P1 — Google Business Profile и внешние профили

Существующий подтверждённый профиль `LOSOMA Gebäudeservice` принадлежит Primary Owner
`maxim@losoma.de`; новый профиль не создавать. Полный сценарий созвона находится в
`docs/GOOGLE_BUSINESS_PROFILE_CHECKLIST_RU.md`.

- [ ] Подтвердить единое публичное название, opening hours, service areas, primary/additional
      categories, актуальные services, opening date, официальные company social profiles и реальные
      фотографии.
- [ ] Если посетителей по Geschäftsadresse не принимают, оформить профиль как service-area
      business и скрыть публичный адрес.
- [ ] После подтверждения фактов заполнить services/description, добавить UTM-ссылки и реальные
      фото, затем запустить честный review process без вознаграждений.
- [ ] Исправить старые адрес/email/название в Locanto и Gelbe Seiten. Временное объявление Locanto
      не добавлять в Organization `sameAs`; сначала выбрать постоянные брендированные профили.
- [ ] Все изменения пользователей и ownership выполнять только по отдельной прямой задаче из
      `maxim@losoma.de`; закрытый transfer/invitation workflow не повторять.

## 3. P1/P2 — SEO, Schema и контент

### Измерение текущего release

- Baseline до нового контента и методика сравнения сохранены в
  `reports/seo-content-baseline-2026-08-22/`; более ранний полный срез — в
  `reports/seo-analytics-2026-08-20/`.
- Основной cohort: canonical Hostinger URL, страна Germany, одинаковые 28-day окна до/после.
  Семидневные окна использовать только для раннего мониторинга при малой выборке.
- Не приписывать агрегированный average-position рост новому тексту, если различаются периоды,
  страны, query mix или доля brand/non-brand. Vercel не использовать как SEO-источник.

- [ ] В первые 6–8 недель после 2026-08-22 еженедельно фиксировать одинаковые Germany / 7-day
      срезы для пяти изменённых URL: non-brand impressions, disclosed queries, clicks, CTR, page
      position и generative-AI impressions.
- [ ] После накопления данных сравнить сопоставимые Germany / 28-day окна по каждому URL и query
      cluster; отдельно зафиксировать выводы для body/FAQ/Schema release.
- [ ] Связать существующие GA4 property `Losoma Website` и Search Console property
      `sc-domain:losoma.de`; новую property не создавать.
- [ ] После первого подтверждённого `form_success` отметить его как key event в GA4 и убедиться,
      что событие возникает только после успешной доставки формы.
- [ ] Проверить field Core Web Vitals после появления достаточных CrUX data.

### Следующие улучшения

| Приоритет | URL/канал | Следующий подтверждённый шаг |
|---|---|---|
| P0 | GBP + citations + reviews | подтвердить поля профиля, добавить реальные фото, исправить внешние записи и запустить review process |
| P1 | `/gewerbliche-reinigung` | измерить release, затем добавить подтверждённый кейс, фото и references |
| P1 | `/fassaden-hoehenarbeiten` | подтвердить доступ, высоту, безопасность, материалы и Baum-/Astarbeiten; затем усилить H1, состав, процесс и proof |
| P1 | `/grundreinigung` | измерить release и получить реальный кейс/фото без неподтверждённых product claims |
| P2 | `/hausmeisterservice` | измерять вместе с GBP/reviews/citations, позднее добавить реальный кейс |
| P3 | остальные услуги + blog | обновлять только после получения собственной фактуры; не создавать массовые district pages |

- [ ] Для оставшихся четырёх service pages повторять предметную структуру только после получения
      собственной подтверждённой фактуры; не копировать новые блоки механически.
- [ ] Hero/H1/metadata/OG пяти обновлённых услуг менять только отдельным измеримым этапом.
- [ ] Расширить `/blog/hausmeister-vs-externer-spezialist`, затем подготовить материалы про состав
      Hausmeisterservice, факторы стоимости и checklist для Hausverwaltung.
- [ ] Получить по приоритетным услугам реальные кейсы, собственные фото, references, страховку,
      сертификаты и квалификации — только с правом публичного использования.
- [ ] Подтвердить coordinates, address visibility, hours, price range и founding date до их
      добавления в Schema. После правок проверить JSON-LD через Rich Results Test и Schema Markup
      Validator.
- [ ] Добавить Twitter Card на 13 страниц, где её ещё нет, и размеры OG image на все 15 страниц;
      повторно проверить реальные alt-тексты при замене изображений.
- [ ] Повторять indexing request только для реально изменённого canonical URL, если URL Inspection
      показывает устаревшую версию; успехом считать только явное `Indexierung wurde beantragt`.
- [ ] Опционально решить, нужен ли Bing Webmaster Tools.
- [ ] После стабильной работы SPF/DKIM проверить DMARC и только затем постепенно усиливать policy.

Claims, которые нельзя публиковать без отдельного подтверждения, и workflow RU→DE описаны в
`docs/SEO_AND_CLASS_GUIDELINES.md`. Полный competitor snapshot находится в
`docs/COMPETITOR_SERVICE_RESEARCH_2026-08-03.md`; факты конкурентов не копировать.

## 4. Фактическая privacy-карта формы

| Данные | Обязательность | Куда попадают | Открытый вопрос |
|---|---:|---|---|
| Name | обязательно | Sheet + Gmail | необходимость полного имени |
| Email | обязательно | Sheet + Gmail | нет |
| Telefon | обязательно | Sheet + Gmail | обычно требуется для обработки заявки; подтверждено клиентом |
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
- Gmail/Sheet closed inquiry without order: максимум 6 месяцев после окончательного завершения.
- GA4 user/event data: 14 месяцев.
- Hostinger logs, WEB.DE retained copy и Apps Script execution logs: сроки открыты.
- Maxim Soga отвечает за регулярную проверку и удаление Gmail/Sheet.

## 5. Release gate

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
- [ ] Записать актуальные release/rollback paths, hashes и smoke result только в `SITE.md`.
