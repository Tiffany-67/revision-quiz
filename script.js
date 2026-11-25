const questions = [
    {
        question: "What does len() do in Python?",
        options: ["Prints text", "Counts items", "Makes a list", "Adds numbers"],
        answer: 1
    },
    {
        question: "Which symbol starts a comment in Python?",
        options: ["//", "#", "--", "*"],
        answer: 1
    },
    {
        question: "What does range(1, 4) give?",
        options: ["1, 2, 3, 4", "0, 1, 2, 3", "1, 2, 3", "4"],
        answer: 2
    },
    {
        question: "Which function hands a value back to the program?",
        options: ["print", "return", "input", "show"],
        answer: 1
    },
    {
        question: "In CSS, what does display: flex do?",
        options: ["Hides a box", "Lines boxes up in a row", "Makes text bold", "Adds a border"],
        answer: 1
    }
];


const progressText = document.getElementById("progress");
const questionText = document.getElementById("question");
const optionsBox = document.getElementById("options");
const feedbackText = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const scoreText = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

let current = 0;
let score = 0;

function showQuestion() {
    const q = questions[current];
    progressText.textContent = `Question ${current + 1} of ${questions.length}`;
    questionText.textContent = q.question;
    feedbackText.textContent = "";
    optionsBox.innerHTML = "";
    nextBtn.style.display = "none";

    for (let i = 0; i < q.options.length; i++) {
        const button = document.createElement("button");
        button.textContent = q.options[i];
        button.className = "option";
        button.addEventListener("click", function () {
            checkAnswer(i);
        });
        optionsBox.appendChild(button);
    }
}

function checkAnswer(choice) {
    const q = questions[current];
    const buttons = optionsBox.querySelectorAll("button");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }
    if (choice === q.answer) {
        score = score + 1;
        feedbackText.textContent = "Correct!";
        buttons[choice].classList.add("correct");
    } else {
        feedbackText.textContent = `Not quite. The answer is: ${q.options[q.answer]}`;
        buttons[choice].classList.add("wrong");
        buttons[q.answer].classList.add("correct");
    }
    nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", function () {
    current = current + 1;
    if (current < questions.length) {
        showQuestion();
    } else {
        showResult();
}
});

function showResult() {
    progressText.textContent = "";
    questionText.textContent = "Quiz finished!";
    optionsBox.innerHTML = "";
    feedbackText.textContent = "";
    nextBtn.style.display = "none";
    scoreText.textContent = `You scored ${score} out of ${questions.length}.`;
    restartBtn.style.display = "block";
}

restartBtn.addEventListener("click", function () {
    current = 0;
    score = 0;
    scoreText.textContent = "";
    restartBtn.style.display = "none";
    showQuestion();
});

restartBtn.style.display = "none";
showQuestion();