const quizData = [
  {
    question: "Which is the most popular JavaScript framework?",
    options: ["Angular", "React", "Svelte", "Vue"],
    correctOption: 1,
    points: 10,
  },
  {
    question: "Which company invented React?",
    options: ["Google", "Apple", "Netflix", "Facebook"],
    correctOption: 3,
    points: 10,
  },
  {
    question: "What's the fundamental building block of React apps?",
    options: ["Components", "Blocks", "Elements", "Effects"],
    correctOption: 0,
    points: 10,
  },
  {
    question:
      "What's the name of the syntax we use to describe the UI in React components?",
    options: ["FBJ", "Babel", "JSX", "ES2015"],
    correctOption: 2,
    points: 10,
  },
  {
    question: "How does data flow naturally in React apps?",
    options: [
      "From parents to children",
      "From children to parents",
      "Both ways",
      "The developers decides",
    ],
    correctOption: 0,
    points: 10,
  },
  {
    question: "How to pass data into a child component?",
    options: ["State", "Props", "PropTypes", "Parameters"],
    correctOption: 1,
    points: 10,
  },
  {
    question: "When to use derived state?",
    options: [
      "Whenever the state should not trigger a re-render",
      "Whenever the state can be synchronized with an effect",
      "Whenever the state should be accessible to all components",
      "Whenever the state can be computed from another state variable",
    ],
    correctOption: 3,
    points: 30,
  },
  {
    question: "What triggers a UI re-render in React?",
    options: [
      "Running an effect",
      "Passing props",
      "Updating state",
      "Adding event listeners to DOM elements",
    ],
    correctOption: 2,
    points: 20,
  },
  {
    question: 'When do we directly "touch" the DOM in React?',
    options: [
      "When we need to listen to an event",
      "When we need to change the UI",
      "When we need to add styles",
      "Almost never",
    ],
    correctOption: 3,
    points: 20,
  },
  {
    question: "In what situation do we use a callback to update state?",
    options: [
      "When updating the state will be slow",
      "When the updated state is very data-intensive",
      "When the state update should happen faster",
      "When the new state depends on the previous state",
    ],
    correctOption: 3,
    points: 30,
  },
  {
    question:
      "If we pass a function to useState, when will that function be called?",
    options: [
      "On each re-render",
      "Each time we update the state",
      "Only on the initial render",
      "The first time we update the state",
    ],
    correctOption: 2,
    points: 30,
  },
  {
    question:
      "Which hook to use for an API request on the component's initial render?",
    options: ["useState", "useEffect", "useRef", "useReducer"],
    correctOption: 1,
    points: 10,
  },
  {
    question: "Which variables should go into the useEffect dependency array?",
    options: [
      "Usually none",
      "All our state variables",
      "All state and props referenced in the effect",
      "All variables needed for clean up",
    ],
    correctOption: 2,
    points: 30,
  },
  {
    question: "An effect will always run on the initial render.",
    options: [
      "True",
      "It depends on the dependency array",
      "False",
      "In depends on the code in the effect",
    ],
    correctOption: 0,
    points: 30,
  },
  {
    question: "When will an effect run if it doesn't have a dependency array?",
    options: [
      "Only when the component mounts",
      "Only when the component unmounts",
      "The first time the component re-renders",
      "Each time the component is re-rendered",
    ],
    correctOption: 3,
    points: 20,
  },
];

let result = document.getElementById("result");
let progressBar = document.getElementById("progress-bar");
let restartBtn = document.getElementById("restart");

let timer = document.querySelector(".timer");
let question = document.querySelector(".question");
let options = document.querySelector(".options");

let scoreEl = document.getElementById("score");

let score = 0;
let currentQuestion = 0;
let timeleft = 30;
let timerInterval;

let quizLoad = function () {
  if (currentQuestion >= quizData.length) {
    quizEnd();
    return;
  }

  let currentQuiz = quizData[currentQuestion];
  question.textContent = currentQuiz.question;
  options.innerHTML = "";
  currentQuiz.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.classList.add("option");
    button.textContent = option;
    button.addEventListener("click", () => {
      checkAnswer(index);
    });
    options.appendChild(button);
  });
  progressBar.style.width = (currentQuestion / quizData.length) * 100 + "%";
};
quizLoad();
function checkAnswer(selectOptionsIndex) {
  if (selectOptionsIndex === quizData[currentQuestion].correctOption) {
    scoreEl.innerHTML = score += quizData[currentQuestion].points;
  }
  currentQuestion++;
  quizLoad();
}

const startTimer = function startTimer() {
  timerInterval = setInterval(() => {
    timeleft--;
    timer.textContent = timeleft;
    if (timeleft <= 0) {
      clearInterval(timerInterval);
      quizEnd();
    }
  }, 1000);
};
startTimer();

let quizEnd = function () {
  clearInterval(timerInterval);
  question.style.display = "none";
  options.style.display = "none";
  result.style.display = "block";
  score.textContent = score;
  restartBtn.style.display = "block";
};

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  timeleft = 30;
  timer.textContent = timeleft;

  question.style.display = "block";
  options.style.display = "block";
  result.style.display = "none";
  restartBtn.style.display = "none";
  quizLoad();
  startTimer();
});
