# Datenschutzerklärung — рабочий черновик (Losoma)

> Рабочий документ для подготовки страницы `/datenschutz`. Здесь: зафиксированные
> решения, открытые вопросы и полный немецкий текст под реальный сценарий сайта.
> Это НЕ финальная страница — сначала закрыть плейсхолдеры `[…]` и сверить с
> юристом/генератором.

**⚠️ Дисклеймер:** я не юрист. Текст составлен под технические факты сайта и по
стандартной структуре немецких Datenschutz-генераторов. Перед публикацией прогнать
через e-Recht24 / activeMind или показать юристу — ответственность за точность на
владельце.

---

## 1. Зафиксированные решения

| Тема | Решение |
|---|---|
| **Хостинг** | Склоняемся к **Cloudflare Pages** (спам-защита Turnstile/WAF, всё в одном кабинете, EU-локализация). Финально не подтверждён. Текущий рабочий — Vercel. |
| **Шрифты** | ✅ **СДЕЛАНО (2026-06-22).** Lato self-hosted: woff2 + `lato.css` в `assets/vendor/lato/`, внешние `fonts.googleapis.com`/`gstatic.com` убраны со всех 13 страниц. → передачи IP в Google из-за шрифтов больше нет; раздел Google Fonts на странице не нужен. |
| **Форма** | `Cloudflare Pages Function` (проверка **Turnstile** + honeypot) → **Google Apps Script** → запись строки в **Google Sheet** + письмо на `losoma@web.de`. Отдельный почтовый сервис не нужен (письмо шлёт сам Apps Script). |
| **Обработчики формы** | Google (Sheets + Gmail/Apps Script) и Cloudflare (Turnstile). |
| **Аналитика** | **Google Analytics будет подключён 100%** → обязателен **consent-баннер**; GA грузится только после согласия (§ 25 TDDDG). |
| **Cookies** | Появятся вместе с GA → нужен CMP/баннер (Klaro / CookieConsent бесплатные, либо Cookiebot/Usercentrics платные). |
| **Google Maps** | Пока **не встраиваем**. Если позже встроим карту — +обработчик +согласие. |
| **Cookie-Einstellungen** | **Отдельной страницы НЕТ.** Это кнопка в футере, которая заново открывает consent-баннер (отзыв/изменение согласия — обязателен по §25 TDDDG). Технически — `<button>`, вызывающий API CMP (напр. `window.klaro.show()`). Появляется вместе с баннером и GA («шаг 2»). Список самих куки — таблицей внутри Datenschutz (раздел 4) или авто-генерацией CMP, не отдельной страницей. |

> **Итог по техническим страницам:** одна реальная страница — `/datenschutz`.
> «Cookie-Einstellungen» — это футер-кнопка-триггер, не контент-страница.

---

## 2. Открытые вопросы (нужны ответы)

1. **Порядок запуска Datenschutz — НЕТ ОТВЕТА.**
   - Вариант **A**: опубликовать минимальную политику сейчас (хостинг + логи + форма, **без** GA), а раздел GA + баннер добавить в день подключения аналитики. *(сайт станет легальным уже сейчас)*
   - Вариант **B**: написать сразу финальную версию и опубликовать всё вместе с GA позже.
2. **Юрлицо Verantwortlicher — НЕТ ОТВЕТА.** Один ИП (Einzelunternehmen) или **GbR** из двоих (Maxim Soga / Alexandr Lozinschi)? В Impressum сейчас стоит «Einzelunternehmen», но указаны двое — это нестыковка, касается и Impressum.
3. **Подтвердить хостинг** (Cloudflare Pages?) и **финальный домен** (напр. `losoma.de`).
4. **«Бизнес-аккаунт Google»** — это Google **Workspace** (бизнес-почта, один AVV покроет Sheets+GA) или Google **Business Profile** (карточка в Maps)? Скорее оба.
5. **Какой CMP/баннер** выбираем для согласия на GA.

---

## 3. Плейсхолдеры, которые надо заменить перед публикацией

- `[ВЛАДЕЛЕЦ / RECHTSFORM]` — имя(имена) + форма (ИП или GbR) → вопрос 2.
- `[АДРЕС]` — какой из двух адресов Impressum юридический.
- `[ХОСТЕР]` — Cloudflare, Inc. или Vercel Inc. (после решения по хостингу).
- `[STAND-Datum]` — месяц и год публикации (напр. «Juni 2026»).
- Разделы, помеченные **`⚠️ AKTIVIEREN erst wenn GA + Banner live`**, публиковать только когда аналитика и баннер реально работают (это и есть развилка A/B).

