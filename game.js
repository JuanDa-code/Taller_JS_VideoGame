const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', startGame);

function startGame() {
    let canvasSize;

    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    const elementsSize = canvasSize / 10;

    console.log({canvasSize, elementsSize});

    var img = new Image();
    img.onload = () => {game.drawImage(img, 50, 50, 50, 50)};
    img.width = 5;
    img.src = emojis['X'];
}