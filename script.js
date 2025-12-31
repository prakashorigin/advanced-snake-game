// ===================== DOM ELEMENTS =====================
const gameBoard = document.getElementById("game-board");
const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const speedEl = document.getElementById("speed");
const highScoreEl = document.getElementById("highScore");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const restartBtn = document.getElementById("restartBtn");

const gameOverlay = document.getElementById("game-overlay");
const overlayTitle = document.getElementById("overlay-title");
const finalScoreEl = document.getElementById("final-score");
const finalLevelEl = document.getElementById("final-level");
const foodEatenEl = document.getElementById("food-eaten");

// Touch Control Buttons
const upBtn = document.getElementById("upBtn");
const downBtn = document.getElementById("downBtn");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

// ===================== GAME VARIABLES =====================
const GRID_SIZE = 20; // 400px / 20 = 20px per cell
const BOARD_WIDTH = 400;
const BOARD_HEIGHT = 400;
const INITIAL_SPEED = 100; // milliseconds
const MIN_SPEED = 40;
const SPEED_INCREMENT = 5; // ms decrease per food eaten

let snake = [];
let food = {};
let direction = "RIGHT";
let nextDirection = "RIGHT"; // To prevent simultaneous direction changes
let score = 0;
let level = 1;
let speed = INITIAL_SPEED;
let gameInterval = null;
let isGameRunning = false;
let isGamePaused = false;
let foodEatenCount = 0;
let highScore = localStorage.getItem("snakeHighScore") || 0;

// ===================== INITIALIZATION =====================
function initializeGame() {
    // Reset all game variables
    snake = [{ x: 200, y: 200 }];
    food = generateRandomFood();
    direction = "RIGHT";
    nextDirection = "RIGHT";
    score = 0;
    level = 1;
    speed = INITIAL_SPEED;
    foodEatenCount = 0;
    isGameRunning = false;
    isGamePaused = false;

    // Hide game over overlay
    gameOverlay.classList.add("hidden");

    // Update UI
    updateScore();
    updateLevel();
    updateSpeed();
    updateHighScore();
    draw();

    // Update button states
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resumeBtn.classList.add("hidden");
    restartBtn.disabled = false;
}

function updateHighScore() {
    highScoreEl.textContent = highScore;
}

function updateScore() {
    scoreEl.textContent = score;
}

function updateLevel() {
    level = Math.floor(score / 5) + 1;
    levelEl.textContent = level;
}

function updateSpeed() {
    speedEl.textContent = speed + "ms";
}

// ===================== RANDOM FOOD GENERATION =====================
function generateRandomFood() {
    let newFood;
    let isOnSnake;

    do {
        newFood = {
            x: Math.floor(Math.random() * (BOARD_WIDTH / GRID_SIZE)) * GRID_SIZE,
            y: Math.floor(Math.random() * (BOARD_HEIGHT / GRID_SIZE)) * GRID_SIZE
        };

        // Check if food is on snake
        isOnSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    } while (isOnSnake);

    return newFood;
}

// ===================== DRAWING FUNCTION =====================
function draw() {
    // Clear board
    gameBoard.innerHTML = "";

    // Draw snake
    snake.forEach((segment, index) => {
        const snakeElement = document.createElement("div");
        snakeElement.className = "snake";
        snakeElement.style.left = segment.x + "px";
        snakeElement.style.top = segment.y + "px";
        gameBoard.appendChild(snakeElement);
    });

    // Draw food
    const foodElement = document.createElement("div");
    foodElement.className = "food";
    foodElement.style.left = food.x + "px";
    foodElement.style.top = food.y + "px";
    gameBoard.appendChild(foodElement);
}

// ===================== MOVEMENT & COLLISION =====================
function moveSnake() {
    // Update direction only if not reversing
    if (!isReverse(nextDirection, direction)) {
        direction = nextDirection;
    }

    const head = { ...snake[0] };

    // Move head in current direction
    switch (direction) {
        case "UP":
            head.y -= GRID_SIZE;
            break;
        case "DOWN":
            head.y += GRID_SIZE;
            break;
        case "LEFT":
            head.x -= GRID_SIZE;
            break;
        case "RIGHT":
            head.x += GRID_SIZE;
            break;
    }

    // Add new head
    snake.unshift(head);

    // Check if food is eaten
    if (head.x === food.x && head.y === food.y) {
        score++;
        foodEatenCount++;
        updateScore();
        updateLevel();

        food = generateRandomFood();

        // Increase speed
        if (speed > MIN_SPEED) {
            speed -= SPEED_INCREMENT;
            updateSpeed();
            clearInterval(gameInterval);
            gameInterval = setInterval(gameLoop, speed);
        }
    } else {
        // Remove tail if no food eaten
        snake.pop();
    }
}

