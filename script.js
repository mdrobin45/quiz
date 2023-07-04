const q_text = document.getElementById('question-text');
const a_text = document.getElementById('a-text');
const b_text = document.getElementById('b-text');
const c_text = document.getElementById('c-text');
const d_text = document.getElementById('d-text');
const submitBtn = document.getElementById('quiz-btn');
const radioInpt = document.querySelectorAll('.radioInpt');
const ansText = document.getElementsByClassName('ans-text');
const qzContainer = document.querySelector('.quiz-container');

// Quiz Data object
const quizData = [
    {
        'question': 'How old is Robin',
        'a': 16,
        'b': 18,
        'c': 20,
        'd': 19,
        'correct': 'd'
    },
    {
        'question': 'What is the best programming language',
        'a': 'Javascript',
        'b': 'PHP',
        'c': 'Python',
        'd': 'Ruby',
        'correct': 'c'
    },
    {
        'question': 'What is the national fruit of bangladesh',
        'a': 'Apple',
        'b': 'Banana',
        'c': 'Guava',
        'd': 'Mango',
        'correct': 'd'
    }
];

// Initial function call
let currentQuiz = 0;
loadQuiz();
let score = 0;


// Load Quiz
function loadQuiz()
{
    const currentQuizData = quizData[currentQuiz];
    q_text.innerText = currentQuizData.question + "?";
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;

    // Deselect radio button every button click
    for (const radioEl of radioInpt) {
        radioEl.checked = false;
    }

    // Disable button by until select option
    submitBtn.style.backgroundColor = "#9ae6ff";
    submitBtn.style.cursor = "default";
    submitBtn.disabled = true;
}

// Check answer
function checkAnswer(callback)
{
    for (const element of radioInpt) {
        if (element.checked) {
            const elementId = element.id;
            const currentQuizData = quizData[currentQuiz];
            const selectedEl = document.querySelector('[for="' + elementId + '"]').innerHTML;
            const correctAns = currentQuizData.correct;
            const correctValue = currentQuizData[correctAns];
            if (selectedEl == correctValue) {
                score++;
            }
        }
    }
    callback(score);
}
// Load quiz and check answer by button click or user submit
submitBtn.addEventListener('click', function ()
{
    checkAnswer(function (score)
    {
        if (currentQuiz == (quizData.length)-1) {
            qzContainer.innerHTML = "Your Score "+score+" Out of "+quizData.length;
        }
    });
    currentQuiz++
    if (currentQuiz < quizData.length) {
        loadQuiz();
    }
});


// Enable submit button when select answer
for (const radioEl of radioInpt) {
    radioEl.addEventListener('change', function ()
    {
        if (this.checked) {
            submitBtn.style.backgroundColor = "#2cb7ea";
            submitBtn.style.cursor = "pointer";
            submitBtn.disabled = false;
        }
        if (currentQuiz == (quizData.length) - 1) {
            submitBtn.value = "Submit";
        }
    })
}