---

## 4. Полный текст (целевое состояние)

> Немецкий текст — для копирования в страницу. Разделы с пометкой
> **`⚠️ AKTIVIEREN …`** — это «шаг 2» (включаются вместе с GA). Для варианта A
> на старте берём всё, КРОМЕ помеченных разделов (4 и 7), и слегка правим раздел 5
> (см. примечание в нём).

---

```text
Datenschutzerklärung
```

### 1. Datenschutz auf einen Blick / Verantwortlicher

```text
1. Datenschutz auf einen Blick

Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Diese Datenschutz-
erklärung informiert Sie darüber, welche Daten wir beim Besuch dieser Website
erheben, wie wir sie verwenden und welche Rechte Ihnen zustehen.

Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:

Losoma
[ВЛАДЕЛЕЦ / RECHTSFORM]
[АДРЕС], Berlin
Telefon: +49 176 444 34 111
E-Mail: losoma@web.de

Eine Verpflichtung zur Benennung eines Datenschutzbeauftragten besteht für uns
nicht.
```

### 2. Hosting und Server-Logfiles

```text
2. Hosting und Server-Logfiles

Diese Website wird bei einem externen Dienstleister gehostet:

[ХОСТЕР]
— Variante Cloudflare: Cloudflare, Inc., 101 Townsend St, San Francisco,
  CA 94107, USA
— Variante Vercel:    Vercel Inc., 340 S Lemon Ave #4133, Walnut,
  CA 91789, USA

Beim Aufruf unserer Website werden durch den Hosting-Anbieter automatisch
Informationen in sogenannten Server-Logfiles erfasst, die Ihr Browser
übermittelt. Dies sind:

- IP-Adresse des zugreifenden Geräts
- Datum und Uhrzeit des Zugriffs
- Name und URL der abgerufenen Datei
- übertragene Datenmenge
- Meldung über erfolgreichen Abruf
- verwendeter Browsertyp und dessen Version
- Betriebssystem
- die zuvor besuchte Seite (Referrer-URL)

Diese Daten dienen der technischen Auslieferung, der Stabilität und der
Sicherheit der Website. Die Verarbeitung erfolgt auf Grundlage unseres
berechtigten Interesses an einem zuverlässigen und sicheren Betrieb der Website
(Art. 6 Abs. 1 lit. f DSGVO). Die Logfiles werden nach kurzer Zeit automatisch
gelöscht, soweit sie nicht zur Aufklärung oder Abwehr von Sicherheitsvorfällen
benötigt werden.

Der Hosting-Anbieter ist für uns als Auftragsverarbeiter tätig; ein
entsprechender Vertrag zur Auftragsverarbeitung (Art. 28 DSGVO) liegt vor.

Hinweis zur Datenübermittlung in die USA: Der Anbieter verarbeitet Daten auch
in den USA. Die Übermittlung wird auf den EU-US Data Privacy Framework bzw.
ergänzend auf die Standardvertragsklauseln der EU-Kommission gestützt.
```

> RU: «Vertrag zur Auftragsverarbeitung liegt vor» подразумевает, что AVV/DPA с
> хостером реально подписан — у Cloudflare и Vercel есть стандартный DPA, надо
> активировать в аккаунте.

### 3. SSL- bzw. TLS-Verschlüsselung

```text
3. SSL- bzw. TLS-Verschlüsselung

Diese Website nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung.
Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des
Browsers von „http://“ auf „https://“ wechselt. Wenn die Verschlüsselung aktiv
ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen
werden.
```

### 4. Cookies und Einwilligungsverwaltung  ⚠️ AKTIVIEREN erst wenn GA + Banner live

```text
4. Cookies und Einwilligungsverwaltung

Unsere Website verwendet Cookies und vergleichbare Technologien nur, soweit dies
für den Betrieb der Website technisch erforderlich ist oder Sie zuvor eingewilligt
haben. Technisch notwendige Cookies werden auf Grundlage unseres berechtigten
Interesses gesetzt (Art. 6 Abs. 1 lit. f DSGVO, § 25 Abs. 2 TDDDG).

Einwilligungspflichtige Dienste (z. B. Web-Analyse) werden erst geladen, nachdem
Sie über unser Einwilligungs-Banner zugestimmt haben. Ihre Auswahl können Sie
jederzeit mit Wirkung für die Zukunft über die Einstellungen des Banners ändern
oder widerrufen. Rechtsgrundlage ist Ihre Einwilligung
(Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG).
```

