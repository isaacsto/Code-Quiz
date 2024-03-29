var currentIndex = 0;
var timerInterval = null;

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
//content for the page after quiz ends 

lastPageArr = [
  {
    allDone: "All done!",
    score: "Your final score is ",
    initials: "Enter your initials "
  }
]

// function erases homepage when you click the start button, calls countdown and renderQuestions function

function startQuiz() {
  document.querySelector("#start-button").setAttribute("style", "display: none")
  document.querySelector("#start-button").setAttribute("style", "display: none")
  renderQuestions();
  countDown();
}

// function creates element to render the quiz content 

function renderQuestions() {
  // assigns and pulls html element this function is attatched to 
  var quizCont = document.getElementById("quiz-container")
  quizCont.innerHTML = ""
  //makes a js variable an h3 element 
  var questionEl = document.createElement("h3")
  //sets text content of h3 to the "header" content in questions array
  questionEl.textContent = questions[currentIndex].header
  //append quiz content to the h3 element
  quizCont.append(questionEl)

  //makes content for questions array into buttons
  for (var i = 0; i < questions[currentIndex].options.length; i++) {
    var choice = document.createElement("button")
    choice.classList.add("btn", "btn-custom");
    choice.textContent = questions[currentIndex].options[i]
    choice.setAttribute("style", "display: block")
    quizCont.appendChild(choice)
  }
  if (currentIndex === questions.length) {
    endQuiz();
    clearInterval(timeInterval)
  }


}

//sets score to 0 
var userScore = 0;

// function to check answer key and alert if right or wrong 
function checkAnswer(e) {
  // if event target equals answer value in questions array increment score and alert correct
  if (e.target.textContent === questions[currentIndex].answer) {
    alert("Correct");
    userScore++;
    // else decrement score by one and decrement timer by ten and alert false
  } else {
    userScore--;
    timeLeft -= 10;
    alert("Incorrect");
  }
  // increment currentIndex to move to next question
  currentIndex++;
  // check if all questions have been answered
  if (currentIndex >= questions.length) {
    clearInterval(timerInterval);
    userScore = timeLeft
    endQuiz()
  } else {
    renderQuestions()
  }
}


var timeLeft = 60;

var timerEl = document.getElementById("countdown")

var timeInterval;

function countDown() {
  timeInterval = setInterval(function () {
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

  //defines and pulls html elements 
  var quizContent = document.getElementById("quiz-container")
  var nextPage = document.getElementById("last-page")

  var lastPageEl = document.createElement("div")
  // appends content of last page array to html elements 
  var allDoneEl = document.createElement("h2")
  allDoneEl.textContent = lastPageArr[0].allDone
  lastPageEl.appendChild(allDoneEl)

  // final score was timeLeft - 1 > fixes 
  var finalScore = timeLeft + 1;
  if (timeLeft === 0) {
    finalScore = 0;
  };
  var scoreEl = document.createElement("p")
  scoreEl.textContent = "Your score is: " + finalScore
  lastPageEl.appendChild(scoreEl);

  var initialsEl = document.createElement("p")
  initialsEl.textContent = lastPageArr[0].initials
  lastPageEl.appendChild(initialsEl)

  var inputEl = document.createElement("input")
  inputEl.setAttribute("type", "text")
  lastPageEl.appendChild(inputEl)

  // sets displays - hides old, displays new 
  quizContent.style.display = "none";
  nextPage.style.display = "block";


  clearInterval(timeInterval);
  // var finalScore = timeLeft;
  var userScore = finalScore;
  console.log("user score: " + finalScore)
  localStorage.setItem("userScore", finalScore);
  document.getElementById("last-page").style.display = "block";
  document.getElementById("finalScore").textContent = userScore;
  submitInitialsButton.addEventListener("click", function (e) {
    e.preventDefault();
    var initialsInput = document.getElementById("initialsInput").value;
    displayHighScores();
  });
  currentIndex = 0;
}


function displayHighScores() {
  // get scores from localStorage
  var scores = JSON.parse(localStorage.getItem("scores")) || [];

  // sort the scores from highest to lowest
  scores.sort(function (a, b) {
    return b.score - a.score;
  });

  // create new list to display scores
  var scoresList = document.createElement("ul");

  // loop through scores, create new list item for each one
  for (var i = 0; i < scores.length; i++) {
    var scoreItem = document.createElement("li");
    scoreItem.textContent = scores[i].initials + " - " + scores[i].score;
    scoresList.appendChild(scoreItem);
  }

  // add scores list to the page
  var highScoresDiv = document.getElementById("high-scores");
  highScoresDiv.innerHTML = "";
  highScoresDiv.appendChild(scoresList);
}


var initialsForm = document.getElementById("initialsForm");
var submitInitialsButton = document.getElementById("submitInitials");

// add event listener so that the high scores display when the submit button is pushed 
submitInitialsButton.addEventListener("click", function (e) {
  e.preventDefault();
  var initialsInput = document.getElementById("initialsInput").value;
  var userScore = localStorage.getItem("userScore");
  storeScore(initialsInput, userScore);
  displayHighScores();
});

function storeScore(initialsInput, finalScore) {
  //try catches the error that was displaying
  try {
    var scores = JSON.parse(localStorage.getItem("scores")) || [];
  } catch (error) {
    var scores = []
  }

  scores.push({
    initials: initialsInput.toUpperCase(),
    score: finalScore
  });
  localStorage.setItem("scores", JSON.stringify(scores));
}

function displayHighScores() {
  var highScores = JSON.parse(localStorage.getItem("scores")) || [];
  var highScoresList = document.getElementById("high-scores-list");
  highScoresList.innerHTML = "";
  var clearButton = document.getElementById("clear-btn");

  highScoresList.style.display = "none";
  clearButton.style.display = "none";

  highScoresList.innerHTML = "";

  for (var i = 0; i < highScores.length; i++) {
    var scoreEntry = document.createElement("li");
    scoreEntry.textContent = highScores[i].initials + " - " + highScores[i].score;
    highScoresList.appendChild(scoreEntry);
  }

  highScoresList.style.display = "block";
  clearButton.style.display = "block";
}

var highScoresNav = document.getElementById("high-scores-list");

highScoresNav.addEventListener("click", function () {
  displayHighScores();
});

//add click event listener to button
var clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", function () {
  localStorage.clear();
  displayHighScores();
});


document.querySelector("#start-button").addEventListener('click', startQuiz)

document.querySelector("#quiz-container").addEventListener('click', checkAnswer)