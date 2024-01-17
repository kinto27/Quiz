const questions = [
  {
    question: "Which is the capital of India?",
    answers: [
      { text: "Bangalore", correct: false },
      { text: "Chennai", correct: false },
      { text: "New Delhi", correct: true },
      { text: "Mumbai", correct: false },
    ],
  },
  {
    question: "What is 7 x 8",
    answers: [
      { text: "78", correct: false },
      { text: "56", correct: true },
      { text: "64", correct: false },
      { text: "46", correct: false },
    ],
  },
  {
    question: "How many continents are there in the world?",
    answers: [
      { text: "5", correct: false },
      { text: "6", correct: false },
      { text: "7", correct: true },
      { text: "8", correct: false },
    ],
  },
  // {
  //   question: "What is the best club in VIT?",
  //   answers: [
  //     { text: "Robovitics", correct: true },
  //     { text: "roboVITics", correct: true },
  //     { text: "ROBOVITICS", correct: true },
  //     { text: "robovitics", correct: true },
  //   ],
  // },
];

let questionElement = document.getElementById("question");
let answerButton = document.getElementById("ansButtons");
let nextButton = document.getElementById("nextButton");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
  nextButton.innerHTML = "Next";
}

function showQuestion() {
  resetState()
  let currentQuestion = questions[currentQuestionIndex];
  let quesNo = currentQuestionIndex + 1;
  questionElement.innerHTML = quesNo + ". " + currentQuestion.question;
  console.log(quesNo);

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("button");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer)
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild)
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct")
    score++
  } else {
    selectedBtn.classList.add("wrong")
  }

  Array.from(answerButton.children).forEach(button => {
    if (button.dataset.correct === true) {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block"; 
}

function showScore() {
  resetState();
  questionElement.innerHTML = "You scored " + score + " out of " + questions.length;
  nextButton.innerHTML = "Play again"
  nextButton.style.display = "block"
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
})

startQuiz();

