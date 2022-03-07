// game setup

const playArea = document.querySelector('.play-area');

const player = document.createElement('div');
player.classList.add('jess');

playArea.appendChild(player);

const boxArray = [];

let alphabet = ['b', 'c', 'd', 'a', 'e', 'i', 'o', 'u'];
alphabet = alphabet.sort(() => Math.random() - 0.5);
console.log(alphabet);

let boxLeft = 0;

spawnBoxes();

function spawnBoxes() {
    for (let letterIndex = 0; letterIndex < alphabet.length; letterIndex++) {
        const boxSpawn = document.createElement('div');
        const letterDisplay = document.createElement('p');
        boxSpawn.classList.add('box');
        boxSpawn.style.left = boxLeft + 'px';
        boxSpawn.id = alphabet[letterIndex];
        letterDisplay.innerHTML = boxSpawn.id
        playArea.appendChild(boxSpawn);
        boxSpawn.appendChild(letterDisplay);
        boxLeft += 150;
    }
}

const boxes = document.querySelectorAll('.box');

boxes.forEach(function (box) {
    boxArray.push(box)
})


// game loop

let word = 'coucou';
let boxId;
let guess;
let guessedLetters = ["_ ", "_ ", "_ ", "_ ", "_ ", "_"];
let lettersLeft = word.length
const wordDisplay = document.querySelector('.word-guesses');

function checkCharacter() {
    if (word.indexOf(guess) != -1) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] === guess) {
                guessedLetters[i] = guess;
                lettersLeft--;
            }
        }
    }

    wordDisplay.innerHTML = guessedLetters.join('');

    if (lettersLeft <= 0) {
        console.log("game over")
    }
}


// player movement

let currentPos = 0;
let jumpHeight = 0;
let onGround = true;

function slide(flip) {
    player.style.left = currentPos + 'px';
    flip === "left" ? player.style.transform = "scaleX(-1)" : player.style.transform = "scaleX(1)";
}

function jump() {
    if (!onGround) {
        return
    }
    let jumpTimerId = setInterval(function () {

        if (jumpHeight > 1) {
            clearInterval(jumpTimerId);
            let gravityTimerId = setInterval(function () {
                jumpHeight -= 45
                player.style.bottom = jumpHeight + 'px';
                if (jumpHeight < 0) {
                    clearInterval(gravityTimerId);
                    player.style.bottom = '0'
                    onGround = true
                }
            }, 20)
        }

        jumpHeight += 45
        player.style.bottom = jumpHeight + 'px';

        let boxNum;

        for (let i = 0; i < boxArray.length; i++) {
            boxNum = boxArray[i];

            let playerCollision = { x: parseInt(window.getComputedStyle(player).getPropertyValue("left")), y: parseInt(window.getComputedStyle(player).getPropertyValue("top")), width: 75, height: 160 };

            let boxCollision = { x: parseInt(window.getComputedStyle(boxNum).getPropertyValue("left")), y: parseInt(window.getComputedStyle(boxNum).getPropertyValue("top")), width: 25, height: 50 };

            if (playerCollision.x > boxCollision.x + boxCollision.width || playerCollision.x + playerCollision.width < boxCollision.x || playerCollision.y > boxCollision.y + boxCollision.height || playerCollision.y + playerCollision.height < boxCollision.y) {

            } else {
                guess = boxNum.id;
                checkCharacter();
            }
        }

    }, 20)
}

function move(e) {
    let min = 0;
    let max = 1000;
    if (currentPos <= min) {
        currentPos = min;
    } else if (currentPos >= max) {
        currentPos = max;
    }
    switch (e.key) {
        case 'ArrowLeft':
            currentPos -= 15
            slide("left")
            break
        case 'ArrowRight':
            currentPos += 15
            slide()
            break
        case ' ':
            e.preventDefault()
            jump()
            onGround = false
    }
}

document.addEventListener('keydown', move)