const STATE = {
    screen: "landing",
    question: 0,
    score: 0
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
        answer: "Renee Descartes"
    }
]

function App(){
    renderApp();
    handleStart();
    handleSubmit();
};

function buildCurrentScreen(quote, philosophers){
    if(STATE.screen === 'landing'){
        return `
        <section class="js-landing">
            <button class="js-start"><img src="images/philosophy.png" alt="greek letter p"></button>
            <p id="js-click-note">click to begin...</p>
        </section>`
    }else if(STATE.screen === 'questionare'){
        return `
        <section class="js-status-tracker hidden">
            <p class="js-question-number">Question: ${STATE.question + 1}/5</p>
            <p class="js-score">Correct: ${STATE.score}/5</p>
        </section>
        <section class="js-questionare hidden">
            <div class="js-quote-box">
                <h3 class="js-quote-title">Who said?</h3>
                <p>
                    ${quote}
                </p>
            </div>
            <form class="js-quote-form" action="#">
                <input type="radio" name="philosopher" value="${philosophers[0]}" required>   ${philosophers[0]}<br>
                <input type="radio" name="philosopher" value="${philosophers[1]}" required>   ${philosophers[1]}<br>
                <input type="radio" name="philosopher" value="${philosophers[2]}" required>   ${philosophers[2]}<br>
                <input type="radio" name="philosopher" value="${philosophers[3]}" required>   ${philosophers[3]}<br>

                <button type="submit">submit</button>
            </form>
        </section>`
    }else if(STATE.screen === 'answer'){
        return `
        <section class="js-status-tracker hidden">
            <p class="js-question-number">Question: ${STATE.question + 1}/5</p>
            <p class="js-score">Correct: ${STATE.score}/5</p>
        </section>
        <section class="js-individual-results hidden">
            <div class="js-philosopher-image-box">
                <img src="${QUIZ[STATE.question].image}" alt="Picture of ${QUIZ[STATE.question].answer}"}
            </div>
            <div class="js-who-said-box">
                <p>${QUIZ[STATE.question].answer} said "${QUIZ[STATE.question].quote}"</p>
            </div>
            <button>continue</button>
        </section>`
    }else if(STATE.screen === 'results'){
        return `
        <section class="js-end-results hidden">
            <h2>Congratulations!</h2>
            <p>You got __/5 correct!</p>
            <p>Great job!</p>
            <a href="index.html">play again</a>
        </section>`
    }else{
        return `<p>error loading page...</p>`
    }
}

function handleStart(){
    $('.js-start').on('click', function(){
        STATE.screen = 'questionare';

        renderApp(QUIZ[STATE.question].quote, QUIZ[STATE.question].philosophers)
    })
}

function handleSubmit(){
    $('.js-quiz-window').on('submit', '.js-quote-form', function(e){
        e.preventDefault();
        let guess = $('input[name="philosopher"]:checked')[0].attributes.value.value;

        if(guess === QUIZ[STATE.question].answer){
            STATE.score += 1;
            STATE.screen = 'answer';
            renderApp();
        }else{
            STATE.screen = 'answer';
            renderApp();
        }
    })
}

function renderApp(quote = '', philosophers = []){
    const currentScreen = buildCurrentScreen(quote, philosophers);

    $('.js-quiz-window').html(currentScreen);
}

$(App);