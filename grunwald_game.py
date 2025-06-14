import time
import sys

def typ_slowa(tekst, opoznienie=0.03):
    """Symuluje pisanie tekstu literka po literce."""
    for znak in tekst:
        sys.stdout.write(znak)
        sys.stdout.flush()
        time.sleep(opoznienie)
    print()

def start_gry():
    """Funkcja rozpoczynająca grę."""
    typ_slowa("Witaj, dostojny Władysławie II Jagiełło!")
    typ_slowa("Jesteś świadkiem narastającego konfliktu z Zakonem Krzyżackim. Twoje decyzje zadecydują o losach Królestwa Polskiego i Wielkiego Księstwa Litewskiego.")
    typ_slowa("Przygotuj się na najważniejsze starcie w historii...")
    time.sleep(1)
    typ_slowa("\n--- Bitwa pod Grunwaldem ---")
    time.sleep(1)

def wprowadzenie():
    """Wprowadzenie do tła historycznego."""
    typ_slowa("\nJest rok 1410. Napięcie między Polską i Litwą a Zakonem Krzyżackim osiągnęło punkt krytyczny.")
    typ_slowa("Krzyżacy, pod pretekstem szerzenia chrześcijaństwa, od dawna najeżdżają ziemie polskie i litewskie, dążąc do dominacji w regionie.")
    typ_slowa("Twoja armia, połączone siły polsko-litewskie, zbliża się do pozycji krzyżackich.")
    typ_slowa("Musisz podjąć kluczowe decyzje taktyczne, które zaważą na wyniku bitwy.")

def etap_pierwszy():
    """Pierwszy etap gry - wybory taktyczne."""
    typ_slowa("\n--- Etap 1: Przed Bitwą ---")
    typ_slowa("Twoi zwiadowcy donoszą, że armia krzyżacka jest już w zasięgu wzroku. Jesteś na czele potężnej, choć zróżnicowanej armii.")
    typ_slowa("Co robisz, aby przygotować wojsko?")
    typ_slowa("1. Rozstawiasz wojska w tradycyjnym szyku, licząc na siłę uderzenia.")
    typ_slowa("2. Stosujesz podstęp, pozorując ucieczkę części wojsk, aby sprowokować Krzyżaków do ataku.")

    wybor = input("Wybierz 1 lub 2: ")
    while wybor not in ['1', '2']:
        typ_slowa("Nieprawidłowy wybór. Spróbuj ponownie.")
        wybor = input("Wybierz 1 lub 2: ")

    if wybor == '1':
        typ_slowa("\nWybrałeś tradycyjny szyk. Twoje wojska są gotowe do frontalnego starcia. Krzyżacy widzą całą potęgę Twojej armii.")
        typ_slowa("Informacja historyczna: Wojska polsko-litewskie były liczniejsze, ale Krzyżacy mieli przewagę w ciężkiej kawalerii i artylerii. Jagiełło musiał być ostrożny.")
        return "tradycyjny"
    else:
        typ_slowa("\nZdecydowałeś się na podstęp! Część Twoich wojsk pozoruje odwrót, co ma sprowokować Krzyżaków do przedwczesnego ataku.")
        typ_slowa("Informacja historyczna: Jest to nawiązanie do taktyki, która została rzekomo użyta pod Grunwaldem - pozorowanego odwrotu litewskiej lekkiej jazdy, która wciągnęła część sił krzyżackich.")
        return "podstep"

