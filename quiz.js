const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".aswers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

// push the questions into availableQuestions Array
function setAvailableQuestions() {
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    availableQuestions.push(quiz[i]);
  }
}

// get new question
function getNewQuestion() {
  questionNumber.innerHTML =
    "Question" + " " + (questionCounter + 1) + " " + "of" + " " + quiz.length;
  const questionIndex =
    availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  currentQuestion = questionIndex;
  questionText.innerHTML = currentQuestion.q;
  const index1 = availableQuestions.indexOf(questionIndex);
  availableQuestions.splice(index1, 1);
  const optionLen = currentQuestion.Options.length;
  for (let i = 0; i < optionLen; i++) {
    availableOptions.push(i);
  }
  optionContainer.innerHTML = "";

  let animationDelay = 0.15;
  for (let i = 0; i < optionLen; i++) {
    const optionIndex =
      availableOptions[Math.floor(Math.random() * availableOptions.length)];
    const index2 = availableOptions.indexOf(optionIndex);
    availableOptions.splice(index2, 1);
    const option = document.createElement("div");
    option.innerHTML = currentQuestion.Options[optionIndex];
    option.id = optionIndex;
    option.style.animationDelay = animationDelay + "s";
    animationDelay = animationDelay + 0.15;
    option.className = "option";
    optionContainer.appendChild(option);
    option.setAttribute("onclick", "getResult(this)");
  }

  questionCounter++;
}

// get the result of current attempt question
function getResult(element) {
  const id = parseInt(element.id);

  if (id === currentQuestion.answer) {
    element.classList.add("correct");

    updateAnswerIndicator("correct");
    correctAnswers++;
  } else {
    element.classList.add("wrong");

    updateAnswerIndicator("wrong");

    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
      if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
        optionContainer.children[i].classList.add("correct");
      }
    }
  }
  attempt++;
  unclickableOptions();
}

// make all the options unclickable once the user select a option()
function unclickableOptions() {
  const optionLen = optionContainer.children.length;
  for (let i = 0; i < optionLen; i++) {
    optionContainer.children[i].classList.add("already-answered");
  }
}

function answerIndicator() {
  answersIndicatorContainer.innerHTML = "";
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    const indicator = document.createElement("div");
    answersIndicatorContainer.appendChild(indicator);
  }
}

function updateAnswerIndicator(markType) {
  answersIndicatorContainer.children[questionCounter - 1].classList.add(
    markType
  );
}

function next() {
  if (questionCounter == quiz.length) {
    quizOver();
  } else {
    getNewQuestion("");
  }
}

function quizOver() {
  //hide quiz Box
  quizBox.classList.add("hide");
  //show result box
  resultBox.classList.remove("hide");
  quizResult();
}

function resetQuiz() {
  questionCounter = 0;
  correctAnswers = 0;
  attempt = 0;
}

function tryAgainQuiz() {
  //hide the resultBox
  resultBox.classList.add("hide");
  //show the quizBox
  quizBox.classList.remove("hide");
  resetQuiz();
  startQuiz();
}

// get the quiz result
function quizResult() {
  resultBox.querySelector(".total-question").innerHTML = quiz.length;
  resultBox.querySelector(".total-attempt").innerHTML = attempt;
  resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
  resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
  const percentage = (correctAnswers / quiz.length) * 100;
  resultBox.querySelector(".percentage").innerHTML = percentage.toFixed() + "%";
  resultBox.querySelector(".total-score").innerHTML =
    correctAnswers + "/" + quiz.length;
}

// ###### STARTING POINT ######

function startQuiz() {
  homeBox.classList.add("hide");

  quizBox.classList.remove("hide");
  setAvailableQuestions();
  getNewQuestion();

  //to create indicator of answers
  answerIndicator();
}

window.onload = function () {
  homeBox.querySelector(".total-question").innerHTML = quiz.length;
};
