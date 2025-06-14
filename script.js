// Logika gry JavaScript - ulepszona wersja dla łatwej edycji i rozszerzania

// --- Elementy DOM ---
const gameOutput = document.getElementById('game-output');
const optionsContainer = document.querySelector('.options-container');

// --- Stan Gry ---
let currentStageId = 'intro'; // Początkowy identyfikator etapu
let playerChoices = {}; // Obiekt do przechowywania wyborów gracza

// --- Dane Gry (można łatwo rozbudowywać) ---
const gameData = {
    // Etap początkowy - intro
    'intro': {
        text: `
        Nazywasz się Władysław II Jagiełło, król Polski, najwyższy książę litewski!
        Przed tobą stoi niezwykle trudne zadanie pokonania Zakonu Krzyżackiego w bitwie, 
        która będzie znana jako słynna "Bitwa pod Grunwaldem".

        Jest lipiec 1410 roku. Napięcie osiągnęło punkt kulminacyjny. Krzyżacy, czując się silni
        i pewni swego, zwołali rycerstwo z całej Europy Zachodniej na "krucjatę" przeciwko tobie
        i twojemu zjednoczonemu królestwu.

        Pomimo że zawarłeś Unię z Litwą, a później Unię Horodelską, jednocząc oba państwa
        i przyjmując chrzest, nie osłabiło to argumentów Krzyżaków o „pogańskiej” Litwie.
        Jedynie zaogniło ich gniew. Ich cel jest jasny: zniszczyć twoje królestwo
        i przejąć kontrolę nad strategicznymi szlakami handlowymi i ziemiami.

        Naprzeciwko ciebie, na polach pod Grunwaldem, stoi wojsko Zakonu – ciężkozbrojni rycerze,
        wspierani przez zaciężnych z całej Europy. W powietrzu czuć zapach nadchodzącej bitwy.
        Losy twojego królestwa i całej Europy zależą od twoich decyzji. 
        Jesteś gotowy zmierzyć się z tym wyzwaniem?`,
        options: [
            { text: "Dalej", nextStage: 'start_game' } // Usunięto 'feedback: "neutral"'
        ]
    },
    // Rozpoczęcie gry i tło historyczne
    'start_game': {
        text: `
        Budzisz się w swoim namiocie. Ze snu wytrącił cię hałas na zewnątrz.
        Do twojego obozu przybyli dwaj heroldowie od Wielkiego Mistrza Zakonu Krzyżackiego, 
        Ulricha von Jungingena.

        Mają czelność twierdzić, że z tchórzostwa próbujesz odłożyć bitwę w czasie.
        To nieprawda! Odciągasz ją, aby słońce smażyło Krzyżaków, podczas gdy ty i twoi żołnierze
        odpoczywacie w cieniu lasu.

        Krzyżacy na pewno o tym wiedzą i chcą cię sprowokować do nieprzemyślanego ataku!`,
        options: [
            { text: "Dalej", nextStage: 'stage1' } // Usunięto 'feedback: "neutral"'
        ]
    },
    // Etap 1: Przed Bitwą (Decyzje strategiczne) - Pytanie o heroldów
    'stage1': {
        text: `
        Już miałeś wrócić do namiotu, gdy dwójka heroldów wręczyła ci dwa nagie miecze.
        Zupełnie jakbyś nie miał swoich! Ta arogancja wymaga zdecydowanej odpowiedzi.

        Co zamierzasz odpowiedzieć?`,
        options: [
            { text: "Zachowaj spokój: `Chociaż posiadam mieczy pod dostatkiem, to jednak przyjmuję te, które wy mi przysłaliście`", feedback: "good", nextStage: 'stage1_info_good' },
            { text: "Zaoferuj wpuszczenie Krzyżaków do lasu: `Sprawiedliwiej będzie, jeżeli odpoczniecie w lesie, my zaś wyjdziemy na słońce.`", feedback: "bad", nextStage: 'stage1' },
            { text: "Pozbaw heroldów głów nowo otrzymanymi mieczami: `W rzeczy samej, przydatny przynieśliście podarunek!`", feedback: "bad", nextStage: 'stage1' }
        ]
    },
    // Informacja po Dobrej Odpowiedzi w Etapie 1
    'stage1_info_good': {
        text: `
        Zachowałeś spokój i godność, nie dając się sprowokować arogancji Krzyżaków.
        Teraz jednak nadszedł czas, by podnieść morale twoich wojsk przed nadchodzącym starciem.`,
        options: [
            { text: "Dalej", nextStage: 'stage1_5_bogurodzica' } // Usunięto 'feedback: "neutral"'
        ]
    },

    // Etap 1.5: Bogurodzica
    'stage1_5_bogurodzica': {
        text: `
        Napięcie rośnie z każdą chwilą. Patrzysz na swoje wojska – tysiące serc bijących
        w oczekiwaniu na bitwę. Zanim poprowadzisz ich do walki, musisz tchnąć w nich ducha jedności,
        wiary i odwagi.

        Potrzebujesz czegoś, co poruszy ich dusze, zjednoczy pod wspólnym sztandarem i sprawi,
        że zapomną o strachu. Co najlepiej podniesie na duchu rycerzy polskich, litewskich,
        tatarskich i ruskich, stając się symbolem waszej wspólnej siły?`,
        options: [
            { text: "Bogurodzica, najstarszy zachowany polski tekst poetycki i pieśń religijna", feedback: "good", nextStage: 'stage1_5_info_good' },
            { text: "„Etiuda rewolucyjna” (Op. 10 nr 12), „Scherzo b-moll” napisane przez Fryderyka Chopina", feedback: "bad", nextStage: 'stage1_5_bogurodzica' },
            { text: "Przez twe oczy zielone, utwór zespołu Akcent w wykonaniu Zenona Martyniuka", feedback: "bad", nextStage: 'stage1_5_bogurodzica' }
        ]
    },
    // Informacja po Dobrej Odpowiedzi w Etapie 1.5
    'stage1_5_info_good': {
        text: `
        To była doskonała decyzja! Pieśń rozbrzmiała nad polami Grunwaldu,
        na zawsze zapisując się na kartach historii i podręcznikach języka polskiego.

        Jej dźwięk przeniknął serca rycerzy, budząc w nich głębokie poczucie jedności
        i wspólnego celu. Dla Krzyżaków natomiast, "Bogurodzica" stała się
        zwiastunem nadchodzącej klęski. Twoi rycerze ruszyli do ataku!`,
        options: [
            { text: "Dalej", nextStage: 'stage2_battle' } // Usunięto 'feedback: "neutral"'
        ]
    },

    // Etap 2: W trakcie bitwy (Decyzje taktyczne - właściwa bitwa)
    'stage2_battle': {
        text: `
        Bitwa rozpoczęła się z impetem! Prawe skrzydło, dowodzone przez Księcia Witolda,
        ruszyło jako pierwsze. Szarża litewsko-ruskich chorągwi uderzyła w krzyżackie szeregi.
        Artyleria Zakonu, spiesznie ustawiona, zdołała oddać zaledwie dwie salwy,
        które zatonęły w impetach naszych wojsk. Zacięta walka rozgorzała na dobre.

        Po około godzinie krwawego starcia, sytuacja na prawym skrzydle stała się napięta.
        Potężna, ciężka jazda krzyżacka zaczęła zyskiwać przewagę nad wojskami litewskimi.
        Z przerażeniem patrzysz, jak chorągwie Księcia Witolda chwieją się,
        a następnie zaczynają cofać! Widzisz, jak część sił krzyżackich rzuca się
        w szaleńczą pogoń za pozornie uciekającymi oddziałami.

        To jest moment krytyczny, Królu Władysławie. Cała uwaga Krzyżaków skupiła się na prawym skrzydle.
        Ale co z resztą twoich wojsk? Musisz podjąć decyzję, która ochroni cię przed klęską
        i wykorzysta zamieszanie w szeregach wroga. Co zrobisz w tej sytuacji?`,
        options: [
            { text: "Zarządź pozorowany odwrót prawego skrzydła", feedback: "good", nextStage: 'stage2_info_good' },
            { text: "Samodzielnie, na czele osobistej straży wyrusz bohatersko ratować sytuację.", feedback: "bad", nextStage: 'stage2_battle' },
            { text: "Odpuść bitwę i sam wycofaj się do lasu.", feedback: "bad", nextStage: 'stage2_battle' }
        ]
    },
    // Informacja po Dobrej Odpowiedzi w Etapie 2
    'stage2_info_good': {
        text: `
        Twoja strategiczna intuicja okazała się trafna. Widzisz, jak wojska krzyżackie,
        zwiedzione pozornym odwrotem Litwinów, rzucają się w chaotyczny pościg.

        Ich szeregi rozciągają się, a duma zaślepia ich tak, że nie dostrzegają pułapki.
        To właśnie na to czekałeś!`,
        options: [
            { text: "Dalej", nextStage: 'stage3' } // Usunięto 'feedback: "neutral"'
        ]
    },
    // Etap 3: Decydujące uderzenie
    'stage3': {
        text: `
        Bitwa weszła w decydującą fazę. Widzisz, jak Wielki Mistrz Ulrich von Jungingen
        rzuca do boju swój ostatni atut – odwody 16 chorągwi. Atak ten uderza w centrum
        twoich wojsk oraz w lewe skrzydło. Twoi rycerze walczą bohatersko, ale napór jest olbrzymi.
        Musisz działać, aby przechylić szalę zwycięstwa!

        Na szczęście, w zanadrzu masz odwody polskiej jazdy, które czekają na twój rozkaz.
        Mogą one umożliwić zdecydowany atak lekkiej jeździe ukrytej w zaroślach
        i gotowej do decydującego uderzenia.

        Co zrobisz, aby rozerwać zasadniczy korpus sił krzyżackich i przypieczętować ich klęskę?`,
        options: [
            { text: "Rozkaż odwodom rozproszenie krzyżaków i umożliwienie ataku lekkiej jeździe", feedback: "good", nextStage: 'ending_victory' },
            { text: "Rozkaż odwodom ukrycie się wraz z jazdą aby krzyżacy ich nie znaleźli", feedback: "bad", nextStage: 'stage3' },
            { text: "Również ukryj się w zaroślach i udawaj, że należysz do lekkiej jazdy, aby krzyżacy cię nie znaleźli", feedback: "bad", nextStage: 'stage3' }
        ]
    },
    // Zakończenie: Zwycięstwo
    'ending_victory': {
        text: `
        Powietrze drży od okrzyków triumfu, Królu Władysławie! Twoja decyzja
        o wprowadzeniu odwodów okazała się strzałem w dziesiątkę.

        Widzisz, jak twoje wojska, niczym potężna fala, zalały ostatnie punkty oporu Krzyżaków.
        Ich elitarne chorągwie, które miały przesądzić o ich zwycięstwie,
        zostały rozerwane na strzępy. Lekka jazda, ukryta w zaroślach, uderzyła
        w sam środek ich rozproszonych szeregów, przypieczętowując ich klęskę.

        Pole bitwy pod Grunwaldem stało się świadkiem druzgocącej porażki Zakonu Krzyżackiego.
        Ich duma, arogancja i niekwestionowana dotąd potęga militarna zostały złamane.
        Widzisz uciekających rycerzy zakonnych, ściganych przez twoich wojowników.
        Sam Wielki Mistrz, Ulrich von Jungingen, poległ w trakcie bitwy,
        co symbolizuje ostateczny upadek ich potęgi.

        To jest twoje zwycięstwo, Królu! Zwycięstwo, które zmieni bieg historii
        i zapewni chwałę tobie i twojemu Królestwu!`,
        options: [] // Koniec gry, brak dalszych opcji
    },
    // Komunikat o złej odpowiedzi
    'bad_answer_feedback': {
        text: `
        Niestety, ta odpowiedź nie zapewni ci długiego panowania. Spróbuj ponownie!`,
        options: [
            { text: "Powróć do pytania", feedback: "neutral", nextStage: null } // nextStage będzie ustawiony dynamicznie
        ]
    }
};

