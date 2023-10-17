//your code here
document.addEventListener('DOMContentLoaded', function () {
    const gameContainer = document.getElementById('gameContainer');
    const scoreSpan = document.getElementById('score');
    let score = 0;
    let snake = [{ row: 20, col: 1 }];
    let direction = 'right';
    let intervalId;

    function createPixel(row, col, className) {
        const pixel = document.createElement('div');
        pixel.className = `pixel ${className}`;
        pixel.id = `pixel:${row}-${col}`;
        return pixel;
    }

    function renderSnake() {
        snake.forEach((pixel) => {
            const { row, col } = pixel;
            const snakePixel = createPixel(row, col, 'snakeBodyPixel');
            gameContainer.appendChild(snakePixel);
        });
    }

    function renderFood() {
        const row = Math.floor(Math.random() * 40) + 1;
        const col = Math.floor(Math.random() * 40) + 1;
        const foodPixel = createPixel(row, col, 'food');
        gameContainer.appendChild(foodPixel);
    }

    function updateScore() {
        scoreSpan.textContent = score;
    }

    function moveSnake() {
        const head = { ...snake[0] };

        switch (direction) {
            case 'up':
                head.row -= 1;
                break;
            case 'down':
                head.row += 1;
                break;
            case 'left':
                head.col -= 1;
                break;
            case 'right':
                head.col += 1;
                break;
        }

        // Check for collisions
        if (
            head.row < 1 || head.row > 40 ||
            head.col < 1 || head.col > 40 ||
            snake.some(pixel => pixel.row === head.row && pixel.col === head.col)
        ) {
            clearInterval(intervalId);
            alert('Game Over! Your score: ' + score);
            return;
        }

        snake.unshift(head);

        // Check if snake ate the food
        const foodPixel = document.querySelector('.food');
        if (foodPixel && foodPixel.id === `pixel:${head.row}-${head.col}`) {
            score += 1;
            updateScore();
            gameContainer.removeChild(foodPixel);
            renderFood();
        } else {
            const removedPixel = snake.pop();
            const removedPixelElement = document.getElementById(`pixel:${removedPixel.row}-${removedPixel.col}`);
            if (removedPixelElement) {
                gameContainer.removeChild(removedPixelElement);
            }
        }

        // Render the updated snake
        renderSnake();
    }

    function startGame() {
        renderSnake();
        renderFood();
        updateScore();
        intervalId = setInterval(moveSnake, 100);
    }

    document.addEventListener('keydown', function (event) {
        switch (event.key) {
            case 'ArrowUp':
                if (direction !== 'down') {
                    direction = 'up';
                }
                break;
            case 'ArrowDown':
                if (direction !== 'up') {
                    direction = 'down';
                }
                break;
            case 'ArrowLeft':
                if (direction !== 'right') {
                    direction = 'left';
                }
                break;
            case 'ArrowRight':
                if (direction !== 'left') {
                    direction = 'right';
                }
                break;
        }
    });

    startGame();
});
