const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementsSize;

window.addEventListener('load', setCanvasSizes);
window.addEventListener('resize', setCanvasSizes);

function setCanvasSizes() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = (canvasSize / 10) - 1;

    startGame();
}

function renderMap(level) {
    const map = maps[level].match(/[IXO\-]+/g).map(row => row.split(''));

    map.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = (elementsSize * (colI + 1)) + 15;
            const posY = (elementsSize * (rowI + 1)) -5;

            game.fillText(emoji, posX, posY);
        });
    });
}

function startGame() {
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end' 

    renderMap(1);
}

// Movimiento del jugador

function moveUp() {
    console.log('Up');
};

function moveLeft() {
    console.log('Left');
};

function moveRight() {
    console.log('Right');
};

function moveDown() {
    console.log('Down');
};

function moveByKeys(event) {
    switch (event.key) {
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowDown':
            moveDown();
            break;
    }
}

window.onload = () => {

    window.addEventListener("keydown", moveByKeys);

    btnUp.addEventListener('click', moveUp);
    btnLeft.addEventListener('click', moveLeft);
    btnRight.addEventListener('click', moveRight);
    btnDown.addEventListener('click', moveDown);
};