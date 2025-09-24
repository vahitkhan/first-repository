const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const progressText = document.getElementById("progress-text");
const progress = document.getElementById("progress");
const scoreText = document.getElementById("score-text");

let currentQuestionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;

const questions = [
  
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true },
    ]
  },
  
  
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Central Style Sheets", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Computer Style Sheets", correct: false },
      { text: "Creative Style System", correct: false },
    ]
  },
  {
    question: "Which company developed JavaScript?",
    answers: [
      { text: "Microsoft", correct: false },
      { text: "Netscape", correct: true },
      { text: "Google", correct: false },
      { text: "Oracle", correct: false },
    ]
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    answers: [
      { text: "<script>", correct: true },
      { text: "<js>", correct: false },
      { text: "<javascript>", correct: false },
      { text: "<code>", correct: false },
    ]
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    answers: [
      { text: "alert('Hello World');", correct: true },
      { text: "msg('Hello World');", correct: false },
      { text: "alertBox('Hello World');", correct: false },
      { text: "console.log('Hello World');", correct: false },
    ]
  }
];

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});
restartBtn.addEventListener("click", startQuiz);

function startQuiz() {
  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  currentQuestionIndex = 0;
  correctAnswers = 0;
  wrongAnswers = 0;
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  progress.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

  currentQuestion.answers.forEach(answer => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.addEventListener("click", () => selectAnswer(button, answer.correct));
    li.appendChild(button);
    answerButtons.appendChild(li);
  });
}

function resetState() {
  nextBtn.classList.add("hidden");
  answerButtons.innerHTML = "";
}

function selectAnswer(button, correct) {
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach(btn => {
    btn.disabled = true;
  });

  if (correct) {
    button.classList.add("correct");
    correctAnswers++;
  } else {
    button.classList.add("wrong");
    wrongAnswers++;
  }

  nextBtn.classList.remove("hidden");
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  let percentage = Math.round((correctAnswers / questions.length) * 100);

  document.getElementById("percentage-text").textContent = percentage + "%";
  document.getElementById("summary-text").textContent = 
    `You scored ${correctAnswers} out of ${questions.length} questions correctly`;

  document.getElementById("correct-count").textContent = correctAnswers;
  document.getElementById("wrong-count").textContent = wrongAnswers;
}


