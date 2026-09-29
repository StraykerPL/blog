---
title: Podstawy terminala Linux
description: Opis moich ćwiczeń w Bash CLI
pubDate: 2026-09-29
tags:
  - cybersec
---

Zgodnie z planem, zaczynam od Linuxa. Bash był mi już wcześniej znany, więc podstawy jedynie sobie odświeżyłem, a skupiłem się na bardziej zaawansowanej pracy z komendami. Nie przewiduję na ten moment sprawdzania lub uczenia się innych powłok komend, więc całość dokumentacji będzie tylko pod Basha.

Poprzednio wyszczególniłem `grep`a, `find`a i SSH jako główny kierunek nauki. Żeby jakkolwiek wykorzystać `grep`a oraz `find`a potrzebne są podstawy poruszania się po systemie plików i tzw. "piping" komendy, by popracować na jej wyniku. Co do SSH, jest to bardzo szeroki temat i będzie o tym osobny post.

Co do środowiska nauki, to w terminalu byłem zalogowany jako zwykły użytkownik dodany do "sudoers", nic więcej.
Na pierwszy ogień oczywiście poszło poruszanie się po folderach.

Najczęściej używana przeze mnie na co dzień komenda to:
```bash
ls -la
```
do listowania obecnej zawartości katalogu, gdzie argument `l` oznacza formatowanie wyjściowej listy zawartości folderu "long listing" do wyświetlenia większej ilości szczegółów o każdym wpisie oraz `a` oznacza wylistowanie wszystkich danych, łącznie z wpisami ukrytymi.

Następnie komenda do zmiany aktualnego folderu roboczego:
```bash
cd /
cd ~
```
Pierwsze wywołanie `cd` powoduje przejście do głównego folderu danego systemu plików, zwanego "root" (nie mylić z folderem "/root"), zaś drugie wywołanie komendy powoduje powrót do folderu domowego dla danego użytkownika. `~` to zmienna środowiskowa, pod którą znajduje się automatycznie ustawiana przy starcie powłoki ścieżka zgodna ze wzorem: "/home/<nazwa-użytkownika>".

Potem prosta komenda do wyświetlenia aktywnego folderu roboczego:
```bash
pwd
```
Jeśli np. znajdowałem się w swoim folderze domowym, zgodnym ze zmienną `~`, to była to ścieżka "/home/user" i taki napis zwracała komenda.

Teraz trochę zarządzania plikami i folderami. Na pierwszy ogień w tych ćwiczeniach poszły pliki tekstowe.
Przykładowy skrypt:
```bash
mkdir hello
cd hello
touch hello.txt
echo "Hello bash!" > hello.txt
mkdir ok
cp hello.txt ok/hello.txt
touch ok/ok.txt
echo -e "Nade 1 4\nAlex 5 8" > ok/ok.txt
mv ok/ok.txt .
touch ups.txt
rm ups.txt
cat hello.txt ok.txt
```
No nie można powiedzieć o tym skrypcie, by robił coś pożytecznego 😆 Ale przedstawia całość podstawowych komend do pracy na plikach i folderach.
Co dokładnie się dzieje? Komenda po komendzie:

1. Tworzenie folderu "hello",
2. Wejście do folderu "hello",
3. Stworzenie pustego pliku "hello.txt",
4. Wpisanie do pliku "hello.txt" wartości: "Hello bash!",
5. Tworzenie folderu "ok",
6. Przekopiowanie pliku "hello.txt" do folderu "ok" pod taką samą nazwą,
7. Stworzenie pustego pliku "ok.txt" w podfolderze "ok",
8. Wpisanie do pliku "ok.txt" w podfolderze "ok" wartości: "Nade 1 4\nAlex 5 8" z uwzględnieniem znaków sterujących (argument `e`),
9. Przeniesienie pliku "ok.txt" z podfolderu "ok" do aktualnego folderu roboczego,
10. Stworzenie pustego pliku "ups.txt",
11. Usunięcie pliku "ups.txt",
12. Wyświetla połączoną (konkatenacja, stąd z angielskiego "cat") zawartość plików "hello.txt" oraz "ok.txt":
      Hello bash!
      Nade 1 4
      Alex 5 8

Uff... dużo się tu dzieje. Ale można to wykorzystać - struktura plików i folderów stworzona w ten sposób pozwoli na pracę z danymi poprzez komendy terminala.

