
// user sees "View High Scores" nav top left, time top right
// header "Coding quiz challenge" with description
// start button takes you to next page 
// following pages have multiple choice questios
// click button with chosen answer site alerts right or wrong and takes you to next page 
// end of quiz enter initials, view high scores, clear high scores, go bak=ck option

// trigger new page on click 
// if answer correct alert right, if answer wrong alert wrong 

var currentIndex = 0;

var questions = [
    {
        question: "Commonly used data types do NOT include:",
        choices: ["1.strings","2.booleans", "3.alerts", "4.numbers"],
        answer: "3.alerts",
    },
    {
        question: "The condition in an if / else statement is enclosed with ____.",
        choices: ["1.quotes", "2.curly brackets", "3.paranthesis", "square brackets"],
        answer: "2.curly brackets",
        
    },
    {
        question:"Arrays in JavaScript can be used to store _____.",
        choices: ["1.numbers and strings","2.booleans", "3.other arrays", "4.all of the above"],
        answer: "4.all of the above",
    }
    {
        question:"String values must be enclosed within _____ when being assigned to variables.",
        choices: ["1.commas","2.curly brackets", "3.quotes", "4.parenthesis"],
        answer: "3.quotes",
    }
    {
        question:"A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["1.JavaScript","2.terminal/bash", "3.for loops", "4.console.log"],
        answer: "4.console.log",
    }
]

function renderQuestions() {
    var quizCont = document.querySelector("#quiz-container")
    quizCont.innerHTML = ""
    var questionEl = document.createElement("h2")
    questionEl.textContent = questions[currentIndex].question

    quizCont.append(questionEl)
    
    for (var i = 0;  i < questions[currentIndex].choices.length; i++) {
        var choice = document.createElement("button")
        choice.textContent = questions[currentIndex].choices[i]
        choice.setAttribute("style", "display: block")
        quizCont.appendChild(choice)
    }
    

}

function checkAnswer(e) {
    console.log(e.target.textContent)
    if (e.target.textContent === questions[currentIndex].answer) {
        console.log("correct")
    } else {
        console.log("false")
    }
    currentIndex++
    console.log(currentIndex)
    renderQuestions()

}

function startQuiz() {
    document.querySelector("#welcome").setAttribute("style", "display: none")
    document.querySelector("#start-button").setAttribute("style", "display: none")
    renderQuestions();
}
document.querySelector("#start-button").addEventListener('click', startQuiz)

document.querySelector("#quiz-container").addEventListener('click', checkAnswer)