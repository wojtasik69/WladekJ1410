// Logika gry JavaScript dla gry tekstowej Bitwa pod Grunwaldem

const gameOutput = document.getElementById('game-output');
const startButton = document.getElementById('start-button');
const option1Button = document.getElementById('option1');
const option2Button = document.getElementById('option2');

let currentStage = 0;
let playerStrategy = ''; // Przechowuje wybór z etapu 1

// Obiekt przechowujący wszystkie teksty gry
const gameText = {
    intro: `Witaj, dostojny Władysławie II Jagiełło!
Jesteś świadkiem narastającego konfliktu z Zakonem Krzyżackim. Twoje decyzje zadecydują o losach Królestwa Polskiego i Wielkiego Księstwa Litewskiego.
Przygotuj się na najważniejsze starcie w historii...`,
    battleStart: `--- Bitwa pod Grunwaldem ---`,
    background: `Jest rok 1410. Napięcie między Polską i Litwą a Zakonem Krzyżackim osiągnęło punkt krytyczny.
Krzyżacy, pod pretekstem szerzenia chrześcijaństwa, od dawna najeżdżają ziemie polskie i litewskie, dążąc do dominacji w regionie.
Twoja armia, połączone siły polsko-litewskie, zbliża się do pozycji krzyżackich.
Musisz podjąć kluczowe decyzje taktyczne, które zaważą na wyniku bitwy.`,
    stage1: `--- Etap 1: Przed Bitwą ---
Twoi zwiadowcy donoszą, że armia krzyżacka jest już w zasięgu wzroku. Jesteś na czele potężnej, choć zróżnicowanej armii.
Co robisz, aby przygotować wojsko?`,
    stage1Option1: `Wybrałeś tradycyjny szyk. Twoje wojska są gotowe do frontalnego starcia. Krzyżacy widzą całą potęgę Twojej armii.
Informacja historyczna: Wojska polsko-litewskie były liczniejsze, ale Krzyżacy mieli przewagę w ciężkiej kawalerii i artylerii. Jagiełło musiał być ostrożny.`,
    stage1Option2: `Zdecydowałeś się na podstęp! Część Twoich wojsk pozoruje odwrót, co ma sprowokować Krzyżaków do przedwczesnego ataku.
Informacja historyczna: Jest to nawiązanie do taktyki, która została rzekomo użyta pod Grunwaldem - pozorowanego odwrotu litewskiej lekkiej jazdy, która wciągnęła część sił krzyżackich.`,
    stage2Intro: `--- Etap 2: Rozpoczyna się Bitwa! ---
Grzmot dział i szczęk oręża wypełniają powietrze. Obie armie rzuciły się na siebie z furią.`,
    stage2TradOpt1: `Mimo Twojej potęgi, Krzyżacy stawiają zaciekły opór. Ich ciężka kawaleria uderza z niezwykłą siłą.
Co robisz teraz, aby przełamać ich obronę?`,
    stage2TradOpt1Choice1: `Twoje posiłki wzmacniają linię. Bitwa staje się krwawa, ale udaje Ci się utrzymać pozycje.
Informacja historyczna: Bitwa pod Grunwaldem była niezwykle zacięta i trwała wiele godzin. Obie strony poniosły ciężkie straty.`,
    stage2TradOpt1Choice2: `Manewr flankujący chorągwi litewskich przynosi efekt! Krzyżacy są zaskoczeni i zmuszeni do przegrupowania.
Informacja historyczna: Manewry wojsk litewskich, choć początkowo chaotyczne, odegrały ważną rolę w dezorientacji Krzyżaków.`,
    stage2TrickOpt1: `Twój podstęp zadziałał! Część wojsk krzyżackich ruszyła w pościg za uciekającymi, łamiąc swój szyk.
Teraz jest moment na decydujący cios. Co rozkazujesz?`,
    stage2TrickOpt1Choice1: `Wykorzystujesz okazję! Twoje wojska uderzają w rozproszone siły krzyżackie, siejąc zamęt w ich szeregach.
Informacja historyczna: Moment chaosu i dezorganizacji w szeregach krzyżackich był kluczowy dla zwycięstwa.`,
    stage2TrickOpt1Choice2: `Czekasz na powrót Litwinów. To ryzykowna decyzja, ale gdy powracają, wasza połączona siła jest miażdżąca.
Informacja historyczna: Choć niektóre oddziały litewskie faktycznie opuściły pole bitwy, inne wróciły, by dołączyć do walki, co było istotne dla ostatecznego rezultatu.`,
    endingGeneral: `--- Zakończenie: Triumf pod Grunwaldem! ---
Bitwa dobiega końca. Kurz osiada, a na polu pozostają tysiące poległych.`,
    endingZacieta: `Mimo heroicznego oporu Krzyżaków, Twoja determinacja i liczebność wojsk doprowadziły do ich klęski. To było krwawe, ale zwycięskie starcie!`,
    endingFlanka: `Genialny manewr flankujący zdezorientował Krzyżaków, a Twoje wojska dokończyły dzieła zniszczenia. To było zwycięstwo taktyki!`,
    endingAtak: `Wykorzystując zamieszanie w szeregach wroga, zadałeś decydujący cios. Szybka i brutalna akcja doprowadziła do rozgromienia Krzyżaków!`,
    endingPowrot: `Twoja cierpliwość i zaufanie do sojuszników opłaciły się. Połączone siły zmiażdżyły wroga. To było zwycięstwo jedności!`,
    finalMessage: `*** Władysławie Jagiełło, odniosłeś wspaniałe zwycięstwo! ***
Bitwa pod Grunwaldem, stoczona 15 lipca 1410 roku, była jedną z największych bitew średniowiecznej Europy.
Zakończyła się druzgocącą klęską Zakonu Krzyżackiego, co znacząco osłabiło jego potęgę i zmieniło układ sił w Europie Środkowo-Wschodniej.
Zwycięstwo to było efektem doskonałego dowodzenia, liczebnej przewagi wojsk polsko-litewskich, ale także morale żołnierzy walczących za swoją ojczyznę.
Gratulacje, Królu! Zapiszesz się na kartach historii jako pogromca Krzyżaków!
Dziękuję za grę! Odśwież stronę, aby zagrać ponownie.`
};

