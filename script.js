document.getElementById('calculate').addEventListener('click', calculateGrades);

// Add event listeners to all input fields to update module grades on change
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', updateModuleGrade);
});

function updateModuleGrade(event) {
    const row = event.target.closest('tr');
    const type = row.dataset.type;
    
    switch(type) {
        case '1':
            calculateType1Grade(row);
            break;
        case '2':
            calculateType2Grade(row);
            break;
        case '3':
            calculateType3Grade(row);
            break;
    }
}

function updateGradeDisplay(element, grade) {
    element.textContent = grade > 0 ? grade.toFixed(2) : '-';
    if (grade > 0) {
        element.classList.remove('fail', 'pass');
        element.classList.add(grade < 10 ? 'fail' : 'pass');
    } else {
        element.classList.remove('fail', 'pass');
    }
}

function calculateType1Grade(row) {
    const td = parseFloat(row.querySelector('.td-score').value) || 0;
    const tp = parseFloat(row.querySelector('.tp-score').value) || 0;
    const exam = parseFloat(row.querySelector('.exam-score').value) || 0;

    const moduleGrade = (td * 0.2) + (tp * 0.2) + (exam * 0.6);
    updateGradeDisplay(row.querySelector('.module-grade'), moduleGrade);
}

function calculateType2Grade(row) {
    const td = parseFloat(row.querySelector('.td-score').value) || 0;
    const exam = parseFloat(row.querySelector('.exam-score').value) || 0;

    const moduleGrade = (td * 0.4) + (exam * 0.6);
    updateGradeDisplay(row.querySelector('.module-grade'), moduleGrade);
}

function calculateType3Grade(row) {
    const exam = parseFloat(row.querySelector('.exam-score').value) || 0;
    updateGradeDisplay(row.querySelector('.module-grade'), exam);
}

function calculateGrades() {
    let totalPoints = 0;
    let totalCoefficient = 0;

    document.querySelectorAll('#gradesTable tbody tr').forEach(row => {
        const type = row.dataset.type;
        let moduleGrade = 0;
        let coefficient = 1; // default coefficient

        switch(type) {
            case '1':
                const td1 = parseFloat(row.querySelector('.td-score').value) || 0;
                const tp1 = parseFloat(row.querySelector('.tp-score').value) || 0;
                const exam1 = parseFloat(row.querySelector('.exam-score').value) || 0;
                if (td1 > 0 || tp1 > 0 || exam1 > 0) {
                    moduleGrade = (td1 * 0.2) + (tp1 * 0.2) + (exam1 * 0.6);
                    coefficient = 4; // Type 1 coefficient
                }
                break;
            case '2':
                const td2 = parseFloat(row.querySelector('.td-score').value) || 0;
                const exam2 = parseFloat(row.querySelector('.exam-score').value) || 0;
                if (td2 > 0 || exam2 > 0) {
                    moduleGrade = (td2 * 0.4) + (exam2 * 0.6);
                    coefficient = 2; // Type 2 coefficient
                }
                break;
            case '3':
                const exam3 = parseFloat(row.querySelector('.exam-score').value) || 0;
                if (exam3 > 0) {
                    moduleGrade = exam3;
                    coefficient = 1; // Type 3 coefficient
                }
                break;
        }

        if (moduleGrade > 0) {
            totalPoints += moduleGrade * coefficient;
            totalCoefficient += coefficient;
            row.querySelector('.module-grade').textContent = moduleGrade.toFixed(2);
        }
    });

    const average = totalCoefficient > 0 ? (totalPoints / totalCoefficient).toFixed(2) : 0;
    const gpaElement = document.getElementById('gpa');
    gpaElement.textContent = average;
    gpaElement.classList.remove('fail', 'pass');
    gpaElement.classList.add(average < 10 ? 'fail' : 'pass');
}

function getLetterGrade(average) {
    if (average >= 16) return 'Excellent';
    if (average >= 14) return 'Very Good';
    if (average >= 12) return 'Good';
    if (average >= 10) return 'Pass';
    return 'Fail';
} 