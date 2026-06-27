const quizData = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Home Tool Markup Language",
            "Hyper Tool Multi Language"
        ],
        answer: "Hyper Text Markup Language"
    },

    {
        question: "What is CSS used for?",
        options: [
            "Programming",
            "Styling",
            "Database",
            "Networking"
        ],
        answer: "Styling"
    },

    {
        question: "What is JavaScript used for?",
        options: [
            "Making websites interactive",
            "Typing documents",
            "Cooking food",
            "Printing papers"
        ],
        answer: "Making websites interactive"
    },

    {
        question: "What is the file extension of JavaScript?",
        options: [
            ".html",
            ".css",
            ".js",
            ".java"
        ],
        answer: ".js"
    },

    {
        question: "Which CSS feature is used to create responsive designs?",
        options: [
            "Arrays",
            "Loops",
            "Functions",
            "Media Queries"
        ],
        answer: "Media Queries"
    }
];

let currentQuestion = 0;
let score = 0;

const question = document.getElementById("question");
const options = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const result = document.getElementById("result");
const restartBtn = document.getElementById("restartBtn");

function loadQuestion() {

    const q = quizData[currentQuestion];

    question.textContent =
        `${currentQuestion + 1}. ${q.question}`;

    options.innerHTML = "";

    q.options.forEach((option, index) => {

    const btn = document.createElement("button");

    const labels = ["A", "B", "C", "D"];
    btn.innerText = `${labels[index]}. ${option}`;

        btn.classList.add("option-btn");

        btn.addEventListener("click", () => {

            Array.from(options.children).forEach(button => {
                button.disabled = true;

                if(button.innerText.includes(q.answer)){
                    button.classList.add("correct");
                }
            });

            if(option === q.answer){
                score++;
            } else {
                btn.classList.add("wrong");
            }
        });

        options.appendChild(btn);
    });
}

nextBtn.addEventListener("click", () => {

    currentQuestion++;

    if(currentQuestion < quizData.length){
        loadQuestion();
    }
    else{

        const percentage =
            (score / quizData.length) * 100;

        question.textContent = "Quiz Completed 🎉";

        options.innerHTML = "";

        result.innerHTML =
            `Score: ${score}/${quizData.length}<br>
             Percentage: ${percentage}%`;

        nextBtn.style.display = "none";

        restartBtn.style.display = "block";
    }
});

restartBtn.addEventListener("click", () => {

    currentQuestion = 0;
    score = 0;

    result.innerHTML = "";

    nextBtn.style.display = "block";

    restartBtn.style.display = "none";

    loadQuestion();
});

loadQuestion();


// Joke API
document.getElementById("jokeBtn")
.addEventListener("click", () => {

    fetch("https://official-joke-api.appspot.com/random_joke")
    .then(response => response.json())
    .then(data => {

        document.getElementById("joke").innerHTML =
            `${data.setup}<br><br>${data.punchline}`;
    })
    .catch(() => {

        document.getElementById("joke").innerText =
            "The joke couldn't be downloaded.";
    });
});