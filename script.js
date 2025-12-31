// ===================== DOM ELEMENTS =====================
const gameBoard = document.getElementById("game-board");
const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const speedEl = document.getElementById("speed");
const boardSizeEl = document.getElementById("boardSize");
const difficultyEl = document.getElementById("difficulty");
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

// ===================== GAME CONFIGURATION =====================
const MAX_LEVEL = 25;
const FOOD_COLORS = ["red", "blue", "black", "green", "yellow"];

// Level progression table (Level 1-25)
const LEVEL_CONFIG = {
    1: { boardSize: 400, gridSize: 20, baseSpeed: 150, difficulty: "EASY" },
    2: { boardSize: 400, gridSize: 20, baseSpeed: 140, difficulty: "EASY" },
    3: { boardSize: 400, gridSize: 20, baseSpeed: 130, difficulty: "EASY" },
    4: { boardSize: 400, gridSize: 20, baseSpeed: 120, difficulty: "EASY" },
    5: { boardSize: 420, gridSize: 20, baseSpeed: 110, difficulty: "EASY+" },
    6: { boardSize: 420, gridSize: 20, baseSpeed: 100, difficulty: "MEDIUM" },
    7: { boardSize: 420, gridSize: 20, baseSpeed: 90, difficulty: "MEDIUM" },
    8: { boardSize: 440, gridSize: 20, baseSpeed: 85, difficulty: "MEDIUM" },
    9: { boardSize: 440, gridSize: 20, baseSpeed: 80, difficulty: "MEDIUM" },
    10: { boardSize: 460, gridSize: 20, baseSpeed: 75, difficulty: "MEDIUM+" },
    11: { boardSize: 460, gridSize: 20, baseSpeed: 70, difficulty: "HARD" },
    12: { boardSize: 480, gridSize: 20, baseSpeed: 65, difficulty: "HARD" },
    13: { boardSize: 480, gridSize: 20, baseSpeed: 60, difficulty: "HARD" },
    14: { boardSize: 500, gridSize: 20, baseSpeed: 55, difficulty: "HARD" },
    15: { boardSize: 500, gridSize: 20, baseSpeed: 50, difficulty: "HARD+" },
    16: { boardSize: 520, gridSize: 20, baseSpeed: 45, difficulty: "VERY HARD" },
    17: { boardSize: 520, gridSize: 20, baseSpeed: 40, difficulty: "VERY HARD" },
    18: { boardSize: 540, gridSize: 20, baseSpeed: 35, difficulty: "VERY HARD" },
    19: { boardSize: 540, gridSize: 20, baseSpeed: 30, difficulty: "EXTREME" },
    20: { boardSize: 560, gridSize: 20, baseSpeed: 28, difficulty: "EXTREME" },
    21: { boardSize: 560, gridSize: 20, baseSpeed: 25, difficulty: "INSANE" },
    22: { boardSize: 580, gridSize: 20, baseSpeed: 22, difficulty: "INSANE" },
    23: { boardSize: 580, gridSize: 20, baseSpeed: 20, difficulty: "INSANE" },
    24: { boardSize: 600, gridSize: 20, baseSpeed: 18, difficulty: "NIGHTMARE" },
    25: { boardSize: 600, gridSize: 20, baseSpeed: 15, difficulty: "GODMODE" }
};

// ===================== GAME VARIABLES =====================
let snake = [];
let food = {};
let direction = "RIGHT";
let nextDirection = "RIGHT";
let score = 0;
let level = 1;
let speed = 150;
let boardSize = 400;
let gridSize = 20;
let gameInterval = null;
let isGameRunning = false;
let isGamePaused = false;
let foodEatenCount = 0;
let highScore = localStorage.getItem("snakeHighScore") || 0;

