// Quiz State Management
let quizState = {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    timerInterval: null,
    timeRemaining: 30,
    isAnswered: false,
    quizStarted: false
};

// Local Storage Keys
const STORAGE_KEYS = {
    HIGH_SCORE: 'quizHighScore',
    ATTEMPTS: 'quizAttempts',
    QUIZ_HISTORY: 'quizHistory'
};

// Initialize App
document.addEventListener('DOMContentLoaded', loadQuestions);

// Load questions from JSON
async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        const data = await response.json();
        quizState.questions = data.questions;
        loadHomeScreen();
    } catch (error) {
        console.error('Error loading questions:', error);
        alert('Failed to load questions. Please refresh the page.');
    }
}

// Load Home Screen
function loadHomeScreen() {
    const highScore = localStorage.getItem(STORAGE_KEYS.HIGH_SCORE) || '0/15';
    const attempts = localStorage.getItem(STORAGE_KEYS.ATTEMPTS) || '0';
    
    document.getElementById('highScore').textContent = highScore;
    document.getElementById('attempts').textContent = attempts;
    
    showScreen('homeScreen');
}

// Start Quiz
function startQuiz() {
    // Shuffle questions
    quizState.questions = shuffleArray([...quizState.questions]);
    
    // Reset state
    quizState.currentQuestionIndex = 0;
    quizState.score = 0;
    quizState.answers = [];
    quizState.isAnswered = false;
    quizState.quizStarted = true;
    
    showScreen('quizScreen');
    loadQuestion();
}

// Load Current Question
function loadQuestion() {
    const question = quizState.questions[quizState.currentQuestionIndex];
    
    // Update header
    document.getElementById('currentQuestion').textContent = quizState.currentQuestionIndex + 1;
    document.getElementById('scoreDisplay').textContent = quizState.score;
    
    // Load question text
    document.getElementById('questionText').textContent = question.question;
    
    // Load options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectOption(index);
        optionDiv.id = `option-${index}`;
        optionsContainer.appendChild(optionDiv);
    });
    
    // Reset timer and next button
    quizState.isAnswered = false;
    quizState.timeRemaining = 30;
    document.getElementById('nextBtn').disabled = true;
    document.getElementById('nextBtn').textContent = 'Next Question';
    
    // Clear any existing timer
    if (quizState.timerInterval) clearInterval(quizState.timerInterval);
    
    // Start timer
    startTimer();
}

// Select Option
function selectOption(index) {
    if (quizState.isAnswered) return;
    
    const question = quizState.questions[quizState.currentQuestionIndex];
    const correctIndex = question.correct;
    
    // Mark as answered
    quizState.isAnswered = true;
    
    // Disable all options
    document.querySelectorAll('.option').forEach((opt, idx) => {
        opt.classList.add('disabled');
        
        if (idx === correctIndex) {
            opt.classList.add('correct');
        } else if (idx === index && idx !== correctIndex) {
            opt.classList.add('incorrect');
        }
    });
    
    // Check if correct
    const isCorrect = index === correctIndex;
    if (isCorrect) {
        quizState.score++;
    }
    
    // Store answer
    quizState.answers.push({
        question: question.question,
        userAnswer: question.options[index],
        correctAnswer: question.options[correctIndex],
        isCorrect: isCorrect,
        questionId: question.id
    });
    
    // Stop timer
    if (quizState.timerInterval) clearInterval(quizState.timerInterval);
    
    // Enable next button
    document.getElementById('nextBtn').disabled = false;
    
    // Update score display
    document.getElementById('scoreDisplay').textContent = quizState.score;
}

