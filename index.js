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
];

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
const questionCon = document.getElementById("question");
const answerBtn = document.getElementById("answer-btn");

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
  if (randomQ.length > currentQ + 1) {
    nextBtn.classList.remove("hide");
  } else {
    startBtn.innerText = "Restart";
    startBtn.classList.remove("hide");
  }
}

function countScore() {}

function showScore() {}

function showQuestion(question) {
  questionCon.innerText = question.question;
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
