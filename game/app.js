// script.js
const board = document.getElementById('Sheet');
const resetButton = document.getElementById('reset');

let currentPlayer = 'red';
const columns = 7;
const rows = 6;
let gameSheet = Array.from({ length: rows }, () => Array(columns).fill(null));

function createSheet() {
    board.innerHTML = '';
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.column = c;
            cell.addEventListener('click', dropPiece);
            Sheet.appendChild(cell);
        }
    }
}

function dropPiece(event) {
    const column = event.target.dataset.column;
    for (let r = rows - 1; r >= 0; r--) {
        if (!gameSheet[r][column]) {
            gameSheet[r][column] = currentPlayer;
            updateSheet();
            if (checkWin(r, column)) {
                setTimeout(() => alert(`${currentPlayer} wins!`), 10);
                resetGame();
            }
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            return;
        }
    }
}

function updateSheet() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        const r = Math.floor(index / columns);
        const c = index % columns;
        cell.className = 'cell';
        if (gameSheet[r][c]) {
            cell.classList.add(gameSheet[r][c]);
        }
    });
}

function checkWin(row, column) {
    // Check horizontal, vertical, and diagonal wins
    return (
        checkDirection(row, column, 1, 0) || // Horizontal
        checkDirection(row, column, 0, 1) || // Vertical
        checkDirection(row, column, 1, 1) || // Diagonal \
        checkDirection(row, column, 1, -1)   // Diagonal /
    );
}

function checkDirection(row, column, deltaRow, deltaCol) {
    let count = 0;
    for (let d = -3; d <= 3; d++) {
        const r = row + d * deltaRow;
        const c = column + d * deltaCol;
        if (r >= 0 && r < rows && c >= 0 && c < columns && gameSheet[r][c] === currentPlayer) {
            count++;
            if (count === 4) return true;
        } else {
            count = 0;
        }
    }
    return false;
}

function resetGame() {
    gameSheet = Array.from({ length: rows }, () => Array(columns).fill(null));
    currentPlayer = 'red';
    createSheet();
}

resetButton.addEventListener('click', resetGame);
createSheet();