// Timer Function
function startTimer() {
    const timerEl = document.getElementById('timer');
    const progressFill = document.getElementById('progressFill');
    const startTime = 30;
    
    quizState.timerInterval = setInterval(() => {
        quizState.timeRemaining--;
        
        // Update timer display
        timerEl.textContent = quizState.timeRemaining;
        
        // Update progress bar
        const percentage = (quizState.timeRemaining / startTime) * 100;
        progressFill.style.width = percentage + '%';
        
        // Update timer color
        timerEl.classList.remove('warning', 'danger');
        if (quizState.timeRemaining <= 5) {
            timerEl.classList.add('danger');
        } else if (quizState.timeRemaining <= 10) {
            timerEl.classList.add('warning');
        }
        
        // Auto-submit when time runs out
        if (quizState.timeRemaining <= 0) {
            clearInterval(quizState.timerInterval);
            if (!quizState.isAnswered) {
                // Auto-select wrong answer (index -1 means no selection)
                const question = quizState.questions[quizState.currentQuestionIndex];
                quizState.isAnswered = true;
                
                // Disable all options
                document.querySelectorAll('.option').forEach((opt, idx) => {
                    opt.classList.add('disabled');
                    if (idx === question.correct) {
                        opt.classList.add('correct');
                    }
                });
                
                // Store unanswered question as wrong
                quizState.answers.push({
                    question: question.question,
                    userAnswer: 'No answer (Time out)',
                    correctAnswer: question.options[question.correct],
                    isCorrect: false,
                    questionId: question.id
                });
                
                // Enable next button
                document.getElementById('nextBtn').disabled = false;
            }
        }
    }, 1000);
}

// Next Question
function nextQuestion() {
    quizState.currentQuestionIndex++;
    
    if (quizState.currentQuestionIndex < quizState.questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

// End Quiz
function endQuiz() {
    // Clear timer
    if (quizState.timerInterval) clearInterval(quizState.timerInterval);
    
    // Update high score and attempts
    updateScoreHistory();
    
    // Show results
    showResults();
}

// Update Score History
function updateScoreHistory() {
    const highScoreStr = localStorage.getItem(STORAGE_KEYS.HIGH_SCORE) || '0/15';
    const [highScoreNum] = highScoreStr.split('/').map(Number);
    const attempts = parseInt(localStorage.getItem(STORAGE_KEYS.ATTEMPTS) || '0') + 1;
    
    if (quizState.score > highScoreNum) {
        localStorage.setItem(STORAGE_KEYS.HIGH_SCORE, `${quizState.score}/15`);
    }
    
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, attempts.toString());
    
    // Save quiz history
    let history = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY) || '[]');
    history.push({
        score: quizState.score,
        timestamp: new Date().toLocaleString(),
        answers: quizState.answers
    });
    
    // Keep only last 10 attempts
    if (history.length > 10) {
        history = history.slice(-10);
    }
    
    localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(history));
}

// Show Results
function showResults() {
    const percentage = (quizState.score / 15) * 100;
    
    // Determine message based on score
    let message, subtext;
    
    if (percentage === 100) {
        message = '🎉 Perfect Score!';
        subtext = 'You are a tech expert!';
    } else if (percentage >= 80) {
        message = '🎯 Excellent!';
        subtext = 'Outstanding performance!';
    } else if (percentage >= 60) {
        message = '👍 Good Job!';
        subtext = 'You did well!';
    } else if (percentage >= 40) {
        message = '📚 Keep Learning!';
        subtext = 'Practice makes perfect!';
    } else {
        message = '💪 Nice Try!';
        subtext = 'Review and try again!';
    }
    
    // Update results screen
    document.getElementById('finalScore').textContent = quizState.score;
    document.getElementById('resultMessage').textContent = message;
    document.getElementById('resultSubtext').textContent = subtext;
    
    // Generate summary
    generateSummary();
    
    // Show results screen
    showScreen('resultsScreen');
}

// Generate Answer Summary
function generateSummary() {
    const summaryList = document.getElementById('summaryList');
    summaryList.innerHTML = '';
    
    quizState.answers.forEach((answer, index) => {
        const item = document.createElement('div');
        item.className = `summary-item ${answer.isCorrect ? 'correct' : 'incorrect'}`;
        
        item.innerHTML = `
            <strong>Q${index + 1}: ${answer.question}</strong>
            <div>Your answer: ${answer.userAnswer}</div>
            ${!answer.isCorrect ? `<div>Correct answer: ${answer.correctAnswer}</div>` : ''}
            <div style="margin-top: 5px; font-size: 12px; opacity: 0.7;">
                ${answer.isCorrect ? '✓ Correct' : '✗ Incorrect'}
            </div>
        `;
        
        summaryList.appendChild(item);
    });
}

// Retake Quiz
function retakeQuiz() {
    startQuiz();
}

// Go Home
function goHome() {
    quizState.quizStarted = false;
    loadHomeScreen();
}

// Screen Management
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Utility: Shuffle Array (Fisher-Yates)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
