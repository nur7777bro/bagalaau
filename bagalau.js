// Оқушы бағалау функциясы
function evaluateStudent() {
    let name = document.getElementById('studentName').value.trim();
    let grade = document.getElementById('studentGrade').value.trim();

    if (!name || grade === '') {
        alert('Барлық өрістерді толтырыңыз!');
        return;
    }

    let resultText = '';
    let reaction = '';

    // Бағалау шарттары
    if (grade >= 9) {
        resultText = 'Өте жақсы!';
        reaction = '😊';
    } else if (grade >= 7) {
        resultText = 'Жақсы!';
        reaction = '🙂';
    } else if (grade >= 5) {
        resultText = 'Қанағаттанарлық.';
        reaction = '😐';
    } else {
        resultText = 'Қанағаттанарлықсыз.';
        reaction = '😞';
    }

    let evaluation = {
        name: name,
        grade: grade,
        result: `${resultText} ${reaction}`
    };

    // Алдыңғы бағаларды алу
    let history = JSON.parse(localStorage.getItem('evaluations')) || [];

    // Егер тарих 25 жазбадан асса, ең алғашқы жазбаны өшіреміз
    if (history.length >= 25) {
        history.shift();
    }

    // Жаңа жазбаны қосу
    history.push(evaluation);
    localStorage.setItem('evaluations', JSON.stringify(history));

    displayHistory();
}

// Бағалау тарихын көрсету
function displayHistory(history = []) {
    let historyContainer = document.getElementById('historyContainer');
    historyContainer.innerHTML = '';

    if (history.length === 0) {
        historyContainer.innerHTML = '<p>Ешқандай жазба табылмады.</p>';
    } else {
        history.forEach(item => {
            let studentCard = document.createElement('div');
            studentCard.classList.add('student-card');
            studentCard.innerHTML = `
                <h3>${item.name}</h3>
                <p>Бағасы: <strong>${item.grade}</strong></p>
                <p>${item.result}</p>
            `;
            historyContainer.appendChild(studentCard);
        });
    }
}

// Іздеу функциясы (Бағалау тарихынан өшіп кеткен оқушыларды іздеу)
function searchStudent() {
    let searchQuery = document.getElementById('searchName').value.trim().toLowerCase();
    let history = JSON.parse(localStorage.getItem('evaluations')) || [];
    let filteredHistory = history.filter(item => item.name.toLowerCase().includes(searchQuery));

    displayHistory(filteredHistory);
}

// Бетті жүктегенде тарихты көрсету
window.onload = displayHistory;
