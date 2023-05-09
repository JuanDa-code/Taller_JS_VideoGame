const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const h3Results = document.querySelector('#results');
const h4Previous_Record = document.querySelector('#previous_record');
const buttonReload = document.querySelector('#buttonReload');

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timePlayer;
let timeInterval;
let timeStart;

const playerPosition = {
    x: undefined,
    y: undefined,
};

const giftPosition = {
    x: undefined,
    y: undefined,
};

let enemyPositions = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.7;
    } else {
        canvasSize = window.innerHeight * 0.7;
    }

    canvasSize = Number(canvasSize.toFixed(0));

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize / 10;

    playerPosition.x = undefined;
    playerPosition.y = undefined;

    startGame();
}

function startGame() {
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[level];

    if (!map) {
        gameWin();
        return;
    }

    if (!timeStart) {
        timeStart = Date.now();

        timeInterval = setInterval(showTime, 100);
    }

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));

    showLives();

    enemyPositions = [];
    game.clearRect(0, 0, canvasSize, canvasSize);

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = (elementsSize * (colI + 1) + 10);
            const posY = (elementsSize * (rowI + 1) - 5);

            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                }
            } else if (col == 'I') {
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if (col == 'X') {
                enemyPositions.push({
                    x: posX,
                    y: posY,
                });
            }

            game.fillText(emoji, posX, posY);
        });
    });

    movePlayer();

    if (localStorage.getItem('record_time')) {
        h4Previous_Record.innerHTML = `Record anterior: 🏁 ${localStorage.getItem('record_time')} seg.`;
    } else {
        h4Previous_Record.innerHTML = `Aun no tienes un record, juega para tener tu primer record`
    }
}

function movePlayer() {
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;

    if (playerPosition.x < elementsSize) {
        playerPosition.x = elementsSize + 10;
    }

    if (playerPosition.y < elementsSize) {
        playerPosition.y = elementsSize - 5;
    }

    if (playerPosition.x > elementsSize * 10) {
        playerPosition.x = (elementsSize * 10) + 10;
    }

    if (playerPosition.y > elementsSize * 10) {
        playerPosition.y = (elementsSize * 10) - 5;
    }

    if (giftCollision) {
        levelWin();
    }

    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
        const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
        return enemyCollisionX && enemyCollisionY;
    });

    if (enemyCollision) {
        levelFail();
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin() {
    console.log('Subiste de nivel');
    level++;
    startGame();
}

function levelFail() {
    console.log('Chocaste contra un enemigo :(');
    lives--;

    console.log(lives);

    if (lives <= 0) {
        level = 0;
        lives = 3;
        timeStart = undefined;
    }

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function gameWin() {
    clearInterval(timeInterval);
    timePlayer = +((Date.now() - timeStart) / 1000);
    const record = localStorage.getItem('record_time');
    buttonReload.innerHTML = `<button onclick="location.reload()">Reiniciar juego</button>`;

    if (!record) {
        localStorage.setItem('record_time', timePlayer);
        h3Results.innerHTML = `Felicidades! Terminaste el juego. Intenta superar tu tiempo. ${timePlayer}`;
    } else {
        if (timePlayer < record) {
            localStorage.setItem('record_time', timePlayer);
            h3Results.innerHTML = `Tu nuevo record es de ${timePlayer} seg. !!`;
        } else {
            h3Results.innerHTML = `Lo siento no superaste el record, vuelve a intentarlo.`;
        }
    }
}

function showLives() {
    spanLives.innerHTML = emojis['HEART'].repeat(lives);
}

function showTime() {
    spanTime.innerHTML = +((Date.now() - timeStart) / 1000);
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowDown':
            moveDown();
            break;
    }
}

function moveUp() {
    playerPosition.y -= elementsSize;
    startGame();
};

function moveLeft() {
    playerPosition.x -= elementsSize;
    startGame();
};

function moveRight() {
    playerPosition.x += elementsSize;
    startGame();
};

function moveDown() {
    playerPosition.y += elementsSize;
    startGame();
};