// Funkcja symulująca pisanie tekstu literka po literce
function typeText(text, delay = 50) {
    let i = 0;
    gameOutput.textContent = ''; // Wyczyść poprzedni tekst przed rozpoczęciem pisania
    return new Promise(resolve => {
        const interval = setInterval(() => {
            if (i < text.length) {
                gameOutput.textContent += text.charAt(i);
                gameOutput.scrollTop = gameOutput.scrollHeight; // Przewiń na dół, jeśli tekst wykracza poza widok
                i++;
            } else {
                clearInterval(interval);
                resolve(); // Rozwiąż Promise po zakończeniu pisania
            }
        }, delay);
    });
}

// Główna funkcja rozpoczynająca grę
async function startGame() {
    startButton.classList.add('hidden'); // Ukryj przycisk Start
    await typeText(gameText.intro);
    await new Promise(r => setTimeout(r, 1000)); // Czekaj 1 sekundę
    await typeText(gameText.battleStart);
    await new Promise(r => setTimeout(r, 1000));
    await typeText(gameText.background);
    await new Promise(r => setTimeout(r, 1000));
    showStage1();
}

// Wyświetlenie etapu 1 gry i opcji wyboru
async function showStage1() {
    await typeText(gameText.stage1);
    option1Button.textContent = "1. Rozstawiasz wojska w tradycyjnym szyku.";
    option2Button.textContent = "2. Stosujesz podstęp, pozorując ucieczkę.";
    showOptions(); // Pokaż przyciski wyboru
    currentStage = 1; // Ustaw bieżący etap
}

