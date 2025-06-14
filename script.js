// Logika gry JavaScript - ulepszona wersja dla łatwej edycji i rozszerzania

// --- Elementy DOM ---
const gameOutput = document.getElementById('game-output');
const startButton = document.getElementById('start-button');
const option1Button = document.getElementById('option1');
const option2Button = document.getElementById('option2');
const optionsContainer = document.querySelector('.options-container'); // Kontener przycisków

// --- Stan Gry ---
let currentStageId = 'intro'; // Początkowy identyfikator etapu
let playerChoices = {}; // Obiekt do przechowywania wyborów gracza, jeśli potrzebne do przyszłych zależności

// --- Dane Gry (można łatwo rozbudowywać) ---
const gameData = {
    // Etap początkowy - intro
    'intro': {
        text: `Witaj, dostojny Władysławie II Jagiełło!
Jesteś świadkiem narastającego konfliktu z Zakonem Krzyżackim. Twoje decyzje zadecydują o losach Królestwa Polskiego i Wielkiego Księstwa Litewskiego.
Przygotuj się na najważniejsze starcie w historii...`,
        options: [
            { text: "Rozpocznij Bitwę pod Grunwaldem", nextStage: 'battleStart' }
        ]
    },
    // Etap rozpoczęcia bitwy
    'battleStart': {
        text: `--- Bitwa pod Grunwaldem ---
Jest rok 1410. Napięcie między Polską i Litwą a Zakonem Krzyżackim osiągnęło punkt krytyczny.
Krzyżacy, pod pretekstem szerzenia chrześcijaństwa, od dawna najeżdżają ziemie polskie i litewskie, dążąc do dominacji w regionie.
Twoja armia, połączone siły polsko-litewskie, zbliża się do pozycji krzyżackich.
Musisz podjąć kluczowe decyzje taktyczne, które zaważą na wyniku bitwy.`,
        options: [
            { text: "Dalej...", nextStage: 'stage1' }
        ]
    },
    // Etap 1: Przed Bitwą
    'stage1': {
        text: `--- Etap 1: Przed Bitwą ---
Twoi zwiadowcy donoszą, że armia krzyżacka jest już w zasięgu wzroku. Jesteś na czele potężnej, choć zróżnicowanej armii.
Co robisz, aby przygotować wojsko?`,
        options: [
            { text: "1. Rozstawiasz wojska w tradycyjnym szyku.", choiceKey: "strategia", choiceValue: "tradycyjny", nextStage: 'stage1_info1' },
            { text: "2. Stosujesz podstęp, pozorując ucieczkę części wojsk.", choiceKey: "strategia", choiceValue: "podstep", nextStage: 'stage1_info2' }
        ]
    },
    // Informacja historyczna po wyborze 1 w etapie 1
    'stage1_info1': {
        text: `Wybrałeś tradycyjny szyk. Twoje wojska są gotowe do frontalnego starcia. Krzyżacy widzą całą potęgę Twojej armii.
Informacja historyczna: Wojska polsko-litewskie były liczniejsze, ale Krzyżacy mieli przewagę w ciężkiej kawalerii i artylerii. Jagiełło musiał być ostrożny.`,
        options: [
            { text: "Dalej...", nextStage: 'stage2_intro' }
        ]
    },
    // Informacja historyczna po wyborze 2 w etapie 1
    'stage1_info2': {
        text: `Zdecydowałeś się na podstęp! Część Twoich wojsk pozoruje odwrót, co ma sprowokować Krzyżaków do przedwczesnego ataku.
Informacja historyczna: Jest to nawiązanie do taktyki, która została rzekomo użyta pod Grunwaldem - pozorowanego odwrotu litewskiej lekkiej jazdy, która wciągnęła część sił krzyżackich.`,
        options: [
            { text: "Dalej...", nextStage: 'stage2_intro' }
        ]
    },
    // Wprowadzenie do etapu 2
    'stage2_intro': {
        text: `--- Etap 2: Rozpoczyna się Bitwa! ---
Grzmot dział i szczęk oręża wypełniają powietrze. Obie armie rzuciły się na siebie z furią.`,
        options: [
            { text: "Dalej...", nextStage: 'stage2_decision' }
        ]
    },
    // Etap 2: Decyzja w trakcie bitwy (zależy od strategii)
    'stage2_decision': {
        text: (choices) => { // Funkcja zwracająca tekst w zależności od poprzedniego wyboru
            if (choices.strategia === "tradycyjny") {
                return `Mimo Twojej potęgi, Krzyżacy stawiają zaciekły opór. Ich ciężka kawaleria uderza z niezwykłą siłą.
Co robisz teraz, aby przełamać ich obronę?`;
            } else { // podstep
                return `Twój podstęp zadziałał! Część wojsk krzyżackich ruszyła w pościg za uciekającymi, łamiąc swój szyk.
Teraz jest moment na decydujący cios. Co rozkazujesz?`;
            }
        },
        options: (choices) => { // Funkcja zwracająca opcje w zależności od poprzedniego wyboru
            if (choices.strategia === "tradycyjny") {
                return [
                    { text: "1. Wysyłasz posiłki na najgorętsze odcinki.", nextStage: 'ending_zacieta' },
                    { text: "2. Rozkazujesz chorągwiom litewskim flankować wroga.", nextStage: 'ending_flanka' }
                ];
            } else { // podstep
                return [
                    { text: "1. Atakujesz z całą siłą, wykorzystując rozerwanie szyków wroga.", nextStage: 'ending_atak' },
                    { text: "2. Czekasz na powrót Litwinów, aby uderzyć całością sił.", nextStage: 'ending_powrot' }
                ];
            }
        }
    },
    // --- Zakończenia ---
    'ending_zacieta': {
        text: `--- Zakończenie: Triumf pod Grunwaldem! ---
Bitwa dobiega końca. Kurz osiada, a na polu pozostają tysiące poległych.
Mimo heroicznego oporu Krzyżaków, Twoja determinacja i liczebność wojsk doprowadziły do ich klęski. To było krwawe, ale zwycięskie starcie!`,
        options: [
            { text: "Zobacz podsumowanie bitwy", nextStage: 'finalMessage' }
        ]
    },
    'ending_flanka': {
        text: `--- Zakończenie: Triumf pod Grunwaldem! ---
Bitwa dobiega końca. Kurz osiada, a na polu pozostają tysiące poległych.
Genialny manewr flankujący zdezorientował Krzyżaków, a Twoje wojska dokończyły dzieła zniszczenia. To było zwycięstwo taktyki!`,
        options: [
            { text: "Zobacz podsumowanie bitwy", nextStage: 'finalMessage' }
        ]
    },
    'ending_atak': {
        text: `--- Zakończenie: Triumf pod Grunwaldem! ---
Bitwa dobiega końca. Kurz osiada, a na polu pozostają tysiące poległych.
Wykorzystując zamieszanie w szeregach wroga, zadałeś decydujący cios. Szybka i brutalna akcja doprowadziła do rozgromienia Krzyżaków!`,
        options: [
            { text: "Zobacz podsumowanie bitwy", nextStage: 'finalMessage' }
        ]
    },
    'ending_powrot': {
        text: `--- Zakończenie: Triumf pod Grunwaldem! ---
Bitwa dobiega końca. Kurz osiada, a na polu pozostają tysiące poległych.
Twoja cierpliwość i zaufanie do sojuszników opłaciły się. Połączone siły zmiażdżyły wroga. To było zwycięstwo jedności!`,
        options: [
            { text: "Zobacz podsumowanie bitwy", nextStage: 'finalMessage' }
        ]
    },
    // Końcowa wiadomość i podsumowanie historyczne
    'finalMessage': {
        text: `*** Władysławie Jagiełło, odniosłeś wspaniałe zwycięstwo! ***
Bitwa pod Grunwaldem, stoczona 15 lipca 1410 roku, była jedną z największych bitew średniowiecznej Europy.
Zakończyła się druzgocącą klęską Zakonu Krzyżackiego, co znacząco osłabiło jego potęgę i zmieniło układ sił w Europie Środkowo-Wschodniej.
Zwycięstwo to było efektem doskonałego dowodzenia, liczebnej przewagi wojsk polsko-litewskich, ale także morale żołnierzy walczących za swoją ojczyznę.
Gratulacje, Królu! Zapiszesz się na kartach historii jako pogromca Krzyżaków!
Dziękuję za grę! Odśwież stronę, aby zagrać ponownie.`,
        options: [] // Brak opcji na końcu gry
    }
};

