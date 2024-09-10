const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const startButton = document.getElementById('start-game');
const statusDisplay = document.getElementById('status');
let player1Name, player2Name, isPlayerVsComputer, currentPlayer;
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Start game
startButton.addEventListener('click', startGame);

function startGame() {
    player1Name = player1Input.value;
    player2Name = player2Input.value === 'Computer' ? 'Computer' : player2Input.value;
    isPlayerVsComputer = player2Name === 'Computer';

    if (player1Name && player2Name) {
        board.style.display = 'grid';
        currentPlayer = player1Name; // Player 1 starts first
        statusDisplay.innerHTML = `${currentPlayer}'s turn (X)`;
        cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    }
}

// Handle each cell click
function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (boardState[cellIndex] !== '' || !gameActive) {
        return;
    }

    if (currentPlayer === player1Name) {
        boardState[cellIndex] = 'X';
        cell.innerText = 'X';
    } else {
        boardState[cellIndex] = 'O';
        cell.innerText = 'O';
    }

    checkResult();

    if (gameActive && isPlayerVsComputer && currentPlayer === player2Name) {
        computerMove();
    } else {
        currentPlayer = currentPlayer === player1Name ? player2Name : player1Name;
        statusDisplay.innerHTML = `${currentPlayer}'s turn (${currentPlayer === player1Name ? 'X' : 'O'})`;
    }
}

// Computer makes a move
function computerMove() {
    let availableCells = boardState.map((cell, index) => (cell === '' ? index : null)).filter(index => index !== null);
    let randomCellIndex = availableCells[Math.floor(Math.random() * availableCells.length)];

    setTimeout(() => {
        boardState[randomCellIndex] = 'O';
        cells[randomCellIndex].innerText = 'O';
        checkResult();

        if (gameActive) {
            currentPlayer = player1Name;
            statusDisplay.innerHTML = `${currentPlayer}'s turn (X)`;
        }
    }, 500);
}

// Check for a win or draw
function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        statusDisplay.innerHTML = `${currentPlayer} wins!`;
        return;
    }

    if (!boardState.includes('')) {
        gameActive = false;
        statusDisplay.innerHTML = `It's a draw!`;
        return;
    }
}
