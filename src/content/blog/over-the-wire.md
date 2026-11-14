---
title: Over The Wire - Wspomnienia
description: Ogólny opis mojego wykonania zadań z "Over The Wire"
pubDate: 2026-11-14
tags:
  - cybersec
---

Dla testu wykonałem pierwszych 20 poziomów w grze "Over The Wire". Tak jak zapowiadałem w poprzednim poście miało to na celu sprawdzić moje umiejętności w zakresie obsługi Linuxowego terminala i pokazać, gdzie mam braki do nadrobienia.

W pierszej kolejności muszę od razu zmienić moją zapowiedź odnośnie dokumentowania pracy z "Over The Wire" z poprzedniego posta. Zaczynając wykonywanie zadań byłem przygotowany, że wykonam może z 5 pierwszych i zrobię pauzę na kilka dni. Okazało się, że tak się zatraciłem w tych levelach, że w niecałe 5 godzin zrobiłem wszystkie bez przerwy 😅 Tak więc zamiast serii postów będzie tylko jeden...

Przechodząc do sedna, jak mi poszło i w jaki sposób opiszę tutaj swoje poczynania. Zgodnie z prośbą twórców gry nie będę zamieszczał danych dostępowych do poszczególnych leveli oraz nie będę opisywał dokładnych działań, jakie podjąłem. Jak zrozumiałem twórcom chodzi o to, by solucje do leveli gry nie były tak łatwo dostępne. Dlatego też ten post będzie się składał z dość dużej ilości ogólników, by przestrzegać prośby twórców. Jednak ostrzegam, że nawet opisowy sposób przedstawienia mojej dokumentacji może być spoilerem do przedstawionych leveli 😊

Zaczynając od levela 0 do około levela 8 zadania polegały na odczycie wartości z pliku na różny sposób. Zajęło mi to krótką chwilę, dosłownie przeskakiwałem z levela na level.

Na levelach 9-12 zacząło się już podwyższanie trudności. Tutaj trzeba było nie tylko odczytać wartość z pliku, ale najpierw trzeba było ją z tego pliku wyciągnąć w odpowiedni sposób poprzez jedną z metod manipulacji danymi na wyjściu terminala. Tutaj dał mi popalić level 12, pierwszy taki level, nad którym musiałem się zastanowić dużo głębiej, niż przy poprzednich.

Od levela 13 zaczyna się już ta poważniejsza zabawa 😉 Tutaj miałem do odpakowania ogromną ilość archiwów. Przez chwilę myślałem, że sam się zapętliłem i przepakowywałem ciągle te same dane 😅 ale nie, okazało się, że miało to swój kres i znalazłem flagę. Tutaj mam wniosek, że przy takich zadaniach brakuje mi umiejętności automatyzacji, to zadanie wykonałbym dużo szybciej pisząc skrypt, który by rozpakowywał plik na podstawie jego sygnatury.

Levele 14-17 i 19 to zadania sieciowe, sprawdzające znajomość działania SSH oraz skanowania portów. Na levelu 14 trochę przymuliłem, musiałem załapać z jakiej maszyny mam użyć klucza prywatnego. Zaś level 18 sprawdzał, jak uzyskiwać dane poprzez różnicę między plikami.

Level 20 to kontrolowane użycie exploita.

Podsumowując, bawiłem się świetnie 😁 Te pierwsze kilka zadań to taka rozgrzewka, którą fundują nam twórcy gry. Potem zabawa się rozkręca. Było trochę potknięć z mojej strony, gdzieś od zadania 16 już zacząłem się dużo gubić, prawdopodobnie ze zmęczenia. Jeśli chodzi o umiejętności i wiedzę to nie miałem problemu z tym, bym nie wiedział jak przejść dany poziom. Umiałem sobie ułożyć kroki logiczne co oraz jak wykonać, ale brakowało mi pojedynczych informacji. Jak np. nie pamiętałem dokładnie struktury i nazw argumentów do komendy `find` czy właśnie pobierałem klucz prywatny na nie tą maszynę, co trzeba. Trochę to wina niepamięci, trochę braku wprawy. Na pewno wybrzmiewa tutaj brak umiejętności automatyzacji pracy w terminalu (i nie tylko tam).

Myślę, że pierwszy kamień milowy z planu działania mogę uznać za osiągnięty. Braki będę uzupełniał już przy okazji pracy z terminalem podczas kolejnych praktycznych ćwiczeń z kolejnych kamieni milowych. Zatem w następnym poście zajmę się podstawami sieci komputerowych.

Do następnego!

### Źródła

Zadania zostały wykonane na serwerze [Over The Wire](https://overthewire.org/wargames/).