// --- Funkcje Gry ---

/**
 * Symuluje pisanie tekstu literka po literce w elemencie gameOutput.
 * @param {string} text - Tekst do wyświetlenia.
 * @param {number} delay - Opóźnienie między znakami w milisekundach.
 * @returns {Promise<void>} - Promise, który rozwiązuje się po zakończeniu pisania.
 */
function typeText(text, delay = 50) {
    let i = 0;
    gameOutput.textContent = '';
    return new Promise(resolve => {
        const interval = setInterval(() => {
            if (i < text.length) {
                gameOutput.textContent += text.charAt(i);
                gameOutput.scrollTop = gameOutput.scrollHeight;
                i++;
            } else {
                clearInterval(interval);
                resolve();
            }
        }, delay);
    });
}

/**
 * Wyświetla aktualny etap gry na podstawie gameData.
 */
async function displayStage() {
    const stage = gameData[currentStageId];
    if (!stage) {
        console.error("Nie znaleziono etapu o ID:", currentStageId);
        return;
    }

    // Określ tekst etapu (może być stringiem lub funkcją)
    const stageText = typeof stage.text === 'function' ? stage.text(playerChoices) : stage.text;
    await typeText(stageText);

    // Wyczyść stare opcje
    optionsContainer.innerHTML = '';

    // Określ opcje etapu (może być tablicą lub funkcją)
    const stageOptions = typeof stage.options === 'function' ? stage.options(playerChoices) : stage.options;

    // Utwórz przyciski dla nowych opcji
    if (stageOptions && stageOptions.length > 0) {
        stageOptions.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option.text;
            button.classList.add('game-option'); // Dodajemy klasę, żeby łatwo je ukryć/pokazać
            button.dataset.optionIndex = index; // Zapamiętujemy indeks opcji
            button.addEventListener('click', () => handleChoice(option));
            optionsContainer.appendChild(button);
        });
    } else {
        // Jeśli nie ma opcji, to koniec gry, można wyłączyć przyciski
        disableAllOptions();
    }
    showOptions();
}