// Obsługa wyboru gracza w etapie 1
async function handleStage1Choice(choice) {
    hideOptions(); // Ukryj przyciski
    if (choice === 1) {
        playerStrategy = "tradycyjny";
        await typeText(gameText.stage1Option1);
    } else {
        playerStrategy = "podstep";
        await typeText(gameText.stage1Option2);
    }
    await new Promise(r => setTimeout(r, 1000));
    showStage2(); // Przejdź do etapu 2
}

// Wyświetlenie etapu 2 gry i opcji wyboru (zależnych od poprzedniego wyboru)
async function showStage2() {
    await typeText(gameText.stage2Intro);
    if (playerStrategy === "tradycyjny") {
        await typeText(gameText.stage2TradOpt1);
        option1Button.textContent = "1. Wysyłasz posiłki na najgorętsze odcinki.";
        option2Button.textContent = "2. Rozkazujesz Litwinom flankować wroga.";
    } else { // podstep
        await typeText(gameText.stage2TrickOpt1);
        option1Button.textContent = "1. Atakujesz z całą siłą.";
        option2Button.textContent = "2. Czekasz na powrót Litwinów.";
    }
    showOptions();
    currentStage = 2;
}

// Obsługa wyboru gracza w etapie 2
async function handleStage2Choice(choice) {
    hideOptions();
    let endingScenario = ''; // Zmienna do określenia scenariusza zakończenia
    if (playerStrategy === "tradycyjny") {
        if (choice === 1) {
            await typeText(gameText.stage2TradOpt1Choice1);
            endingScenario = "zacieta";
        } else {
            await typeText(gameText.stage2TradOpt1Choice2);
            endingScenario = "flanka";
        }
    } else { // podstep
        if (choice === 1) {
            await typeText(gameText.stage2TrickOpt1Choice1);
            endingScenario = "atak";
        } else {
            await typeText(gameText.stage2TrickOpt1Choice2);
            endingScenario = "powrot";
        }
    }
    await new Promise(r => setTimeout(r, 1000));
    showEnding(endingScenario); // Pokaż zakończenie
}

// Wyświetlenie zakończenia gry i podsumowania
async function showEnding(scenario) {
    await typeText(gameText.endingGeneral);
    if (scenario === "zacieta") {
        await typeText(gameText.endingZacieta);
    } else if (scenario === "flanka") {
        await typeText(gameText.endingFlanka);
    } else if (scenario === "atak") {
        await typeText(gameText.endingAtak);
    } else { // powrot
        await typeText(gameText.endingPowrot);
    }
    await new Promise(r => setTimeout(r, 1000));
    await typeText(gameText.finalMessage);
    // Wyłącz przyciski po zakończeniu gry
    option1Button.disabled = true;
    option2Button.disabled = true;
}

// Funkcje pomocnicze do pokazywania/ukrywania opcji
function showOptions() {
    option1Button.classList.remove('hidden');
    option2Button.classList.remove('hidden');
    option1Button.disabled = false;
    option2Button.disabled = false;
}

function hideOptions() {
    option1Button.classList.add('hidden');
    option2Button.classList.add('hidden');
    option1Button.disabled = true;
    option2Button.disabled = true;
}

// Event Listenery (nasłuchiwacze zdarzeń)
// Rozpoczęcie gry po kliknięciu przycisku Start
startButton.addEventListener('click', startGame);

// Obsługa kliknięć przycisków opcji (w zależności od bieżącego etapu)
option1Button.addEventListener('click', () => {
    if (currentStage === 1) {
        handleStage1Choice(1);
    } else if (currentStage === 2) {
        handleStage2Choice(1);
    }
});

option2Button.addEventListener('click', () => {
    if (currentStage === 1) {
        handleStage1Choice(2);
    } else if (currentStage === 2) {
        handleStage2Choice(2);
    }
});
