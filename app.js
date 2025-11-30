
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

playerNameInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        saveNameBtn.click()
    }
});

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

input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        checkBtn.click();
    }
});


let generateRandomNumber = Math.ceil(Math.random() * 20)

function showMessage(message, color, fontSize) {
    document.getElementById("box").textContent = message;
     document.getElementById("box").style.color = color;
     document.getElementById("box").style.fontSize = fontSize;
    setTimeout(() => {
         document.getElementById("box").textContent = '?';
         document.getElementById("box").style.color = 'black';
         document.getElementById("box").style.fontSize = '100px';
    }, 2000);
}


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
    if (!guess) return showMessage('Enter Number', 'red', '18px')
    if (guess > 20) return showMessage('Enter Number 1 to 20', 'red', '18px')
    playClickSound()
    let message;
    if (guess == generateRandomNumber) {
        playWonSound()
        score++
        message = 'You Won'
        scoreHandling(score, message, true, savedName);
        showMessage('You Won', 'green', '50px')
        input.value = ''
    }
    else {
        if (score < 1) return showMessage('Game Over! Please Start Again', '#FF3B30', '18px')
        let diff = guess - generateRandomNumber
        score--
        if (diff < 0) {
            if (diff == -1 || diff == -2) {
                message = 'You Are Low but very close'
                showMessage('Close guesses', '#FFA500', '30px')
            } else {
                message = 'You Are Low'
                showMessage('guesses Low', '#ff5e00ff', '30px')
            }
        }
        if (diff > 0) {
            if (diff == 1 || diff == 2) {
                message = 'You Are High but very close'
                showMessage('Close guesses', '#FFA500', '30px')
            } else {
                message = 'You Are high'
                showMessage('guesses High', '#ff5e00ff', '30px')
            }
        }
        scoreHandling(score, message, false, savedName);
    }
})

againBtn.addEventListener('click', () => {
    startAgainSound()
    generateRandomNumber = Math.ceil(Math.random() * 20)
    score = 20
    input.value = ''
    scoringChildren[1].textContent = `${savedName} | Score : ${score}`
    scoringChildren[0].textContent = 'Start guessing...'
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
})