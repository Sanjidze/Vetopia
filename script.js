function getValueOrZero(id) {
    const element = document.getElementById(id);
    if (!element) {
        console.log('Missing element:', id);
        return 0;
    }
    const value = parseFloat(element.value);
    return isNaN(value) ? 0 : value;
}

function calculateGPA() {
    try {
        const subjects = [
            { name: 'bact', coef: 2, hasTP: false },
            { name: 'vir', coef: 2, hasTP: false },
            { name: 'imm', coef: 2, hasTD: false, hasTP: true },
            { name: 'hist', coef: 2, hasTP: false },
            { name: 'anat', coef: 2, hasTP: true },
            { name: 'phys', coef: 3, hasTP: false },
            { name: 'repro', coef: 2, hasTP: false },
            { name: 'ethn', coef: 2, hasTP: true },
            { name: 'nutr', coef: 3, hasTP: true }
        ];

        let totalPoints = 0;
        let totalCoef = 0;

        subjects.forEach(subj => {
            const th = getValueOrZero(`${subj.name}_th`);
            const td = getValueOrZero(`${subj.name}_td`);
            const tp = getValueOrZero(`${subj.name}_tp`);

            let mark;
            if (subj.hasTP) {
                mark = (th * 0.6) + (td * 0.2) + (tp * 0.2);
            } else if (subj.hasTD === false) {
                mark = (th * 0.7) + (tp * 0.3);
            } else {
                mark = (th * 0.7) + (td * 0.3);
            }

            totalPoints += mark * subj.coef;
            totalCoef += subj.coef;
        });

        const gpa = totalPoints / totalCoef;
        document.getElementById('result').textContent = `GPA: ${gpa.toFixed(2)}`;
    } catch (error) {
        document.getElementById('result').textContent = `Error: ${error.message}`;
        console.error('Calculation error:', error);
    }
}