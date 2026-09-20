// ========================================
// WORD LISTS
// ========================================

const words = {

    easy: [

        "apple",
        "house",
        "water",
        "happy",
        "music",
        "green",
        "phone",
        "school",
        "friend",
        "coffee",
        "summer",
        "dream",
        "light",
        "smile",
        "flower",
        "book",
        "table",
        "mouse",
        "pizza",
        "cloud"

    ],


    medium: [

        "computer",
        "keyboard",
        "website",
        "developer",
        "creative",
        "project",
        "student",
        "technology",
        "internet",
        "application",
        "learning",
        "challenge",
        "future",
        "success",
        "programming",
        "software",
        "function",
        "variable",
        "database",
        "design"

    ],


    hard: [

        "javascript",
        "asynchronous",
        "cybersecurity",
        "implementation",
        "architecture",
        "authentication",
        "responsiveness",
        "development",
        "optimization",
        "algorithm",
        "configuration",
        "functionality",
        "environment",
        "application",
        "programming",
        "compatibility",
        "documentation",
        "performance",
        "deployment",
        "framework"

    ]

};


// ========================================
// GET HTML ELEMENTS
// ========================================

const startScreen =
    document.getElementById(
        "startScreen"
    );


const gameScreen =
    document.getElementById(
        "gameScreen"
    );


const gameOverScreen =
    document.getElementById(
        "gameOverScreen"
    );


const startButton =
    document.getElementById(
        "startButton"
    );


const playAgainButton =
    document.getElementById(
        "playAgainButton"
    );


const homeButton =
    document.getElementById(
        "homeButton"
    );


const typingInput =
    document.getElementById(
        "typingInput"
    );


const wordElement =
    document.getElementById(
        "word"
    );


const wordBox =
    document.getElementById(
        "wordBox"
    );


const feedback =
    document.getElementById(
        "feedback"
    );


const timeElement =
    document.getElementById(
        "time"
    );


const scoreElement =
    document.getElementById(
        "score"
    );


const wpmElement =
    document.getElementById(
        "wpm"
    );


const accuracyElement =
    document.getElementById(
        "accuracy"
    );


const comboElement =
    document.getElementById(
        "combo"
    );


const livesElement =
    document.getElementById(
        "lives"
    );


const progressBar =
    document.getElementById(
        "progressBar"
    );


const finalScore =
    document.getElementById(
        "finalScore"
    );


const finalCorrect =
    document.getElementById(
        "finalCorrect"
    );


const finalWrong =
    document.getElementById(
        "finalWrong"
    );


const finalWpm =
    document.getElementById(
        "finalWpm"
    );


const finalAccuracy =
    document.getElementById(
        "finalAccuracy"
    );


const finalCombo =
    document.getElementById(
        "finalCombo"
    );


const startHighScore =
    document.getElementById(
        "startHighScore"
    );


const finalHighScore =
    document.getElementById(
        "finalHighScore"
    );


const newRecord =
    document.getElementById(
        "newRecord"
    );


// ========================================
// GAME VARIABLES
// ========================================

let difficulty = "easy";

let currentWord = "";

let score = 0;

let correctWords = 0;

let wrongWords = 0;

let totalAttempts = 0;

let combo = 0;

let bestCombo = 0;

let lives = 3;

let timeLeft = 30;

let timer = null;

let gameRunning = false;

let startTime = 0;


// ========================================
// DIFFICULTY BUTTONS
// ========================================

const difficultyButtons =
    document.querySelectorAll(
        ".difficulty"
    );


difficultyButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                if (gameRunning) {
                    return;
                }


                difficultyButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                difficulty =
                    button.dataset.level;

            }
        );

    }
);


// ========================================
// GET RANDOM WORD
// ========================================

function getRandomWord() {

    const list =
        words[difficulty];


    const randomIndex =
        Math.floor(
            Math.random() *
            list.length
        );


    return list[randomIndex];

}


// ========================================
// SHOW NEW WORD
// ========================================

function showNewWord() {

    currentWord =
        getRandomWord();


    wordElement.textContent =
        currentWord;


    typingInput.value = "";


    typingInput.focus();

}


// ========================================
// START GAME
// ========================================

function startGame() {

    // Reset everything

    score = 0;

    correctWords = 0;

    wrongWords = 0;

    totalAttempts = 0;

    combo = 0;

    bestCombo = 0;

    lives = 3;

    timeLeft = 30;

    gameRunning = true;

    startTime = Date.now();


    // Reset screen

    scoreElement.textContent =
        "0";


    timeElement.textContent =
        "30";


    wpmElement.textContent =
        "0";


    accuracyElement.textContent =
        "100%";


    comboElement.textContent =
        "0";


    livesElement.textContent =
        "3";


    feedback.textContent =
        "";


    progressBar.style.width =
        "100%";


    newRecord.classList.add(
        "hidden"
    );


    // Switch screen

    startScreen.classList.add(
        "hidden"
    );


    gameOverScreen.classList.add(
        "hidden"
    );


    gameScreen.classList.remove(
        "hidden"
    );


    // Enable typing

    typingInput.disabled = false;


    typingInput.focus();


    // Show first word

    showNewWord();


    // Start timer

    clearInterval(timer);


    timer =
        setInterval(
            updateTimer,
            1000
        );

}


// ========================================
// TIMER
// ========================================