function isReverse(newDir, currentDir) {
    return (
        (newDir === "UP" && currentDir === "DOWN") ||
        (newDir === "DOWN" && currentDir === "UP") ||
        (newDir === "LEFT" && currentDir === "RIGHT") ||
        (newDir === "RIGHT" && currentDir === "LEFT")
    );
}

function checkCollision() {
    const head = snake[0];

    // Wall collision
    if (head.x < 0 || head.x >= BOARD_WIDTH || head.y < 0 || head.y >= BOARD_HEIGHT) {
        return true;
    }

    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

// ===================== GAME LOOP =====================
function gameLoop() {
    if (isGamePaused) return;

    moveSnake();

    if (checkCollision()) {
        endGame();
        return;
    }

    draw();
}

// ===================== GAME CONTROL FUNCTIONS =====================
function startGame() {
    if (!isGameRunning) {
        isGameRunning = true;
        isGamePaused = false;

        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resumeBtn.classList.add("hidden");
        restartBtn.disabled = false;

        gameInterval = setInterval(gameLoop, speed);
    }
}

function pauseGame() {
    if (isGameRunning && !isGamePaused) {
        isGamePaused = true;

        pauseBtn.disabled = true;
        resumeBtn.classList.remove("hidden");
        resumeBtn.disabled = false;
    }
}

function resumeGame() {
    if (isGameRunning && isGamePaused) {
        isGamePaused = false;

        pauseBtn.disabled = false;
        resumeBtn.classList.add("hidden");
        resumeBtn.disabled = true;
    }
}

function endGame() {
    isGameRunning = false;
    clearInterval(gameInterval);

    // Update high score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("snakeHighScore", highScore);
        updateHighScore();
    }

    // Show game over overlay
    overlayTitle.textContent = "🎮 GAME OVER!";
    finalScoreEl.textContent = score;
    finalLevelEl.textContent = level;
    foodEatenEl.textContent = foodEatenCount;
    gameOverlay.classList.remove("hidden");

    // Update button states
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resumeBtn.classList.add("hidden");
    restartBtn.disabled = false;
}

function restartGame() {
    clearInterval(gameInterval);
    initializeGame();
}

// ===================== KEYBOARD CONTROLS =====================
document.addEventListener("keydown", (e) => {
    if (!isGameRunning) return;

    switch (e.key) {
        case "ArrowUp":
            e.preventDefault();
            nextDirection = "UP";
            break;
        case "ArrowDown":
            e.preventDefault();
            nextDirection = "DOWN";
            break;
        case "ArrowLeft":
            e.preventDefault();
            nextDirection = "LEFT";
            break;
        case "ArrowRight":
            e.preventDefault();
            nextDirection = "RIGHT";
            break;
        case " ":
            e.preventDefault();
            if (isGamePaused) {
                resumeGame();
            } else {
                pauseGame();
            }
            break;
    }
});

// ===================== TOUCH CONTROLS (MOBILE) =====================
upBtn.addEventListener("click", () => {
    if (isGameRunning && !isGamePaused) {
        nextDirection = "UP";
    }
});

downBtn.addEventListener("click", () => {
    if (isGameRunning && !isGamePaused) {
        nextDirection = "DOWN";
    }
});

leftBtn.addEventListener("click", () => {
    if (isGameRunning && !isGamePaused) {
        nextDirection = "LEFT";
    }
});

rightBtn.addEventListener("click", () => {
    if (isGameRunning && !isGamePaused) {
        nextDirection = "RIGHT";
    }
});

// ===================== SWIPE CONTROLS =====================
let touchStartX = 0;
let touchStartY = 0;

gameBoard.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

gameBoard.addEventListener("touchend", (e) => {
    if (!isGameRunning || isGamePaused) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Determine swipe direction based on larger delta
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 30) {
            nextDirection = "RIGHT";
        } else if (deltaX < -30) {
            nextDirection = "LEFT";
        }
    } else {
        // Vertical swipe
        if (deltaY > 30) {
            nextDirection = "DOWN";
        } else if (deltaY < -30) {
            nextDirection = "UP";
        }
    }
});

// ===================== BUTTON EVENT LISTENERS =====================
startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", pauseGame);
resumeBtn.addEventListener("click", resumeGame);
restartBtn.addEventListener("click", restartGame);

// ===================== INITIALIZE ON PAGE LOAD =====================
window.addEventListener("load", () => {
    initializeGame();
});