/**
 * Obsługuje wybór gracza i przechodzi do następnego etapu.
 * @param {object} chosenOption - Wybrana opcja z obiektu gameData.
 */
async function handleChoice(chosenOption) {
    disableAllOptions(); // Wyłącz przyciski, aby zapobiec wielokrotnym kliknięciom

    // Zapisz wybór gracza (jeśli zdefiniowano w gameData)
    if (chosenOption.choiceKey && chosenOption.choiceValue) {
        playerChoices[chosenOption.choiceKey] = chosenOption.choiceValue;
    }

    await new Promise(r => setTimeout(r, 700)); // Krótka pauza po wyborze

    currentStageId = chosenOption.nextStage; // Ustaw następny etap
    displayStage(); // Wyświetl nowy etap
}

/**
 * Ukrywa przycisk start i pokazuje opcje (oprócz samego przycisku start)
 */
function showOptions() {
    startButton.classList.add('hidden'); // Ukryj przycisk start
    const optionButtons = document.querySelectorAll('.game-option');
    optionButtons.forEach(button => {
        button.classList.remove('hidden');
        button.disabled = false;
    });
}

/**
 * Ukrywa wszystkie przyciski opcji i dezaktywuje je.
 */
function disableAllOptions() {
    const optionButtons = document.querySelectorAll('.game-option');
    optionButtons.forEach(button => {
        button.disabled = true;
    });
    // Można też dodać ukrywanie, jeśli chcemy, aby zniknęły
    // setTimeout(() => {
    //     optionButtons.forEach(button => button.classList.add('hidden'));
    // }, 500);
}


// --- Inicjalizacja Gry ---

// Rozpocznij grę po kliknięciu przycisku start
startButton.addEventListener('click', () => {
    startButton.classList.add('hidden');
    displayStage(); // Wyświetl pierwszy etap (intro)
});

// W początkowym stanie ukryj przyciski opcji, dopóki gra się nie rozpocznie
document.addEventListener('DOMContentLoaded', () => {
    // Upewnij się, że przyciski opcji są ukryte na starcie
    option1Button.classList.add('hidden');
    option2Button.classList.add('hidden');
    option1Button.disabled = true;
    option2Button.disabled = true;

    // Przygotuj startowy przycisk, jeśli już go nie ma w HTML
    if (!startButton.parentElement.contains(startButton)) {
        optionsContainer.appendChild(startButton);
    }
});