> RU: раздел включается только когда баннер и GA реально работают (вариант B
> или «шаг 2» варианта A).

### 5. Kontaktaufnahme und Kontaktformular

```text
5. Kontaktaufnahme und Kontaktformular

Wenn Sie uns über das Kontaktformular, per E-Mail oder telefonisch kontaktieren,
verarbeiten wir die von Ihnen mitgeteilten Daten, um Ihre Anfrage zu bearbeiten
und zu beantworten.

Über das Kontaktformular erheben wir folgende Angaben:

- Name (Vor- und Nachname)
- E-Mail-Adresse
- Telefonnummer
- gewünschte Leistung
- Ihre Nachricht (sofern angegeben)

Pflichtangaben sind als solche gekennzeichnet; ohne diese Angaben können wir Ihre
Anfrage nicht bearbeiten. Die übrigen Angaben sind freiwillig.

Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage auf den
Abschluss oder die Durchführung eines Vertrags gerichtet ist, im Übrigen unser
berechtigtes Interesse an der Beantwortung Ihrer Anfrage
(Art. 6 Abs. 1 lit. f DSGVO).

Zur Verarbeitung und Speicherung der über das Formular eingegangenen Anfragen
nutzen wir Dienste der Google Ireland Limited, Gordon House, Barrow Street,
Dublin 4, Irland („Google“). Die Formulardaten werden hierzu in einer Google-
Tabelle (Google Sheets) gespeichert und per E-Mail an uns übermittelt. Google
kann Daten dabei auch auf Servern in den USA verarbeiten; die Übermittlung wird
auf den EU-US Data Privacy Framework bzw. die Standardvertragsklauseln gestützt.
Mit Google besteht ein Vertrag zur Auftragsverarbeitung (Art. 28 DSGVO).

Ihre Daten werden gelöscht, sobald die Anfrage abschließend bearbeitet ist und
keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
```

> RU (вариант A на старте — пока формы/Google ещё нет в проде): убрать абзац про
> Google Sheets и заменить на нейтральное:
> «Die im Zusammenhang mit Ihrer Anfrage übermittelten Daten verarbeiten wir
> ausschließlich zur Bearbeitung Ihres Anliegens und geben sie nicht ohne Ihre
> Einwilligung an Dritte weiter.»
> Когда форма заработает через Apps Script → Google Sheet — вернуть абзац про Google.

### 6. Spam-Schutz (Cloudflare Turnstile)  — если хостинг Cloudflare

```text
6. Spam-Schutz / Cloudflare Turnstile

Zum Schutz unseres Kontaktformulars vor missbräuchlicher automatisierter Nutzung
(Spam, Bots) setzen wir „Turnstile“ der Cloudflare, Inc., 101 Townsend St,
San Francisco, CA 94107, USA ein. Turnstile prüft, ob eine Eingabe von einem
Menschen stammt. Dabei werden technische Informationen (u. a. IP-Adresse, Browser-
und Geräteinformationen) an Cloudflare übermittelt und ausgewertet. Rechtsgrundlage
ist unser berechtigtes Interesse an der Abwehr von Spam und Missbrauch
(Art. 6 Abs. 1 lit. f DSGVO). Eine Datenübermittlung in die USA wird auf den
EU-US Data Privacy Framework bzw. die Standardvertragsklauseln gestützt.
```

> RU: если в итоге хостинг останется Vercel и Turnstile не используется — раздел убрать.

### 7. Google Analytics  ⚠️ AKTIVIEREN erst wenn GA live

