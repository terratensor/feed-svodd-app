# feed-parser-app

### Поиск по сайтам kremlin.ru, mil.ru, mid.ru

https://feed.svodd.ru/ru


Этот репозиторий клиентская часть (сайт, приложение) проекта для реализации поиска по сайтам kremlin.ru, mil.ru, mid.ru, то, что видит пользователь в браузере.

https://github.com/terratensor/cohesion/issues/5

Серверная часть — служба обновления событий и индексеры доступны здесь:
https://github.com/terratensor/feed-parser

Сайт работает в тестовом режиме, дизайн еще не определён и в процессе разработки.

https://github.com/terratensor/feed-svodd-app/pull/1

Поиск не зависит от выбранного языка сайта, результат поиска зависти только от поискового запроса.
При переключении языка сайта меняется вывод на главной странице, будут показаны события на языке сайта.

- https://feed.svodd.ru/en
- https://feed.svodd.ru/de
- https://feed.svodd.ru/fr
- https://feed.svodd.ru/pt
- https://feed.svodd.ru/es

Язык может быть использован в 2х сценариях:

1. Переключение языка сайта — интерфейса, по умолчанию это не влияет на результаты поиска, только на интерфейс и на начальную страницу. Сейчас сделано так, если выбран язык, то на главной отображаются последние события в порядке возрастания даты на выбранном языке.
2. Переключения языка в результатах поиска, т.е. условно выбрать только русский и варианты событий на других языках отображаться в результатах поиска не будут.
Итого получается, что надо язык использовать чекбоксы в фильтре (выбор нескольких языков), в настройках поиска
Радио кнопка (выбор только одного языка) при переключении языка сайта, интерфейса.

https://github.com/terratensor/feed-svodd-app/pull/4

#### В поиске работают конструкции
- ИЛИ: [бпла | ЮВО](https://feed.svodd.ru/ru/search?page=1&query=%D0%B1%D0%BF%D0%BB%D0%B0+%7C+%D0%AE%D0%92%D0%9E)  
- И: [бпла ЮВО](https://feed.svodd.ru/ru/search?page=1&query=%D0%B1%D0%BF%D0%BB%D0%B0+%D0%AE%D0%92%D0%9E+)  
- По фразе: ["«Снежногорск» и «Брест»"](https://feed.svodd.ru/ru/search?page=1&query=%22%C2%AB%D0%A1%D0%BD%D0%B5%D0%B6%D0%BD%D0%BE%D0%B3%D0%BE%D1%80%D1%81%D0%BA%C2%BB+%D0%B8+%C2%AB%D0%91%D1%80%D0%B5%D1%81%D1%82%C2%BB%22)
- По вхождению слова: [прем*](https://feed.svodd.ru/ru/search?page=1&query=%D0%BF%D1%80%D0%B5%D0%BC*)

#### Поиск по полям:
- [@title бпла](https://feed.svodd.ru/ru/search?page=1&query=%40title+%D0%B1%D0%BF%D0%BB%D0%B0)
- [@summary бпла](https://feed.svodd.ru/ru/search?page=1&query=%40summary+%D0%B1%D0%BF%D0%BB%D0%B0)
- [@content бпла](https://feed.svodd.ru/ru/search?page=1&query=%40content+%D0%B1%D0%BF%D0%BB%D0%B0)
- [@title сводка @content бпла](https://feed.svodd.ru/ru/search?page=1&query=%40title+%D1%81%D0%B2%D0%BE%D0%B4%D0%BA%D0%B0+%40content+%D0%B1%D0%BF%D0%BB%D0%B0)

и другие логические сочетания

#### Фильтры в процессе реализации
- https://feed.svodd.ru/ru?rid=1 — Президент России
- https://feed.svodd.ru/ru?rid=2 — Министерство иностранных дел Российской Федерации
- https://feed.svodd.ru/ru?rid=3 — Министерство обороны Российской Федерации

- сочетания: https://feed.svodd.ru/ru?rid=1&rid=2 — Президент России, Министерство иностранных дел Российской Федерации


#### История изменений: 
25.03.2024 проиндексированы и добавлены в поиск все материалы, 
- на английском и русском языках сайта kremlin.ru
- на русском языке сайт mil.ru
