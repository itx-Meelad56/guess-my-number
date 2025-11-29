
let againBtn = document.getElementById('againBtn')
let input = document.getElementById('input')
let checkBtn = document.getElementById('checkBtn')
let scoringText = document.getElementById('scoringText')

let wonSound = new Audio('../sounds/won-sound.wav')
let clickSound = new Audio('../sounds/click-sound.wav')
let againSound = new Audio('../sounds/game-start-sound.mp3')


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

let scoringChildren = scoringText.children

let score = 20

let highScore = Number(localStorage.getItem('highScore')) || 0;

scoringChildren[1].textContent = `Score : ${score}`
scoringChildren[2].textContent = `High Score : ${highScore}`


let generateRandomNumber = Math.ceil(Math.random() * 20)

function scoreHandling(score, message, didWin) {
    scoringChildren[0].textContent = message
    scoringChildren[1].textContent = `Score : ${score}`

    if (didWin && score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore)
    }

    scoringChildren[2].textContent = `High Score : ${highScore}`;
}

checkBtn.addEventListener('click', () => {
    if (!input.value) return alert('Enter Number')
    if (input.value > 20) return alert('Enter Number 1 to 20')
    playClickSound()
    document.getElementById("box").textContent = '?';
    let message;
    if (input.value == generateRandomNumber) {
        playWonSound()
        score++
        localStorage.setItem('high', score)
        message = 'You Won'
        scoreHandling(score, message, true);
        document.getElementById("box").textContent = generateRandomNumber;
        input.value = ''
    }
    else {
        let remainder = input.value - generateRandomNumber
        score--
        if (remainder < 0) {
            if (remainder == -1 || remainder == -2) {
                message = 'You Are Low but very close'
            } else {
                message = 'You Are Low'
            }
        }
        if (remainder > 0) {
            if (remainder == 1 || remainder == 2) {
                message = 'You Are High but very close'
            } else {
                message = 'You Are high'
            }
        }
        scoreHandling(score, message, false);
        if (score < 1) return alert('Game Over Please Start Again Game')
    }
})

againBtn.addEventListener('click', () => {
    startAgainSound()
    generateRandomNumber = Math.ceil(Math.random() * 20)
    score = 20
    scoringChildren[1].textContent = `Score : ${score}`
    scoringChildren[0].textContent = 'Start guessing...'
    document.getElementById("box").textContent = "?";
})