```text
7. Webanalyse mit Google Analytics

Diese Website nutzt — nur nach Ihrer Einwilligung — den Webanalysedienst Google
Analytics der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
Irland. Google Analytics verwendet Cookies und ähnliche Technologien, die eine
Analyse Ihrer Nutzung der Website ermöglichen. Die erzeugten Informationen über
Ihre Nutzung (einschließlich gekürzter IP-Adresse) werden an Google übertragen
und dort gespeichert; eine Übermittlung in die USA wird auf den EU-US Data Privacy
Framework bzw. die Standardvertragsklauseln gestützt.

Wir verwenden Google Analytics mit aktivierter IP-Kürzung (Anonymisierung), sodass
Ihre IP-Adresse von Google innerhalb der EU/des EWR vor der Übertragung gekürzt
wird.

Rechtsgrundlage ist ausschließlich Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a
DSGVO und § 25 Abs. 1 TDDDG. Sie können Ihre Einwilligung jederzeit mit Wirkung
für die Zukunft über unser Einwilligungs-Banner widerrufen. Mit Google besteht
ein Vertrag zur Auftragsverarbeitung (Art. 28 DSGVO).
```

> RU: подключение GA → обязателен Consent Mode v2, если позже добавишь Google Ads.

### 8. Links zu sozialen Netzwerken

```text
8. Links zu sozialen Netzwerken

Auf unserer Website finden Sie Verweise auf unsere Profile in sozialen
Netzwerken (z. B. LinkedIn, Facebook, Instagram). Es handelt sich dabei um
einfache Verlinkungen, nicht um eingebundene Plugins. Eine Datenübertragung an
die jeweiligen Anbieter findet erst statt, wenn Sie auf einen dieser Links klicken
und auf die externe Seite weitergeleitet werden. Für die Datenverarbeitung auf den
verlinkten Seiten ist der jeweilige Anbieter verantwortlich.
```

### 9. Ihre Rechte als betroffene Person

```text
9. Ihre Rechte als betroffene Person

Sie haben jederzeit das Recht:

- auf Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO),
- auf Berichtigung unrichtiger Daten (Art. 16 DSGVO),
- auf Löschung Ihrer Daten (Art. 17 DSGVO),
- auf Einschränkung der Verarbeitung (Art. 18 DSGVO),
- auf Datenübertragbarkeit (Art. 20 DSGVO),
- der Verarbeitung Ihrer Daten zu widersprechen (Art. 21 DSGVO).

Soweit die Verarbeitung auf einer Einwilligung beruht, können Sie diese jederzeit
mit Wirkung für die Zukunft widerrufen. Die Rechtmäßigkeit der bis zum Widerruf
erfolgten Verarbeitung bleibt davon unberührt.

Zur Ausübung Ihrer Rechte genügt eine formlose Mitteilung an die oben genannten
Kontaktdaten.
```

### 10. Beschwerderecht bei der Aufsichtsbehörde

```text
10. Beschwerderecht bei der Aufsichtsbehörde

Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die
Verarbeitung Ihrer personenbezogenen Daten zu beschweren. Die für uns zuständige
Aufsichtsbehörde ist:

Berliner Beauftragte für Datenschutz und Informationsfreiheit
Alt-Moabit 59–61, 10555 Berlin
Telefon: +49 30 13889-0
E-Mail: mailbox@datenschutz-berlin.de
```

### 11. Aktualität und Änderung dieser Datenschutzerklärung

```text
11. Aktualität und Änderung dieser Datenschutzerklärung

Diese Datenschutzerklärung ist aktuell gültig (Stand: [STAND-Datum]). Durch die
Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher Vorgaben
kann es notwendig werden, diese Datenschutzerklärung anzupassen.
```

---

## 5. Технические TODO (когда дойдём до реализации)

- [ ] Перенести Lato в self-host (`@font-face`, убрать `<link>` на Google Fonts во всех HTML).
- [ ] Решить хостинг (Cloudflare Pages?) + закоммитить исходники/готовые картинки, чтобы CI-сборка из git работала.
- [ ] Cloudflare Pages Function для формы: Turnstile + honeypot → Apps Script.
- [ ] Google Apps Script: запись в Sheet + письмо на `losoma@web.de`.
- [ ] Активировать AVV/DPA с хостером и с Google.
- [ ] Подключить consent-баннер (CMP) перед GA.
- [ ] Собрать страницу `datenschutz.html` на компоненте `.legal-page` (как Impressum:
      `body.page--solid-header`, тот же header/footer, без form-вендоров).
- [ ] Добавить ссылку «Datenschutz» в футер на ВСЕХ страницах.
- [ ] В чекбоксе-согласии формы поставить ссылку на `/datenschutz`.
- [ ] Поставить `[STAND-Datum]` при публикации.
```
