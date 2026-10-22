---
title: SSH
description: Co to SSH, podstawy działania i lokalne środowisko laboratoryjne
pubDate: 2026-10-22
tags:
  - cybersec
---

Przyszła pora na naukę podstaw łączności z zdalnymi serwerami - czas na SSH.

SSH (skrót od "Secure Shell") to standard opisujący protokół komunikacyjny do bezpiecznego łączenia się z systemami, do których dostęp odbywa się poprzez niebezpieczną sieć. To dość ogólna, streszczona przeze mnie i przetłumaczona na polski definicja oparta o zapis z abstrakta tego [RFC](https://www.rfc-editor.org/info/rfc4253/). Na potrzeby mojej nauki Cybersec, najważniejsze z mojej perspektywy są dwie funkcjonalności: łączenie się zdalnie do terminala na jakimś zewnętrznym serwerze oraz przekierowywanie przesyłu danych z portu sieciowego poprzez tunel ("SSH port forwarding").

W dzisiejszym wpisie zajmę się tym jak pracuję z SSH, jakie są metody autentykacji wobec serwera oraz jak wygląda moje ćwiczenie pracy z SSH, czyli jak postawiłem lokalne środowisko laboratoryjne.

Na początek doprecyzowanie - używam klienta OpenSSH, a serwer usługi SSH jest z pakietu od OpenBSD.

Po tym wstępie, zaczynając: łączenie się z serwerem.

Jakie są metody autentykacji do serwera? Dwie główne to logowanie hasłem ("password auth") oraz logowanie przy użyciu pliku klucza ("passkey auth"). Domyślnie, świeżo postawiony serwer SSH ma ustawione "password auth", lecz dobrą praktyką jest je wyłączyć i ustawić "passkey auth", czym zajmę się w kolejnej części wpisu.

Na czym pracuję poznając tajniki SSH?

Mam postawione na lokalnym systemie dwie maszyny wirtualne: jedną gotową, pobraną z oficjalnej dystrybucji, Kali Linuxa oraz drugą stawianą od zera z Debianem bez GUI. Pierwsza służy za klienta, druga za serwer. Obie maszyny stoją na QEMU i są zarządzane przez Virt Managera. Małe majsterkowanie dokonałem w połączeniach sieciowych tych maszyn - do pierwszej, domyślnej sieci wewnętrznej Virt Managera, która stoi na NATcie i służy do łączenia się maszyn z internetem, dodałem drugą, która jest skonfigurowana na bridged network, by maszyny na wzajem się widziały. By to wszystko razem działało, dodałem do każdej z maszyn dodatkową kartę sieciową dla bridged network. Dzięki tej konfiguracji mogę swobodnie sterować dostępami do sieci dla obydwóch maszyn razem, jak i osobno. Np. domyślnie internet jest odłączony na obu maszynach, poprzez wyłączenie ich wirtualnych kart sieciowych, ustawionych na sieć NAT, ale pozostawiając samą sieć NAT włączoną, gdybym potrzebował w jakimś momencie np. doinstalować jakiś pakiet do pracy, w każdej chwili mogę włączyć dostęp.

Tak to wygląda w działaniu:
[ssh-1.png](ssh-1.png)

Klient SSH jest domyślnie dostępny w Kalim, jak i innych dystrybucjach Linuxa, więc nie musiałem nic robić po stronie klienta. Po stronie serwera wystarczyło doinstalować paczkę: `sudo apt install openssh-server`, oraz uruchomić usługi sieciowe w systemd: `sudo systemctl enable ssh`, dzięki czemu serwer SSH będzie startował za każdym razem, kiedy uruchomię maszynę z Debianem.

Teraz przyszła pora na przetestowanie połączenia SSH. Łączę się standardową komendą na użytkownika "connector" po stronie maszyny z Debianem: `ssh connector@192.168.100.146`, SSH prosi mnie o zaakceptowanie przedstawionego fingerprinta klucza do połączenia się, następnie prosi o hasło do usera "connector" i gotowe, połączyłem się z maszyną z Debianem 😃

Skoro działa połączenie SSH z domyślnym "password auth", teraz nadszedł czas na skonfigurowanie "passkey auth" i wyłączenie "password auth".
W pierwszej kolejności, na maszynie z Kalim trzeba wygenerować klucze SSH: `ssh-keygen -t ed25519`, komenda generuje klucze z nowszym szyfrowaniem niż RSA. Potem wrzucenie tego klucza na serwer dla usera "connector": `ssh-copy-id connector@192.168.100.146`. Na koniec testuję połączenie: ponownie `ssh connector@192.168.100.146` i tym razem SSH nie poprosiło mnie o podanie hasła, od razu zalogowało mnie do terminala ☺️

Skoro wszystko gra i buczy, to na zakończenie pozostaje wyłączyć logowanie hasłem. Aby wyłączyć tę funkcjonalność na poziomie całej usługi ustawię wartość `PasswordAuthentication` na `no` w pliku konfiguracyjnym `/etc/ssh/sshd_config` oraz uruchomić ponownie usługę SSH: `sudo systemctl restart sshd`.

Test tego jest prosty, user "connector" nie jest jedynym użytkownikiem na maszynie z Debianem, jest jeszcze domyślny user "debian". Dla "connectora" został dodany klucz, zaś dla "debiana" nie, więc logując się bezpośrednio z poziomu maszyny z Kalim kolejno na "debiana", potem na "connectora", serwer zwróci błąd logowania, prosząc o zmianę metody logowania na "passkey" dla pierwszego usera, zaś przy drugim zaloguje się bez problemu.

A oto efekt finalny 😁
[ssh-2.png](ssh-2.png)

To by było na tyle w dzisiejszym wpisie. Nie wiem, czy będę jeszcze przerabiał "port forwarding" w SSH, na ten moment myślę, że nie. A nawet jeśli tak się zdarzy w przyszłości, to będzie to temat na pewno nadający się pod cały osobny wpis, więc czas pokaże. Co do hardeningu SSH i zabezpieczania dostępu do serwera, nie jest to celem mojej nauki, by umieć stawiać bezpieczną infrastrukturę sieciową samodzielnie, więc omijam na ten moment takie tematy, jak właśnie wspomniany hardening samego SSH, stawianie firewalla dla serwera czy reverse proxy do hostowania usług. Część z tego już umiem, część nie umiem, a inną część kojarzę. Na ten moment to wystarczy.

Następny post rozpocznie małą, nazwę ją "podserię" postów, w której będę dokumentował moje prace nad zadaniami z platformy [OverTheWire](https://overthewire.org/wargames/bandit/), gdzie wszystkie dotychczas nabyte moje umiejętności przejdą swego rodzaju test. Ma to przede wszystkim pokazać mi, gdzie mam jeszcze luki oraz co musiałbym jeszcze przećwiczyć.

Do następnego!

### Źródła

Przy pracy nad SSH użyłem następujących poradników:

- https://linuxconfig.org/linux-setup-ssh

- https://linuxconfig.org/how-to-secure-ssh

- https://linuxconfig.org/how-to-generate-and-manage-ssh-keys-on-linux

- https://linuxconfig.org/passwordless-ssh

- https://linuxconfig.org/most-common-custom-ssh-configurations-of-the-openssh-server