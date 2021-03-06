const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<insertjs>",
        answer: 1

    },

    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href = 'xxx.js'>",
        choice2: "<script name = 'xxx.js'>",
        choice3: "<script file = 'xxx.js'>",
        choice4: "<script src = 'xxx.js'>",
        answer: 4

    },

    {
        question: "How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World')",
        choice2: "alertBox('Hello World')",
        choice3: "msgAlert('Hello World')",
        choice4: "alert('Hello World')",
        answer: 4

    },

    {
        question: "How do we insert the Style Sheet (CSS) file?",
        choice1: "<link insert='stylesheet' href='style.css'>",
        choice2: "<link rel='stylesheet' href='style.css'>",
        choice3: "<css rel='stylesheet' link='style.css'>",
        choice4: "<style rel='stylesheet' href='style.css'>",
        answer: 2

    }
];


const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){

    return window.location.assign("/end.html");
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random()*availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;


    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}


choices.forEach(choice =>{
    choice.addEventListener('click', e =>{
        // console.log(e.target);
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            getNewQuestion();
            selectedChoice.parentElement.classList.remove(classToApply);
        }, 1000);
        
    })
})

startGame();