// ===================== INITIALIZATION =====================
function initializeGame() {
    // Reset all game variables
    snake = [{ x: boardSize / 2, y: boardSize / 2 }];
    
    // Get level config
    const levelConfig = LEVEL_CONFIG[level];
    boardSize = levelConfig.boardSize;
    gridSize = levelConfig.gridSize;
    speed = levelConfig.baseSpeed;
    
    // Update board size
    gameBoard.style.width = boardSize + "px";
    gameBoard.style.height = boardSize + "px";
    
    food = generateRandomFood();
    direction = "RIGHT";
    nextDirection = "RIGHT";
    score = 0;
    foodEatenCount = 0;
    isGameRunning = false;
    isGamePaused = false;

    // Hide game over overlay
    gameOverlay.classList.add("hidden");

    // Update UI
    updateScore();
    updateLevel();
    updateSpeed();
    updateBoardSize();
    updateDifficulty();
    updateHighScore();
    draw();

    // Update button states
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resumeBtn.classList.add("hidden");
    restartBtn.disabled = false;
}

function updateScore() {
    scoreEl.textContent = score;
}

function updateLevel() {
    levelEl.textContent = level + "/" + MAX_LEVEL;
}

function updateSpeed() {
    speedEl.textContent = speed + "ms";
}

function updateBoardSize() {
    boardSizeEl.textContent = boardSize + "px";
}

function updateDifficulty() {
    const levelConfig = LEVEL_CONFIG[level];
    difficultyEl.textContent = levelConfig.difficulty;
}

function updateHighScore() {
    highScoreEl.textContent = highScore;
}

// ===================== RANDOM FOOD GENERATION =====================
function generateRandomFood() {
    let newFood;
    let isOnSnake;

    do {
        newFood = {
            x: Math.floor(Math.random() * (boardSize / gridSize)) * gridSize,
            y: Math.floor(Math.random() * (boardSize / gridSize)) * gridSize,
            color: FOOD_COLORS[Math.floor(Math.random() * FOOD_COLORS.length)]
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

    // Draw snake (white with rounded corners)
    snake.forEach((segment, index) => {
        const snakeElement = document.createElement("div");
        snakeElement.className = "snake";
        snakeElement.style.left = segment.x + "px";
        snakeElement.style.top = segment.y + "px";
        snakeElement.style.width = gridSize + "px";
        snakeElement.style.height = gridSize + "px";
        gameBoard.appendChild(snakeElement);
    });

    // Draw food (with dynamic color)
    const foodElement = document.createElement("div");
    foodElement.className = "food " + food.color;
    foodElement.style.left = food.x + "px";
    foodElement.style.top = food.y + "px";
    foodElement.style.width = gridSize + "px";
    foodElement.style.height = gridSize + "px";
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
            head.y -= gridSize;
            break;
        case "DOWN":
            head.y += gridSize;
            break;
        case "LEFT":
            head.x -= gridSize;
            break;
        case "RIGHT":
            head.x += gridSize;
            break;
    }

    // Add new head
    snake.unshift(head);

    // Check if food is eaten
    if (head.x === food.x && head.y === food.y) {
        score++;
        foodEatenCount++;
        updateScore();

        // Check if level should increase (every food eaten)
        if (level < MAX_LEVEL && foodEatenCount % (6 - (level % 5)) === 0) {
            level++;
            
            // Update board and speed for new level
            const levelConfig = LEVEL_CONFIG[level];
            boardSize = levelConfig.boardSize;
            gridSize = levelConfig.gridSize;
            speed = levelConfig.baseSpeed;
            
            gameBoard.style.width = boardSize + "px";
            gameBoard.style.height = boardSize + "px";
            
            updateLevel();
            updateSpeed();
            updateBoardSize();
            updateDifficulty();
            
            // Reset snake position for new board
            snake = [{ x: boardSize / 2, y: boardSize / 2 }];
            
            // Restart with new speed
            clearInterval(gameInterval);
            gameInterval = setInterval(gameLoop, speed);
        } else {
            // Increase speed for every food eaten
            if (speed > 10) {
                speed -= 2;
                updateSpeed();
                clearInterval(gameInterval);
                gameInterval = setInterval(gameLoop, speed);
            }
        }

        food = generateRandomFood();
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
    if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
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
    overlayTitle.textContent = level === MAX_LEVEL ? "🎉 YOU WON!" : "🎮 GAME OVER!";
    finalScoreEl.textContent = score;
    finalLevelEl.textContent = level + "/" + MAX_LEVEL;
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
    level = 1;
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
