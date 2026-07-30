# SEO Ranking Monitoring — Losoma

Последнее обновление: 2026-07-30.

## Последний подтверждённый срез

- Search Console открыт под `maxim@losoma.de`; sitemap успешно обработан, обнаружено 15 URL.
- Отчёт `Seiten` на момент проверки всё ещё использовал срез 2026-07-24: 6 URL индексировано,
  13 не индексировано. Для текущего статуса отдельной страницы использовать URL Inspection.
- `Leistung`, обновлённый примерно за 7,5 часа до проверки: 5 кликов, 11 показов, CTR `45,5%`,
  средняя позиция `1,6`. Запрос `losoma`: 4 клика, 5 показов.
- Подтверждённо проиндексированы `/blog`, `/gewerbliche-reinigung`, `/industriereinigung`,
  `/fassaden-hoehenarbeiten`, `/impressum`. Запросы индексации подтверждены для
  `/hausmeisterservice`, `/grundreinigung` и `/garten-landschaftspflege`.
- Следующая ручная проверка — только `/solaranlagenreinigung`, `/treppenhausreinigung` и
  `/kontakt`. Все три прошли Live URL Test 2026-07-30; Solar снова вернул общую ошибку Google,
  поэтому Treppenhaus и Kontakt в той же сессии не отправлялись. Не отправлять повторно URL с уже
  подтверждённым запросом и не отправлять redirect/`.html`/trailing-slash варианты.

## Где проверять

Основной источник — Google Search Console → `Leistung` / Search results.

Для каждой проверки:

1. Включить `Klicks`, `Impressionen`, `CTR` и `Durchschnittliche Position`.
2. Выбрать период 28 дней и сравнить с предыдущими 28 днями.
3. Добавить фильтр страны `Deutschland`.
4. Проверить общий результат, затем отдельно Mobile и Desktop.
5. Для каждой целевой страницы поставить точный URL-фильтр и открыть вкладку `Suchanfragen`.
6. Записывать не единичную позицию, а тренд показов, кликов, CTR и средней позиции.
7. Не считать ручной поиск в Google надёжным измерением: он зависит от геолокации,
   персонализации, устройства и истории поиска.

## Карта запросов и страниц

| Целевая страница | Основные запросы для наблюдения |
|---|---|
| `/` | `Gebäudeservice Berlin`, `Gebäudedienstleistungen Berlin`, `Gebäudereinigung Berlin` |
| `/hausmeisterservice` | `Hausmeisterservice Berlin`, `Hausmeisterdienst Berlin` |
| `/treppenhausreinigung` | `Treppenhausreinigung Berlin`, `Treppenhausreinigung Firma Berlin` |
| `/gewerbliche-reinigung` | `Gewerbereinigung Berlin`, `gewerbliche Reinigung Berlin` |
| `/grundreinigung` | `Grundreinigung Berlin`, `Grundreinigung Firma Berlin` |
| `/industriereinigung` | `Industriereinigung Berlin`, `Industriereinigung Firma Berlin` |
| `/winterdienst` | `Winterdienst Berlin`, `Winterdienst Firma Berlin` |
| `/garten-landschaftspflege` | `Gartenpflege Berlin`, `Garten Landschaftspflege Berlin` |
| `/fassaden-hoehenarbeiten` | `Fassadenreinigung Berlin`, `Höhenarbeiten Berlin` |
| `/solaranlagenreinigung` | `Solaranlagenreinigung Berlin`, `Photovoltaik Reinigung Berlin` |

## Еженедельная таблица

Для каждого запроса сохранять:

- дата проверки;
- запрос;
- целевая страница;
- показы;
- клики;
- CTR;
- средняя позиция;
- изменение к предыдущему периоду;
- страна и устройство;
- комментарий о внесённых SEO-изменениях.

Первый сопоставимый post-release срез снимать не раньше чем через 7–14 дней после release
2026-07-30 и сравнивать одинаковые 28-дневные периоды. Lab Lighthouse/DevTools не заменяет полевые
данные Search Console.

## Как интерпретировать

- Высокие показы, позиция 4–15 и низкий CTR: проверить title и description.
- Рост показов при стабильных кликах: запрос расширяется, но сниппет или позиция требуют работы.
- Две страницы показываются по одному запросу: проверить возможную каннибализацию.
- Нет показов сразу после запуска: подождать повторного обхода и накопления данных, проверить URL
  Inspection и sitemap; не менять страницу ежедневно без данных.
- Изменения оценивать не раньше чем после достаточного числа показов и сравнивать одинаковые периоды.

## Ограничения

Search Console показывает среднюю позицию по показам, а не одно фиксированное место. Часть редких
или анонимизированных запросов может не отображаться. Для локального ежедневного контроля можно
позже подключить отдельный rank tracker с локацией Berlin, но Search Console остаётся источником
фактических показов и кликов Google.
