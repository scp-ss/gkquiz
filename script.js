let questions = [];
let currentIndex = 0;
let selectedLength = 0;
let startTime = 0;
let timeSpent = [];
let results = [];
let timerInterval;

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

async function startQuiz(length) {
    try {
        const res = await fetch('database.json');
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        questions = [...data.questions];

        if (length !== 'all') {
            questions = questions.slice(0, length);
        }

        questions = shuffle(questions);
        selectedLength = questions.length;

        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('quiz-screen').style.display = 'block';

        currentIndex = 0;
        timeSpent = [];
        results = [];
        showQuestion();
    } catch (error) {
        console.error('Error loading quiz data:', error);
        alert('Failed to load quiz data. Please ensure database.json is present and accessible.');
    }
}

function showQuestion() {
    const q = questions[currentIndex];
    const box = document.getElementById('question-box');
    if (!box) return;

    box.innerHTML = `<h3>${q.question}</h3><div class="options-row">`;

    const optionKeys = Object.keys(q.options);
    const shuffledKeys = shuffle(optionKeys);

    for (const key of shuffledKeys) {
        box.innerHTML += `
            <label class="option-inline">
                <input type="radio" name="answer" value="${key}" />
                ${q.options[key]}
            </label>
        `;
    }

    box.innerHTML += `</div>`;

    startTime = Date.now();
    const timerEl = document.getElementById('timer');
    if (timerEl) timerEl.textContent = 'Time: 0s';

    timerInterval = setInterval(() => {
        if (document.getElementById('quiz-screen').style.display === 'none') {
            clearInterval(timerInterval);
        } else {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            if (timerEl) timerEl.textContent = `Time: ${elapsed}s`;
        }
    }, 1000);
}

function nextQuestion() {
    console.log('nextQuestion called, currentIndex:', currentIndex, 'selectedLength:', selectedLength);
    const selected = document.querySelector('input[name="answer"]:checked');
    const correctKey = questions[currentIndex].correct_option;
    const time = Math.floor((Date.now() - startTime) / 1000);
    const qid = questions[currentIndex].id;

    let status = 'skipped';
    if (selected) {
        status = selected.value === correctKey ? 'correct' : 'incorrect';
        selected.parentElement.classList.add('correct');
    }

    timeSpent.push({ id: qid, time });
    results.push({ id: qid, status });

    currentIndex++;
    if (currentIndex < selectedLength) {
        showQuestion();
    } else {
        showEndScreen();
    }
}

function showEndScreen() {
    clearInterval(timerInterval);
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('end-screen').style.display = 'block';
}

function showResults() {
    document.getElementById('end-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';

    const report = document.getElementById('time-report');
    if (!report) return;
    report.innerHTML = '';

    // Calculate statistics
    const totalTime = timeSpent.reduce((sum, item) => sum + item.time, 0);
    const avgTime = totalTime / timeSpent.length;
    const correctCount = results.filter(r => r.status === 'correct').length;
    const incorrectCount = results.filter(r => r.status === 'incorrect').length;
    const skippedCount = results.filter(r => r.status === 'skipped').length;

    // Format total time as hr:min:sec:milisec
    const hours = Math.floor(totalTime / 3600);
    const minutes = Math.floor((totalTime % 3600) / 60);
    const seconds = totalTime % 60;
    const milliseconds = 0; // Since time is in seconds, no milliseconds
    const formattedTotalTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;

    // Add summary
    const summary = document.createElement('li');
    summary.innerHTML = `<strong>Total Time: ${formattedTotalTime}</strong><br>
                         <strong>Average Time per Question: ${avgTime.toFixed(2)}s</strong><br>
                         <strong>Correct: ${correctCount}, Incorrect: ${incorrectCount}, Skipped: ${skippedCount}</strong>`;
    report.appendChild(summary);

    // Add individual question times
    results.forEach((r, i) => {
        const time = timeSpent[i].time;
        const li = document.createElement('li');
        li.textContent = `Question ID ${r.id}: ${r.status.toUpperCase()} (${time}s)`;
        li.className = r.status;
        report.appendChild(li);
    });
}

// Ensure DOM is ready before accessing elements
window.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => startQuiz('all'));
    }

    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', nextQuestion);
    } else {
        console.error('Next button not found');
    }
});
