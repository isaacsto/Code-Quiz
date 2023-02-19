
var currentIndex = 0;

//set an array with objects for questions/options with an answer key 

var questions = [
    {
        header: "Commonly used data types do NOT include:",
        options: ["1.strings", "2.booleans", "3.alerts", "4.numbers"],
        answer: "3.alerts",
    },
    {
        header: "The condition in an if / else statement is enclosed with ____.",
        options: ["1.quotes", "2.curly brackets", "3.paranthesis", "4.square brackets"],
        answer: "2.curly brackets",

    },
    {
        header: "Arrays in JavaScript can be used to store _____.",
        options: ["1.numbers and strings", "2.booleans", "3.other arrays", "4.all of the above"],
        answer: "4.all of the above",
    },
    {
        header: "String values must be enclosed within _____ when being assigned to variables.",
        options: ["1.commas", "2.curly brackets", "3.quotes", "4.parenthesis"],
        answer: "3.quotes",
    },
    {
        header: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["1.JavaScript", "2.terminal/bash", "3.for loops", "4.console.log"],
        answer: "4.console.log",
    }
]

lastPageArr = [
    {
        allDone: "All done!",
        score: "Your final score is ",
        initials: "Enter your initials "
    }
]

// function erases homepage when you click the start button

function startQuiz() {
    document.querySelector("#welcome").setAttribute("style", "display: none")
    document.querySelector("#start-button").setAttribute("style", "display: none")
    renderQuestions();
    countDown();
}

// function creates element to render the quiz content 



function renderQuestions() {
    var quizCont = document.getElementById("quiz-container")
    quizCont.innerHTML = ""
    var questionEl = document.createElement("h3")
    questionEl.textContent = questions[currentIndex].header

    quizCont.append(questionEl)

    for (var i = 0; i < questions[currentIndex].options.length; i++) {
        var choice = document.createElement("button")
        choice.textContent = questions[currentIndex].options[i]
        choice.setAttribute("style", "display: block")
        quizCont.appendChild(choice)
    }
    if (currentIndex === questions.length) {
        endQuiz();
        clearInterval(timeInterval)
    }


}

// function to check answer key and alert if right or wrong 

var userScore = 0;

function checkAnswer(e) {
    console.log(e.target.textContent)
    if (e.target.textContent === questions[currentIndex].answer) {
        alert("correct")
        userScore++;
    } else {
        timeLeft -= 10; 
        alert("false")
    }
    currentIndex++
    console.log(currentIndex)
    if (currentIndex === questions.length) {
        endQuiz();
    } else {
    renderQuestions();

}
}

var timeLeft = 60;

var timerEl = document.getElementById("countdown")



function countDown() {
   var timeInterval = setInterval(function() {
        if (timeLeft >= 1) {
            timerEl.textContent = timeLeft;
            timeLeft--;
            renderQuestions();
        } else {
            timerEl.textContent = "";
            clearInterval(timeInterval);
            endQuiz()
        }
    }, 1000);
}




var lastPage = document.getElementById("last-page");


function endQuiz() {
    var quizContent = document.getElementById("quiz-container")
    var nextPage = document.getElementById("last-page") 

    var lastPageEl = document.createElement("div")

    var allDoneEl = document.createElement("h2")
    allDoneEl.textContent = lastPageArr[0].allDone
    lastPageEl.appendChild(allDoneEl)

    var scoreEl = document.createElement("p")
    scoreEl.textContent = lastPageArr[0].score + finalScore
    lastPageEl.appendChild(scoreEl);

    var initialsEl = document.createElement("p")
    initialsEl.textContent = lastPageArr[0].initials
    lastPageEl.appendChild(initialsEl)

    var inputEl = document.createElement("input")
    inputEl.setAttribute("type", "text")
    lastPageEl.appendChild(inputEl)

    
    quizContent.style.display = "none";
    nextPage.style.display = "block";



 document.addEventListener("DOMContentLoaded", function() {

    var initialsInput = document.getElementById("initialsInput");
    var displayScore = localStorage.getItem("userScore");

    function storeScore(initialsInput, finalScore) {
        var scores = JSON.parse(localStorage.getItem("scores")) || [];
        var scoreObj = {
            initials: initialsInput,
            score: finalScore
        };
        scores.push(scoreObj);
        localStorage.setItem("scores", JSON.stringify(scores));
    }
        
       
        var scoresList = document.getElementById("scores-list");
        scoresList.innerHTML = ""; 
        for (var i=0; i < scores.length; i++){
            var scoreItem = document.createElement("li");
            scoreItem.textContent = scores[i].initials + "-" + scores[i].score;
            scoresList.appendChild(scoreItem);
}

    var initialsForm = document.getElementById("initialsForm");
    var submitInitialsButton = document.getElementById("submitInitials");
    
console.log(initialsForm)
console.log(submitInitialsButton)

    initialsForm.addEventListener("submit", function(e) {
        e.preventDefault();
    
        var initialsInput = document.getElementById("initialsInput").value;
        storeScore(initialsInput, userScore);

       localStorage.setItem("score", userScore)
       localStorage.setItem("initials", initialsInput);
    
        window.location.replace("highscores.html");
    })
 
    })
}


document.querySelector("#start-button").addEventListener('click', startQuiz)

document.querySelector("#quiz-container").addEventListener('click', checkAnswer)