// --- Funkcje Gry ---

/**
 * Symuluje pisanie tekstu literka po literce w elemencie gameOutput.
 * @param {string} text - Tekst do wyświetlenia.
 * @param {number} delay - Opóźnienie między znakami w milisekundach.
 * @returns {Promise<void>} - Promise, który rozwiązuje się po zakończeniu pisania.
 */
function typeText(text, delay = 30) {
    let i = 0;
    gameOutput.innerHTML = '';
    return new Promise(resolve => {
        const interval = setInterval(() => {
            if (i < text.length) {
                gameOutput.innerHTML += text.charAt(i);
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

    const stageText = typeof stage.text === 'function' ? stage.text(playerChoices) : stage.text;
    await typeText(stageText);

    // Wyczyść stare opcje
    optionsContainer.innerHTML = '';

    const stageOptions = typeof stage.options === 'function' ? stage.options(playerChoices) : stage.options;

    // Utwórz przyciski dla nowych opcji
    if (stageOptions && stageOptions.length > 0) {
        stageOptions.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option.text;
            button.classList.add('game-option');
            button.dataset.optionIndex = index;
            button.addEventListener('click', () => handleChoice(option));
            optionsContainer.appendChild(button);
        });
    } else {
        // Jeśli nie ma opcji, to koniec gry
        disableAllOptions();
    }
    showOptions();
}

/**
 * Obsługuje wybór gracza i przechodzi do następnego etapu.
 * @param {object} chosenOption - Wybrana opcja z obiektu gameData.
 */
async function handleChoice(chosenOption) {
    disableAllOptions(); // Wyłącz przyciski

    // Jeśli to zła odpowiedź
    if (chosenOption.feedback === "bad") {
        const previousStageId = currentStageId; // Zapisz ID poprzedniego pytania
        currentStageId = 'bad_answer_feedback'; // Przejdź do komunikatu o złej odpowiedzi
        gameData['bad_answer_feedback'].options[0].nextStage = previousStageId; // Ustaw powrót do poprzedniego pytania

        await new Promise(r => setTimeout(r, 700));
        await displayStage(); // Wyświetl komunikat o złej odpowiedzi
    } else {
        // Jeśli to dobra odpowiedź lub zwykłe przejście
        // Jeśli 'feedback' nie jest zdefiniowany (czyli jest to przycisk 'Dalej'), to też przechodzimy dalej
        if (chosenOption.choiceKey && chosenOption.choiceValue) {
            playerChoices[chosenOption.choiceKey] = chosenOption.choiceValue;
        }

        await new Promise(r => setTimeout(r, 700));
        currentStageId = chosenOption.nextStage; // Ustaw następny etap
        displayStage(); // Wyświetl nowy etap
    }
}

/**
 * Pokazuje przyciski opcji.
 */
function showOptions() {
    const optionButtons = document.querySelectorAll('.game-option');
    optionButtons.forEach(button => {
        button.classList.remove('hidden'); // Upewnij się, że są widoczne
        button.disabled = false;
    });
}

/**
 * Ukrywa i dezaktywuje wszystkie przyciski opcji.
 */
function disableAllOptions() {
    const optionButtons = document.querySelectorAll('.game-option');
    optionButtons.forEach(button => {
        button.disabled = true;
        // Opcjonalnie: można je też ukryć, jeśli chcemy, aby zniknęły po kliknięciu
        // button.classList.add('hidden');
    });
}

// --- Inicjalizacja Gry ---

// Rozpoczęcie gry po załadowaniu DOM (wyświetla intro)
document.addEventListener('DOMContentLoaded', () => {
    displayStage(); // Wyświetl pierwszy etap (intro)

    // Usuń przycisk 'start-button' z HTML, jeśli istnieje.
    // Sugerowane: po prostu nie dodawaj go do index.html, jeśli gra ma startować automatycznie.
    const startButtonInHtml = document.getElementById('start-button');
    if (startButtonInHtml) {
        startButtonInHtml.remove();
    }
});
