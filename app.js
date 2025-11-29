
let againBtn = document.getElementById('againBtn')
let resetBtn = document.getElementById('resetBtn')
let saveNameBtn = document.getElementById('saveNameBtn')
let input = document.getElementById('input')
let checkBtn = document.getElementById('checkBtn')
let scoringText = document.getElementById('scoringText')
let nameModal = document.getElementById('nameModal')
let playerNameInput = document.getElementById('playerNameInput')
let text = document.getElementById('text')

let scoringChildren = scoringText.children

let score = 20
let highScore = Number(localStorage.getItem('highScore')) || 0;

let wonSound = new Audio('../sounds/won-sound.wav')
let clickSound = new Audio('../sounds/click-sound.wav')
let againSound = new Audio('../sounds/game-start-sound.mp3')

let savedName = localStorage.getItem('playerName');

if (savedName) {
    nameModal.style.display = 'none';
} else {
    nameModal.style.display = 'flex';
}

saveNameBtn.addEventListener('click', () => {
    let name = playerNameInput.value.trim();
    if (!name) return text.textContent = "Enter Your Name";
    text.textContent = ''
    localStorage.setItem('playerName', name);
    savedName = name;
    scoringChildren[1].textContent = `${name} | Score : ${score}`;
    scoringChildren[2].textContent = `${name} | High Score : ${highScore}`;
    nameModal.style.display = 'none';
})



function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

function playWonSound() {
    wonSound.currentTime = 0;
    wonSound.play();
}

function startAgainSound() {
    againSound.currentTime = 0;
    againSound.play();
}

scoringChildren[1].textContent = `${savedName} | Score : ${score}`
scoringChildren[2].textContent = `${savedName} | High Score : ${highScore}`

let generateRandomNumber = Math.ceil(Math.random() * 20)

function scoreHandling(score, message, didWin, name) {
    scoringChildren[0].textContent = message
    scoringChildren[1].textContent = `${name} | Score : ${score}`

    if (didWin && score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore)
    }

    scoringChildren[2].textContent = `${name} | High Score : ${highScore}`;
}

checkBtn.addEventListener('click', () => {
    let guess = Number(input.value);
    if (!guess) return alert('Enter Number')
    if (guess > 20) return alert('Enter Number 1 to 20')
    playClickSound()
    document.getElementById("box").textContent = '?';
    let message;
    if (guess == generateRandomNumber) {
        playWonSound()
        score++
        message = 'You Won'
        scoreHandling(score, message, true, savedName);
        document.getElementById("box").textContent = generateRandomNumber;
        input.value = ''
    }
    else {
        if (score < 1) return alert('Game Over Please Start Again Game')
        let diff = guess - generateRandomNumber
        score--
        if (diff < 0) {
            if (diff == -1 || diff == -2) {
                message = 'You Are Low but very close'
            } else {
                message = 'You Are Low'
            }
        }
        if (diff > 0) {
            if (diff == 1 || diff == 2) {
                message = 'You Are High but very close'
            } else {
                message = 'You Are high'
            }
        }
        scoreHandling(score, message, false, savedName);
    }
})

againBtn.addEventListener('click', () => {
    startAgainSound()
    generateRandomNumber = Math.ceil(Math.random() * 20)
    score = 20
    scoringChildren[1].textContent = `${savedName} | Score : ${score}`
    scoringChildren[0].textContent = 'Start guessing...'
    document.getElementById("box").textContent = "?";
})

resetBtn.addEventListener('click', () => {
    startAgainSound()
    generateRandomNumber = Math.ceil(Math.random() * 20)
    input.value = ''
    highScore = 0
    localStorage.removeItem('highScore');
    localStorage.removeItem('playerName');
    savedName = null;
    playerNameInput.value = "";
    nameModal.style.display = 'flex';

    score = 20;
    scoringChildren[0].textContent = 'Start guessing...';
    scoringChildren[1].textContent = `Name | Score : ${score}`;
    scoringChildren[2].textContent = `Name | High Score : 0`;
    document.getElementById("box").textContent = "?";
})