Zatem najpierw idzie grep:
```bash
grep "Nade" ok.txt
```
Jest to przeszukiwanie zawartości danych wejściowych, w tym przypadku pliku "ok.txt", w poszukiwaniu frazy "Nade", komenda zwraca na wyjście wszystkie wystąpienia frazy z całością linii, w której się znajduje. Znalazło "Nade 1 4", podkreślając frazę zgodnie z ustawieniami terminala.

Potem find:
```bash
find . -name hello*
```
Komenda służy do szukania plików w folderach i podfolderach. Pierwszy argument, ta kropka użyta już w poprzednim skrypcie, to odwołanie do aktualnej ścieżki roboczej, zaś argument o nazwie "name" i wartości "hello*" to fraza wyszukiwania. Na końcu frazy jest tradycyjny tzw. wildcard, czyli po słowie "hello" dopuszczalny jest dowolny zestaw znaków.

Jeśli chodzi o te "strzałeczki" przy komendach echo do wpisywania danych do plików, to są to znaki sterowania potokiem. W ten sposób określa się, w którą stronę kieruje się dane, np. do pliku. Pojedynczy znak powoduje zapis w pliku z nadpisaniem istniejącej zawartości, podwojenie go powoduje dopisanie danych na końcu zbioru.

Teraz przyszła pora na manipulację danymi poprzez terminal. Zacząłem od komendy `tr` wspomagając się komendą `cat`.

```bash
cat hello.txt | tr -d "!"
```
Co tu się wydarzyło...? Otóż poleceniem `cat` nie tylko można łączyć wyjście z wielu plików, można je również odczytywać do standardowego wyjścia, tak jak to robi ta komenda. Ale dlaczego nie zakańcza ona pracy i nie wyświetla zawartości "hello.txt" w terminalu? Zastosowałem `cat`a w połączeniu z `tr` łącząc wykonanie tych komend. Efekt jest taki, że dane wyjściowe z `cat`a zostały od razu przekierowane do komendy `tr`, bez zakańczania wykonywania polecenia. To właśnie jest zasługa wspomnianego przeze mnie na początku posta pipe'a, pod postacią znaku `|`. Pozwala on tworzyć bufor danych pomiędzy dwoma niezależnymi od siebie punktami (tutaj uwaga: pipe może mieć również postać pliku) i przesyłać je na zasadach data streamu, czyli jeden punkt nadaje dane, a drugi słucha i odbiera. Sama komenda `tr`, po otrzymaniu danych z `cat`a dokonała usunięcia znaku "!", przy pomocy argumentu `d`, który usuwa wskazany w nim znak z danych wejściowych. Cała komenda zwróciła do terminala "Hello bash". I tutaj dzieje się magia! 😄 Bo czy moja komenda zmodyfikowała zawartość "hello.txt" i usunęła "!"? Nie. Można odczytać plik i zobaczyć, że tamtejszy tekst nadal ma "!" na końcu. Nie przekierowywałem danych z powrotem do pliku, jedynie pozwoliłem, by efekt komendy się wyświetlił w terminalu.

Można jeszcze pozmieniać kilka znaków, `tr` też to potrafi:
```bash
cat hello.txt | tr l a
cat hello.txt | tr l! a?
```
Pierwsza komenda zwraca "Heaao bash!", czyli odpowiednio poprzez pipe'a podmieniłem `tr`em wszystkie litery "l" na "a". Druga komenda zwraca "Heaao bash?", co prezentuje, że da się podmieniać litery w danych grupami, poprzez odpowiednie łączenie listy argumentów.

Po tym mocnym starcie, czas trochę uporządkować dane, więc przyda się komenda `cut`
```bash
cut -d " " -f 2,3 ok.txt
```
Zwracając dziwne "1 4" w jednej linii i "5 8" w drugiej. Co się dzieje? Komenda służy do filtrowania zestawu linii tekstu na podstawie podanych parametrów w taki sposób, by wyświetlić tylko odpowiadającą część. Tutaj zostanie wyświetlona zawartość pól z pliku "ok.txt", zgodnie z ostatnim argumentem, o numerach 2 oraz 3, zgodnie z argumentem `f`, które są rozdzielone znakiem spacji, według argumentu `d`.

