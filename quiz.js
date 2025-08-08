const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    }
];

const questionTextEl = document.getElementById('question-text');
const optionsContainerEl = document.getElementById('options-container');
const nextButtonEl = document.getElementById('next-button');
const scoreDisplayEl = document.getElementById('score-display');

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
    // Reset state for a new question
    optionsContainerEl.innerHTML = '';
    nextButtonEl.style.display = 'none';

    // Display the current question and score
    const currentQuestion = questions[currentQuestionIndex];
    questionTextEl.textContent = currentQuestion.question;
    scoreDisplayEl.textContent = `Score: ${score} / ${currentQuestionIndex}`;

    // Create and display the options
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        optionsContainerEl.appendChild(button);
        button.addEventListener('click', () => selectAnswer(option));
    });
}

function selectAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];

    // Check if the selected answer is correct
    if (selectedOption === currentQuestion.answer) {
        score++;
    }

    // Highlight the correct and incorrect answers
    Array.from(optionsContainerEl.children).forEach(button => {
        if (button.textContent === currentQuestion.answer) {
            button.classList.add('correct');
        } else if (button.textContent === selectedOption) {
            button.classList.add('incorrect');
        }
        button.disabled = true; // Disable all buttons after a choice is made
    });

    nextButtonEl.style.display = 'block'; // Show the "Next Question" button
    scoreDisplayEl.textContent = `Score: ${score} / ${currentQuestionIndex + 1}`;
}

function showFinalResults() {
    questionTextEl.textContent = "Quiz Complete!";
    optionsContainerEl.innerHTML = '';
    nextButtonEl.style.display = 'none';
    scoreDisplayEl.textContent = `Final Score: ${score} / ${questions.length}`;
}

nextButtonEl.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showFinalResults();
    }
});

// Start the quiz
showQuestion();