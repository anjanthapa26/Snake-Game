import {SNAKE_SPEED} from './snake.js';
import {update as updateSnake, draw as drawSnake,getSnakeHead,snakeIntersection} from './snake.js';
import {update as updateFood, draw as drawFood} from './food.js';
import {outSideGrid} from './grid.js';
let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board');


function main(currentTime) {
    if(gameOver) {
        if(confirm('you lost, press Ok to restart.')) {
            window.location = '/webdev/'
        }
        return
    }
    window.requestAnimationFrame(main);
    const secondSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondSinceLastRender < 1 / SNAKE_SPEED) return;

    console.log('render');
    lastRenderTime = currentTime

    update()
    draw()
}


window.requestAnimationFrame(main)

function update() {
    updateSnake();
    updateFood();
    checkDeath();

}
function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath() {
    gameOver = outSideGrid(getSnakeHead()) || snakeIntersection()
}