let questions = [
  {
    question: "Where is Winterfell?",
    answers: [
      { text: "In the North", correct: true },
      { text: "In the Vale", correct: false },
      { text: "In the Reach", correct: false },
      { text: "In Dorne", correct: false },
    ],
  },
  {
    question: "Lord of The North is:",
    answers: [
      { text: "Doran Martell", correct: false },
      { text: "Eddard Stark", correct: true },
      { text: "Mace Tyrell", correct: false },
      { text: "Robert Baratheon", correct: false },
    ],
  },
  {
    question: "Main follower of R'hllor is:",
    answers: [
      { text: "Thoros of Myr", correct: false },
      { text: "Melisandre", correct: true },
      { text: "Missandei", correct: false },
      { text: "Stannis Baratheon", correct: false },
    ],
  },
  {
    question: "What became of Arya Stark?",
    answers: [
      { text: "Dancer", correct: false },
      { text: "Knight", correct: false },
      { text: "Queen", correct: false },
      { text: "Faceless Man", correct: true },
    ],
  },
  {
    question: "What is Jon Snow's real name?",
    answers: [
      { text: "Jon Snow", correct: false },
      { text: "Jon Targaryen", correct: false },
      { text: "Aegon Targaryen", correct: true },
      { text: "Jon Stark", correct: false },
    ],
  },
];

let startBtn = document.getElementById("start-btn");
let nextBtn = document.getElementById("next-btn");
let questionContainer = document.getElementById("question-container");
let questionPlace = document.getElementById("question");
let answerBtn = document.getElementById("answer-btn");
let score = 0;
let myScore = document.getElementById("score");
let allScore = document.getElementById("allScores");
let rez = document.getElementById("rez");
let divForScores = document.getElementById("forScores");
let scoreNames = document.querySelector(".newP");

let randomQ, currentQ;

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
  currentQ++;
  nextQuestion();
});

function startQuiz() {
  startBtn.classList.add("hide");
  randomQ = questions.sort(() => Math.random() - 0.5);
  currentQ = 0;
  questionContainer.classList.remove("hide");
  nextQuestion();
}

function nextQuestion() {
  reset();
  showQuestion(randomQ[currentQ]);
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  correctOrWrong(document.body, correct);
  Array.from(answerBtn.children).forEach((button) => {
    correctOrWrong(button, button.dataset.correct);
  });

  if (correct) {
    score += 1;
  }
  myScore.innerHTML = "Score: " + score;

  if (randomQ.length > currentQ + 1) {
    nextBtn.classList.remove("hide");
  } else {
    submitName();
    startBtn.innerText = "Restart";
    startBtn.classList.remove("hide");
  }
}

function showQuestion(question) {
  questionPlace.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerBtn.appendChild(button);
  });
}

function reset() {
  clearCorrectOrWrong(document.body);
  nextBtn.classList.add("hide");
  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

function correctOrWrong(el, correct) {
  clearCorrectOrWrong(el);
  if (correct) {
    el.classList.add("correct");
  } else {
    el.classList.add("wrong");
  }
}

function clearCorrectOrWrong(el) {
  el.classList.remove("correct");
  el.classList.remove("wrong");
}

allScore.addEventListener("click", function () {
  rez.innerHTML = "";
  pullFromStorage();
  let divForScores = document.createElement("div");
  rez.appendChild(divForScores);
  divForScores.className = "allScores";
  divForScores.id = "forScores";

  let clearBtn = document.createElement("button");
  clearBtn.innerHTML = "Clear";
  clearBtn.className = "btn";
  divForScores.appendChild(clearBtn);
  clearBtn.addEventListener("click", () => {
    rez.innerHTML = "";
  });
});

function submitName() {
  questionContainer.classList.add("hide");
  let divForInput = document.createElement("div");
  divForInput.className = "allScores";
  let subBtn = document.createElement("button");
  let inputEl = document.createElement("input");
  let pEl = document.createElement("p");
  pEl.innerHTML = "Your Name:";
  subBtn.innerHTML = "Submit";
  subBtn.className = "btn";
  subBtn.id = "retry ";
  subBtn.addEventListener("click", () => {
    submitToStorage();
    pEl.remove();
    inputEl.remove();
    divForInput.remove();
    subBtn.remove();
  });

  inputEl.id = "names";
  divForInput.appendChild(pEl);
  divForInput.appendChild(inputEl);
  divForInput.appendChild(subBtn);
  rez.appendChild(divForInput);
}

function submitToStorage() {
  localStorage.setItem(document.getElementById("names").value, score);
  restart();
}

function pullFromStorage() {
  for (let key in localStorage) {
    let pEl = document.createElement("p");
    pEl.className = "newP";
    pEl.innerHTML = "Name: " + key + "  ||  " + " Score: " + localStorage[key];
    if (typeof localStorage[key] === "string") rez.appendChild(pEl);
  }
}

function restart() {
  score = 0;
  myScore.innerHTML = "";
}