Dodatkowo, sterowaniem zwracania danych ćwiczyłem używając komend `head` oraz `sort`.
```bash
cat ok.txt | head
cat ok.txt | head -n 1
```
Komenda `head` służy do zwracania górnej części danych wejściowych, np. pierwszych linii zestawu tekstu. Dlaczego pierwsza komenda zwróciła całość pliku "ok.txt"? Ponieważ domyślnie `head` zwraca 10 pierwszych części danych, a plik ma tylko dwie linie tekstu. Więc komenda zwróciła całość. Druga komenda zwraca tylko pierwszą linijkę, zgodnie z argumentem `n`.

A co jeśli chciałbym posortować dane w "ok.txt"?
```bash
sort ok.txt
```
Komenda służąca do sortowania danych, tak jak słówko z angielskiego. Domyślnie sortuje alfabetycznie.

To już będzie ostatnia część tego postu - zarządzanie procesami.
Kolejny mały skrypt:
```bash
echo "Hello bash!"
echo $?
nemo
ps -ef | grep nemo
```
Co się dzieje w tym skrypcie i jak go wykonać?

1. Zwykłe echo do terminala,
2. Wypisuje na ekran zmienną środowiskową, która zawiera automatycznie aktualizowaną wartość kodu błędu z ostatniego wykonanego w terminalu procesu. W tym przypadku zwraca zero, czyli wykonanie poprawne.
3. Uruchamia menadżera plików Nemo,
4. Wyszukuje w aktywnych procesach pozycję procesu Nemo,

Jak to możliwe, że po uruchomieniu programu Nemo, który "okupuje" wszystkie standardowe bufory danych terminala, można wykonać ostatnie polecenie ze skryptu? Za pomocą skrótu klawiszowego Ctrl+Z w bashu można dokonać "zawieszenia" procesu (z ang. "process suspend"), co odblokowuje linię komend terminala i pozwala dalej wykonywać polecenia. Przy pomocy komend `fg` i `bg`, które odpowiadają odpowiednio za zarządzanie procesami na "pierwszym planie" i w tle, można wznawiać takie zawieszone procesy wedle uznania.

Jednak komenda `ps` potrzebuje trochę więcej wyjaśnienia. Domyślnie komenda ta wyświetla listę aktywnych procesów dla danej sesji powłoki. Przy pomocy argumentu `e` może ona wyświetlić listę wszystkich procesów w systemie operacyjnym, zaś z argumentem `f` formatuje dane wyjściowe w pełnym wymiarze, łącznie z nagłówkami kolumn.

Na zakończenie pozostaje uśmiercenie procesu - komenda `kill`:
```bash
kill 2137
```
Celowo podałem tutaj "meme value", ponieważ głównym argumentem `kill`a jest PID (Process ID) danego programu w systemie operacyjnym. Ta wartość jest dynamicznie przydzielana przez system operacyjny w momencie uruchamiania procesu, więc dla każdego procesu na różnych maszynach będzie ona inna. Więc po to był `ps` w skrypcie, żeby znaleźć PID dla Nemo i zakończyć jego proces.

Jeszcze wspomnę o moich programach na co dzień. `ps` nie jest jakiś mega przyjemny do użytku "na szybko" więc: program `top` jest dużo wydajniejszy pod tym względem, bo posiada dynamiczny UI. `htop` jest jego ulepszoną wersją, a `nvtop` robi to samo co `htop` przy procesorze, tylko że dla karty graficznej.

Oj, trochę długi wyszedł ten post 😅 Ale jest tu już same techniczne mięso, wszystko jak ćwiczyłem te narzędzia w Bashu.
Myślę, że jeszcze post o SSH i można będzie domknąć pierwszy kamień milowy Linuxa z pierwotnego planu.
Inspiracją tematyczną do tych moich ćwiczeń były challenges na [pwn.collage](https://pwn.college/), nie jechałem dokładnie według tego, więc nie ma u mnie gotowych rozwiązań z ich flagami 😜 ale w kilku miejscach mnie nakierowali.
Jeśli chodzi o pozostałe, nie omówione w tym poście tematy, takie jak uprawnienia plików, faktyczne pisanie reużywalnych skrytpów, zarządzanie sesjami terminala, zarządzanie PATHem i innymi zmiennymi środowiskowymi, itp. to już trochę wykracza poza naukę samego CLI, więc raczej nie będzie tego na blogu, chyba że znajdzie się coś ciekawego do opublikowania w tej materii, ale tak to trzymam się dalej założeń z pierwotnego planu.

Do następnego!