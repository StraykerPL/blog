---
title: Plan działania i pierwsze operacje
description: Rozpiska, czym będę się zajmował i udokumentowanie pierwszego ćwiczenia.
pubDate: 2026-08-11
tags:
  - cybersec
---

Dobra, to na początek warto by było ustalić jakiś plan. Na pewno się on zmieni, bo wraz z poznawaniem nowych tematów odkryję istnienie kolejnych.

Ale tak wstępnie:
1. Linux - powłoka bash, bardziej dogłębnie grep, find, SSH,
2. Teoria sieci komputerowych - tutaj na pewno HTTP, DNS, TCP/UDP, ARP, przynajmniej w podstawowym zakresie, żeby rozumieć jak działają,
3. Python - tutaj same podstawy, nie muszę umieć go na poziomie developera, wystarczy jak będę mógł automatyzować sobie pracę,

Chyba tyle jeśli chodzi o podstawy do działania. Więc teraz trochę bardziej konkretnie: co będę ćwiczył w samym obszarze Cybersec?

1. OSINT - techniki w szczególności analityczne, chciałbym lepiej rozumieć dane, które już posiadam, np. z mojej własnej infrastruktury czy projektów. Chciałbym również poprawić efektywność swoich researchy, dokładniej i wydajniej analizować dane z neta,
2. OPSEC - chciałbym również umieć lepiej zabezpieczać swoje dane przed innymi, niż podstawowe techniki, które już znam,
3. Red teamowe wejścia na sieci komputerowe - wejście na sieć WiFi, albo do sieci zamkniętej/wewnętrznej, to mnie po prostu ciekawi,
4. CTF - dobre ćwiczenia ogólne na używanie narzędzi,
5. Inżynieria wsteczna - nigdy się tym przy developmencie nie zajmowałem, a również ciekawy temat,

Zakres subiektywnie oceniam jako spory, bo te tematy są bardzo głębokie w ilość wiedzy, ale najpewniej będę uczył się ich tylko do jakiegoś określonego milestone'a, a nie całość jak leci. Myślę również, że na ten moment nie będę rozmyślał nad żadnym bug bounty. Nie jest to celem mojego uczenia się Cybersec i nie sądzę, żeby ta podstawowa wiedza z pierwszej listy tego posta dawała mi jakąś możliwość wykrycia podatności w prawdziwych systemach. Drugi aspekt to czas. Raczej w pierwszych miesiącach nauki nie będę umiał ich wykrywać.

Za rozgrzewkę do całości Cybersec posłużył mi [Google XSS Game](https://xss-game.appspot.com/level1), polecany na absolutny początek nauki, najczęściej jako punkt kontrolny dotychczasowej wiedzy, pozwalający sprawdzić co już się umie.

Za frazę testową służyło mi `alert()`, tak jak prosi gra. W zależności od miejsca umieszczenia frazy, używałem `<script>alert()</script>` lub po prostu `alert()`

Level 1 zrobiłem w kilka sekund, zwykłe wbicie frazy sprawdzającej.

Level 2 też raczej chwilka zastanowienia się, fraza sprawdzająca podłączona jako wywołanie eventu kliknięcia przycisku.

Level 3 to samo co w drugim.

Level 4 troszeczkę musiałem się nagłówkować z podpięciem frazy, bo zadanie prosi o trochę inną ścieżkę w tipach 😅, ale też szybko poszło na przycisku tak jak na drugim levelu.

Level 5 to magia JSa, jak dla mnie to dziwna trochę funkcjonalność pod względem developerskim pozwalać funkcji hiperłącza przestać być hiperłączem 🙃, ale nie znam historii stojącej za tym tagiem HTMLa, więc przemilczę. Tak więc wstrzyknięcie JSa w link załatwia sprawę.

No i level 6 dał mi popalić 😆. Tutaj dużo się zastanawiałem, samo wstrzyknięcie podanego w ostatnim tipie payloadu nic nie dało, bo jeszcze trzeba było zmusić aplikację do uruchomienia go. Co się okazało, ten jakiś JS od Google'a jest dość spory, nie wiem co w ogóle ma za zadanie robić, musiałbym całość przeformatować na readable intended i sprawdzić, a i tak nie był zbytnio potrzebny. Wstrzyknięcie jakiegokolwiek pliku z frazą dałoby radę. Fajnie jest iść po najniższej linii oporu i zrobić tak jak to sprawdziłem, że można zrobić. Ale ja postanowiłem być sprytny 😆. Skoro status ładowania pliku jest w postaci taga "div", to można to wykorzystać - div jest klikalny 😉 (czyli że obsługuje event onclick). Event wstrzyknięty, zadanie skończone, tak jak wyświetlił mi się ASCII art, poszedłem na ciasto 🙂

Ogólnie określam tą gierkę za przydatną, pomogła mi załapać kawałek perspektywy tego, jak XSS widzi atakujący. Oczywiście, jako programista stwierdzam, ta gra nie jest dla mnie 😆. To dobry warsztat dla osoby nietechnicznej, która googluje prawie każdy swój ruch, która nie wpadnie na to, co ja (trzy levele przeszedłem tą samą techniką), bo do tego jest już potrzebna znajomość HTMLa i rozumienie jak działa JS w przeglądarce.

Sama gra jest też w ten sposób pomyślana: kod gry sprawdza tylko i wyłącznie, czy z osadzonego iframe'a wyleciał alertbox, nic więcej. Więc gdyby gra sprawdzała po kolei każdy punkt wymagany przez zadanie, nie byłoby takiej dowolności w osiąganiu celu, a zadania dałoby się wykonać tylko w jeden konkretny sposób. Więc nie tylko ta apka osadzona w iframe gry jest dziurawa, sama gra też jest 🙂 Ale tak jak napisałem, gra nie była tworzona z myślą o już wyszkolonych w tym zakresie informatykach, a raczej o osobach początkujących.

To będzie tyle na ten post.
Do następnego!