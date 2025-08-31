const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessage = document.getElementById('winning-message');
const messageText = document.getElementById('message-text');
const restartButton = document.getElementById('restartButton');

let isXTurn = true;

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function startGame() {
  isXTurn = true;
  cells.forEach(cell => {
    cell.classList.remove('X');
    cell.classList.remove('O');
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  winningMessage.classList.add('hide');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'X' : 'O';
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false, currentClass);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isXTurn = !isXTurn;
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.textContent = currentClass;
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('X') || cell.classList.contains('O');
  });
}

function endGame(draw, winner = '') {
  if (draw) {
    messageText.textContent = "It's a Draw!";
  } else {
    messageText.textContent = `${winner} Wins!`;
  }
  winningMessage.classList.remove('hide');
}

restartButton.addEventListener('click', startGame);

// Start the game initially
startGame();
