const STATE = {
    screen: "landing",
    question: 0,
    score: 0,
    correct: false
};

const QUIZ = [
    {
        quote: "The world is all that is the case.",
        philosophers: [
            "David Hume",
            "Ludwig Wittgenstein",
            "Plato",
            "Albert Einstein"
        ],
        answer: "Ludwig Wittgenstein",
        image: "images/lw.jpeg"
    },
    {
        quote: "I think, therefor I am.",
        philosophers: [
            "Renee Descartes",
            "David Hume",
            "Voltaire",
            "Immanuel Kant"
        ],
        answer: "Renee Descartes",
        image: "images/descartes.jpeg"
    },
    {
        quote: "The life of man is of no greater importance to the universe than that of an oyster.",
        philosophers: [
            "Plato",
            "Aristotle",
            "David Hume",
            "Saint Augustine"
        ],
        answer: "David Hume",
        image: "images/hume.jpeg"
    },
    {
        quote: "The death of dogma is the birth of morality.",
        philosophers: [
            "Albert Einstein",
            "Bertrand Russel",
            "John Locke",
            "Immanuel Kant"
        ],
        answer: "Immanuel Kant",
        image: "images/kant.jpeg"
    },
    {
        quote: "Bad men need nothing more to compass their ends, than that good men should look on and do nothing.",
        philosophers: [
            "Thomas Hobbes",
            "Marcus Aurelius",
            "Friedrich Nietzsche",
            "John Stuart Mill"
        ],
        answer: "John Stuart Mill",
        image: "images/mill.jpeg"
    }
];

function buildCurrentScreen(quote, philosophers){
    if(STATE.screen === 'landing'){
        return `
        <section class="js-landing">
            <button class="js-start"><img src="images/philosophy.png" alt="greek letter p"></button>
            <p id="js-click-note">click to begin...</p>
        </section>`
    }else if(STATE.screen === 'questionare'){
        return `
        <section class="js-status-tracker">
            <p class="js-question-number">Question: ${STATE.question + 1}/${QUIZ.length}</p>
            <p class="js-score">Correct: ${STATE.score}/${QUIZ.length}</p>
        </section>
        <section class="js-questionare">
            <div class="js-quote-box">
                <h3 class="js-quote-title">Who said?</h3>
                <p>
                    <i>"${quote}"</i>
                </p>
            </div>
            <form class="js-quote-form" action="#">
                <label><input type="radio" name="philosopher" value="${philosophers[0]}" required>   ${philosophers[0]}</label><br>
                <label><input type="radio" name="philosopher" value="${philosophers[1]}" required>   ${philosophers[1]}</label><br>
                <label><input type="radio" name="philosopher" value="${philosophers[2]}" required>   ${philosophers[2]}</label><br>
                <label><input type="radio" name="philosopher" value="${philosophers[3]}" required>   ${philosophers[3]}</label><br>

                <button class="js-button" type="submit">submit</button>
            </form>
        </section>`
    }else if(STATE.screen === 'answer'){
        return `
        <section class="js-status-tracker">
            <p class="js-question-number">Question: ${STATE.question + 1}/${QUIZ.length}</p>
            <p class="js-score">Correct: ${STATE.score}/${QUIZ.length}</p>
        </section><br>
        <h2 class="correct">${STATE.correct ? "Correct!": "Wrong!"}</h2>
        <section class="js-individual-results">
            <div class="js-philosopher-image-box">
                <img src="${QUIZ[STATE.question].image}" alt="Picture of ${QUIZ[STATE.question].answer}"}
            </div>
            <div class="js-who-said-box">
                <p><strong>${QUIZ[STATE.question].answer}</strong> said <i>"${QUIZ[STATE.question].quote}"</i></p>
            </div>
            <button class="js-continue js-button">continue</button>
        </section>`
    }else if(STATE.screen === 'results'){
        return `
        <section class="js-end-results">
            <h2>Congratulations!</h2>
            <p>You got ${STATE.score}/${QUIZ.length} correct!</p>
            <p>Great job!</p>
            <button>play again</button>
        </section>`
    }else{
        return `<p>error loading page...</p>`
    };
};

function handleStart(){
    $('.js-quiz-window').on('click', '.js-start', function(){
        STATE.screen = 'questionare';

        renderApp(QUIZ[STATE.question].quote, QUIZ[STATE.question].philosophers);
    });
};

function handleGuessSubmit(){
    $('.js-quiz-window').on('submit', '.js-quote-form', function(e){
        e.preventDefault();
        let guess = $('input[name="philosopher"]:checked')[0].attributes.value.value;

        if(guess === QUIZ[STATE.question].answer){
            STATE.score += 1;
            STATE.screen = 'answer';
            STATE.correct = true;
            renderApp();
        }else{
            STATE.screen = 'answer';
            STATE.correct = false;
            renderApp();
        };
    });
};

function handleContinue(){
    $('.js-quiz-window').on('click', '.js-continue', function(e){
        if(STATE.question < QUIZ.length - 1){
            STATE.question += 1;
            STATE.screen = 'questionare';
            renderApp(QUIZ[STATE.question].quote, QUIZ[STATE.question].philosophers);
        }else{
            STATE.question += 1;
            STATE.screen = 'results';
            renderApp();
        };
    });
};

function handlePlayAgain(){
    $('.js-quiz-window').on('click', '.js-end-results button', function(e){
        STATE.question = 0;
        STATE.score = 0;
        STATE.screen = 'landing';
        renderApp(QUIZ[STATE.question].quote, QUIZ[STATE.question].philosophers);
    });
};

function renderApp(quote = '', philosophers = []){
    const currentScreen = buildCurrentScreen(quote, philosophers);

    $('.js-quiz-window').html(currentScreen);
};

function App(){
    renderApp();
    handleStart();
    handleGuessSubmit();
    handleContinue();
    handlePlayAgain();
};

$(App);