function updateTimer() {

    timeLeft--;


    timeElement.textContent =
        timeLeft;


    const percentage =
        (timeLeft / 30) * 100;


    progressBar.style.width =
        percentage + "%";


    updateLiveStats();


    if (timeLeft <= 0) {

        endGame();

    }

}


// ========================================
// CHECK TYPED WORD
// ========================================

function checkTypedWord() {

    if (!gameRunning) {
        return;
    }


    const typed =
        typingInput.value.trim();


    // If correct

    if (typed === currentWord) {

        handleCorrectWord();

    }


    // If player has typed too many
    // characters and word is wrong

    else if (
        typed.length >=
        currentWord.length
    ) {

        handleWrongWord();

    }

}


// ========================================
// CORRECT WORD
// ========================================

function handleCorrectWord() {

    correctWords++;

    totalAttempts++;

    combo++;


    // Save best combo

    if (combo > bestCombo) {

        bestCombo = combo;

    }


    // Base points

    let points = 10;


    // Combo bonus

    if (combo >= 5) {

        points += 5;

    }


    if (combo >= 10) {

        points += 10;

    }


    score += points;


    // Update screen

    scoreElement.textContent =
        score;


    comboElement.textContent =
        combo;


    feedback.textContent =
        "🔥 +" + points;


    feedback.style.color =
        "#6b5ce7";


    // Animation

    wordBox.classList.remove(
        "wrong-animation"
    );


    wordBox.classList.add(
        "correct-animation"
    );


    setTimeout(
        function () {

            wordBox.classList.remove(
                "correct-animation"
            );

        },
        250
    );


    showNewWord();


    updateLiveStats();

}


// ========================================
// WRONG WORD
// ========================================

function handleWrongWord() {

    wrongWords++;

    totalAttempts++;

    combo = 0;

    lives--;


    comboElement.textContent =
        combo;


    livesElement.textContent =
        lives;


    feedback.textContent =
        "❌ Wrong!";


    feedback.style.color =
        "#e05a6f";


    // Shake animation

    wordBox.classList.remove(
        "correct-animation"
    );


    wordBox.classList.add(
        "wrong-animation"
    );


    setTimeout(
        function () {

            wordBox.classList.remove(
                "wrong-animation"
            );

        },
        300
    );


    typingInput.value = "";


    updateLiveStats();


    // No lives left

    if (lives <= 0) {

        endGame();

    }

}


// ========================================
// LIVE STATS
// ========================================

function updateLiveStats() {

    // Accuracy

    let accuracy = 100;


    if (totalAttempts > 0) {

        accuracy =
            Math.round(
                (
                    correctWords /
                    totalAttempts
                ) * 100
            );

    }


    accuracyElement.textContent =
        accuracy + "%";


    // WPM

    const elapsed =
        Date.now() - startTime;


    const minutes =
        elapsed / 60000;


    if (minutes > 0) {

        const wpm =
            Math.round(
                correctWords /
                minutes
            );


        wpmElement.textContent =
            wpm;

    }

}


// ========================================
// END GAME
// ========================================

function endGame() {

    if (!gameRunning) {
        return;
    }


    gameRunning = false;


    clearInterval(timer);


    typingInput.disabled = true;


    // Final accuracy

    let accuracy = 0;


    if (totalAttempts > 0) {

        accuracy =
            Math.round(
                (
                    correctWords /
                    totalAttempts
                ) * 100
            );

    }


    // Final WPM

    const elapsed =
        Date.now() - startTime;


    const minutes =
        elapsed / 60000;


    let wpm = 0;


    if (minutes > 0) {

        wpm =
            Math.round(
                correctWords /
                minutes
            );

    }


    // Display final stats

    finalScore.textContent =
        score;


    finalCorrect.textContent =
        correctWords;


    finalWrong.textContent =
        wrongWords;


    finalAccuracy.textContent =
        accuracy + "%";


    finalWpm.textContent =
        wpm;


    finalCombo.textContent =
        bestCombo;


    // Get saved high score

    const oldHighScore =
        Number(
            localStorage.getItem(
                "typingHighScore"
            ) || 0
        );


    let highScore =
        oldHighScore;


    // Check new record

    if (score > oldHighScore) {

        highScore = score;


        localStorage.setItem(
            "typingHighScore",
            score
        );


        newRecord.classList.remove(
            "hidden"
        );

    }


    finalHighScore.textContent =
        highScore;


    startHighScore.textContent =
        highScore;


    // Switch screen

    gameScreen.classList.add(
        "hidden"
    );


    gameOverScreen.classList.remove(
        "hidden"
    );

}


// ========================================
// BUTTON EVENTS
// ========================================

startButton.addEventListener(
    "click",
    startGame
);


playAgainButton.addEventListener(
    "click",
    startGame
);


homeButton.addEventListener(
    "click",
    function () {

        clearInterval(timer);

        gameRunning = false;

        typingInput.disabled = true;


        gameScreen.classList.add(
            "hidden"
        );


        gameOverScreen.classList.add(
            "hidden"
        );


        startScreen.classList.remove(
            "hidden"
        );


        const savedScore =
            localStorage.getItem(
                "typingHighScore"
            ) || 0;


        startHighScore.textContent =
            savedScore;

    }
);


// ========================================
// TYPING EVENT
// ========================================

typingInput.addEventListener(
    "input",
    checkTypedWord
);


// ========================================
// LOAD HIGH SCORE
// ========================================

function loadHighScore() {

    const savedScore =
        localStorage.getItem(
            "typingHighScore"
        ) || 0;


    startHighScore.textContent =
        savedScore;

}


loadHighScore();
