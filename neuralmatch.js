const glow = document.querySelector('.cursor-glow');

window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

const calculateBtn = document.getElementById('calculateBtn');
const loading = document.getElementById('loading');
const percentageText = document.getElementById('percentage');
const messageText = document.getElementById('message');
const sound = document.getElementById('calcSound');

calculateBtn.addEventListener('click', () => {

    const name1 = document.getElementById('name1').value.trim().toLowerCase();
    const name2 = document.getElementById('name2').value.trim().toLowerCase();

    const age1 = parseInt(document.getElementById('age1').value);
    const age2 = parseInt(document.getElementById('age2').value);

    if (!name1 || !name2 || !age1 || !age2) {
        alert('Please complete all fields');
        return;
    }

if (
    name1 === '' ||
    name2 === '' ||
    isNaN(age1) ||
    isNaN(age2)
) {
    alert('Please complete all fields');
    return;
}

    loading.style.opacity = '1';

    document.body.classList.add('glitch');
    sound.currentTime = 0;
    sound.play(); 

    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
    }

    setTimeout(() => {

        document.body.classList.remove('glitch');

        loading.style.opacity = '0';

        let commonLetters = 0;

        for (let letter of name1) {
            if (name2.includes(letter)) {
                commonLetters++;
            }
        }

        const totalLetters = name1.length + name2.length;

        let lettersScore = ((commonLetters * 2) / totalLetters) * 100;

        lettersScore *= 2;

        const lengthDifference = Math.abs(name1.length - name2.length);

        let lengthScore = 100 - (lengthDifference * 15);

        if (lengthScore < 0) {
            lengthScore = 0;
        }

        const ageDifference = Math.abs(age1 - age2);

        let ageScore = 10;

        if (ageDifference === 0) {
            ageScore = 90;
        }
        else if (ageDifference === 1) {
            ageScore = 80;
        }
        else if (ageDifference === 2) {
            ageScore = 50;
        }
        else if (ageDifference === 3) {
            ageScore = 32;
        }

        ageScore *= 0.5;

        let finalScore = (lettersScore + lengthScore + ageScore) / 3;

        finalScore = Math.round(finalScore);

        if (finalScore > 100) {
            finalScore = 100;
        }

        if (finalScore < 0) {
            finalScore = 0;
        }

        animatePercentage(finalScore);

setTimeout(() => {
    sound.pause();
    sound.currentTime = 0;
}, finalScore * 20);

        if (finalScore <= 10) {
            messageText.textContent = 'Absolute disaster 💀';
        }
        else if (finalScore <= 30) {
            messageText.textContent = 'Maybe stay friends...';
        }
        else if (finalScore <= 60) {
            messageText.textContent = 'Interesting connection detected';
        }
        else if (finalScore <= 85) {
            messageText.textContent = 'Strong compatibility';
        }
        else {
            messageText.textContent = 'Soulmates detected ❤️';
        }

    }, 2500);
});

function animatePercentage(target) {

    let current = 0;

    const interval = setInterval(() => {

        percentageText.textContent = current + '%';

        current++;

        if (current > target) {
            clearInterval(interval);
        }

    }, 20);
}