def etap_drugi(strategia):
    """Drugi etap gry - przebieg bitwy."""
    typ_slowa("\n--- Etap 2: Rozpoczyna się Bitwa! ---")
    typ_slowa("Grzmot dział i szczęk oręża wypełniają powietrze. Obie armie rzuciły się na siebie z furią.")

    if strategia == "tradycyjny":
        typ_slowa("Mimo Twojej potęgi, Krzyżacy stawiają zaciekły opór. Ich ciężka kawaleria uderza z niezwykłą siłą.")
        typ_slowa("Co robisz teraz, aby przełamać ich obronę?")
        typ_slowa("1. Wysyłasz posiłki na najgorętsze odcinki, wzmacniając obronę.")
        typ_slowa("2. Rozkazujesz chorągwiom litewskim flankować wroga, szukając słabego punktu.")
        wybor = input("Wybierz 1 lub 2: ")
        while wybor not in ['1', '2']:
            typ_slowa("Nieprawidłowy wybór. Spróbuj ponownie.")
            wybor = input("Wybierz 1 lub 2: ")
        if wybor == '1':
            typ_slowa("\nTwoje posiłki wzmacniają linię. Bitwa staje się krwawa, ale udaje Ci się utrzymać pozycje.")
            typ_slowa("Informacja historyczna: Bitwa pod Grunwaldem była niezwykle zacięta i trwała wiele godzin. Obie strony poniosły ciężkie straty.")
            return "zacieta"
        else:
            typ_slowa("\nManewr flankujący chorągwi litewskich przynosi efekt! Krzyżacy są zaskoczeni i zmuszeni do przegrupowania.")
            typ_slowa("Informacja historyczna: Manewry wojsk litewskich, choć początkowo chaotyczne, odegrały ważną rolę w dezorientacji Krzyżaków.")
            return "flanka"
    else: # strategia == "podstep"
        typ_slowa("Twój podstęp zadziałał! Część wojsk krzyżackich ruszyła w pościg za uciekającymi, łamiąc swój szyk.")
        typ_slowa("Teraz jest moment na decydujący cios. Co rozkazujesz?")
        typ_slowa("1. Atakujesz z całą siłą, wykorzystując rozerwanie szyków wroga.")
        typ_slowa("2. Czekasz na powrót Litwinów, aby uderzyć całością sił.")
        wybor = input("Wybierz 1 lub 2: ")
        while wybor not in ['1', '2']:
            typ_slowa("Nieprawidłowy wybór. Spróbuj ponownie.")
            wybor = input("Wybierz 1 lub 2: ")
        if wybor == '1':
            typ_slowa("\nWykorzystujesz okazję! Twoje wojska uderzają w rozproszone siły krzyżackie, siejąc zamęt w ich szeregach.")
            typ_slowa("Informacja historyczna: Moment chaosu i dezorganizacji w szeregach krzyżackich był kluczowy dla zwycięstwa.")
            return "atak"
        else:
            typ_slowa("\nCzekasz na powrót Litwinów. To ryzykowna decyzja, ale gdy powracają, wasza połączona siła jest miażdżąca.")
            typ_slowa("Informacja historyczna: Choć niektóre oddziały litewskie faktycznie opuściły pole bitwy, inne wróciły, by dołączyć do walki, co było istotne dla ostatecznego rezultatu.")
            return "powrot"

def zakonczenie(wynik_etapu_drugiego):
    """Zakończenie gry i podsumowanie bitwy."""
    typ_slowa("\n--- Zakończenie: Triumf pod Grunwaldem! ---")
    typ_slowa("Bitwa dobiega końca. Kurz osiada, a na polu pozostają tysiące poległych.")

    if wynik_etapu_drugiego == "zacieta":
        typ_slowa("Mimo heroicznego oporu Krzyżaków, Twoja determinacja i liczebność wojsk doprowadziły do ich klęski. To było krwawe, ale zwycięskie starcie!")
    elif wynik_etapu_drugiego == "flanka":
        typ_slowa("Genialny manewr flankujący zdezorientował Krzyżaków, a Twoje wojska dokończyły dzieła zniszczenia. To było zwycięstwo taktyki!")
    elif wynik_etapu_drugiego == "atak":
        typ_slowa("Wykorzystując zamieszanie w szeregach wroga, zadałeś decydujący cios. Szybka i brutalna akcja doprowadziła do rozgromienia Krzyżaków!")
    else: # wynik_etapu_drugiego == "powrot"
        typ_slowa("Twoja cierpliwość i zaufanie do sojuszników opłaciły się. Połączone siły zmiażdżyły wroga. To było zwycięstwo jedności!")

    typ_slowa("\n*** Władysławie Jagiełło, odniosłeś wspaniałe zwycięstwo! ***")
    typ_slowa("Bitwa pod Grunwaldem, stoczona 15 lipca 1410 roku, była jedną z największych bitew średniowiecznej Europy.")
    typ_slowa("Zakończyła się druzgocącą klęską Zakonu Krzyżackiego, co znacząco osłabiło jego potęgę i zmieniło układ sił w Europie Środkowo-Wschodniej.")
    typ_slowa("Zwycięstwo to było efektem doskonałego dowodzenia, liczebnej przewagi wojsk polsko-litewskich, ale także morale żołnierzy walczących za swoją ojczyznę.")
    typ_slowa("Gratulacje, Królu! Zapiszesz się na kartach historii jako pogromca Krzyżaków!")

def gra_grunwald():
    """Główna funkcja uruchamiająca całą grę."""
    start_gry()
    wprowadzenie()
    strategia_poczatkowa = etap_pierwszy()
    wynik_bitwy = etap_drugi(strategia_poczatkowa)
    zakonczenie(wynik_bitwy)

# Uruchomienie gry
if __name__ == "__main__":
    gra_grunwald()
    typ_slowa("\nDziękuję za grę! Jeśli chcesz zagrać ponownie, uruchom program jeszcze raz.")
