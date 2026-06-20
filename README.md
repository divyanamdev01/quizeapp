# 🚀 Tech Quiz Challenge

A modern, interactive quiz application built with vanilla HTML, CSS, and JavaScript. Perfect for tech hackathons, educational platforms, and skill assessments.

---

## ✨ Features

- **One Question at a Time** - Clean, focused quiz experience with 4 options per question
- **Visual Feedback** - Correct answers turn green, incorrect answers turn red
- **Real-time Score Tracking** - Watch your score update as you progress
- **30-Second Timer** - Per-question countdown with visual warning system
- **Auto-Submit** - Automatically marks unanswered questions as incorrect when time runs out
- **Randomized Questions** - Questions shuffle each attempt for variety
- **Answer Summary** - Detailed review of all answers after quiz completion
- **Local Storage** - No backend needed; all data saved locally
  - High score tracking
  - Attempt history
  - Quiz history (last 10 attempts)
- **Retake Quiz** - Get new randomized questions on each attempt
- **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode Theme** - Modern, eye-friendly UI design with smooth animations

---

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Dark mode styling with flexbox/grid layout
- **Vanilla JavaScript** - No frameworks, pure ES6+
- **Local Storage API** - Browser-based data persistence
- **JSON** - Question data format

---

## 📁 Project Structure

```
d:\localhost\
├── index.html          # Main HTML file with all screens
├── styles.css          # Complete styling (dark mode, responsive)
├── script.js           # All JavaScript logic and state management
├── questions.json      # 15 tech quiz questions
└── README.md           # This file
```

---

## 🚀 How to Use

### Quick Start
1. Download/clone all files to a folder
2. Open `index.html` in any modern web browser
3. Click **"Start Quiz"** button
4. Answer all 15 questions
5. View your score and summary

### Running on a Local Server (Recommended)

If you encounter CORS issues:

**Using Python 3:**
```bash
cd d:\localhost
python -m http.server 8000
# Then visit: http://localhost:8000
```

**Using Node.js (http-server):**
```bash
cd d:\localhost
npx http-server
# Then visit: http://localhost:8080
```

**Using VS Code Live Server:**
- Install "Live Server" extension
- Right-click `index.html`
- Select "Open with Live Server"

---

## 📊 Screens

### 1. **Home Screen**
- Welcome message
- Display high score
- Show number of attempts
- Start button

### 2. **Quiz Screen**
- Current question counter (e.g., 1/15)
- Live score display
- Timer (30 seconds) with color indicators
- Question text
- 4 interactive option buttons
- Next button (enabled after selecting an answer)

### 3. **Results Screen**
- Final score in a circular badge
- Performance message (Perfect Score, Excellent, Good Job, etc.)
- Detailed answer summary with:
  - Each question
  - Your answer
  - Correct answer (if wrong)
  - Correct/Incorrect indicator
- Back to Home button
- Retake Quiz button

---

## 💾 Local Storage

The app saves the following data to browser's local storage:

### Storage Keys:
```javascript
{
  "quizHighScore": "13/15",              // Best score achieved
  "quizAttempts": "5",                   // Total number of attempts
  "quizHistory": [...]                   // Last 10 quiz attempts with full details
}
```

### Accessing Stored Data:
Open browser DevTools (F12) → Application → Local Storage → file:// 

To clear data:
```javascript
// In browser console
localStorage.clear();
```

---

## 🎨 Customization

### Add Your Own Questions

Edit `questions.json`:

```json
{
  "questions": [
    {
      "id": 1,
      "question": "Your question here?",
      "options": [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4"
      ],
      "correct": 0
    }
  ]
}
```

**Note:** The `correct` field is the **index** (0-3) of the correct answer.

### Change Timer Duration

In `script.js`, find and modify:
```javascript
quizState.timeRemaining = 30;  // Change 30 to your desired seconds
```

### Customize Colors

In `styles.css`, modify the CSS variables:
```css
:root {
    --primary: #6366f1;           /* Main theme color */
    --success: #10b981;           /* Correct answer green */
    --danger: #ef4444;            /* Incorrect answer red */
    --warning: #f59e0b;           /* Timer warning orange */
    --bg-dark: #0f172a;           /* Dark background */
    --text-primary: #f1f5f9;      /* Primary text color */
}
```

### Change High Score or Attempts Count

```javascript
// In script.js
localStorage.setItem('quizHighScore', '10/15');
localStorage.setItem('quizAttempts', '3');
```

---

## 📱 Responsive Breakpoints

- **Desktop:** 700px and above (full layout)
- **Tablet:** 600px to 699px (optimized spacing)
- **Mobile:** 480px to 599px (stacked layout)
- **Small Mobile:** Below 480px (minimal padding)

---

## 🔄 Quiz Flow

```
Home Screen
    ↓
[Click Start Quiz]
    ↓
Question 1-15
    ├─ Select Answer → Green/Red feedback
    ├─ Timer runs out → Auto-submit as wrong
    └─ [Next Question]
    ↓
Results Screen
    ├─ Display Score & Message
    ├─ Show Answer Summary
    └─ [Retake Quiz] or [Back to Home]
```

---

## 🌐 Browser Compatibility

✅ **Fully Supported:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

✅ **Features Used:**
- Fetch API
- LocalStorage API
- ES6+ JavaScript
- CSS3 Flexbox/Grid

---

## 📝 Quiz Content

The application includes **15 tech questions** covering:
- HTML/CSS/JavaScript basics
- Web development concepts
- Programming languages
- Databases (SQL/NoSQL)
- Git & Version Control
- APIs & REST
- Data Structures & Algorithms
- HTTP Methods
- Web Design

---

## 🎯 Performance

- **Load Time:** < 1 second
- **Quiz Interaction:** Real-time feedback (0ms)
- **Local Storage:** Instant data persistence
- **No External Dependencies:** Pure vanilla JavaScript

---

## 📄 License

Free to use for educational and hackathon purposes.

---

## 🤝 Support & Feedback

For issues or feature requests:
1. Check browser console (F12) for errors
2. Verify all files are in the same directory
3. Ensure `questions.json` is valid JSON
4. Clear cache if experiencing display issues

---

## 🎓 Educational Use

This quiz application is perfect for:
- **Hackathons** - Tech skill assessment
- **Coding Bootcamps** - Learning progress tracking
- **Online Courses** - Self-assessment
- **Classroom** - Student evaluation
- **Interviews** - Technical screening

---

## ✅ TODO / Future Enhancements

- [ ] Add category-based questions
- [ ] Implement difficulty levels
- [ ] Add leaderboard feature
- [ ] Export results as PDF
- [ ] Question feedback/explanations
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Analytics dashboard

---

**Built with ❤️ for Tech Hackathons**

Enjoy the quiz! 🚀
