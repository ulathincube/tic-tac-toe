const board = document.querySelector('.board');
const allBoxes = document.querySelectorAll('.board-box');
const allBoxesArray = Array.from(allBoxes);
const resetButton = document.querySelector('.restart');
const results = document.querySelector('.results');

let winner = false;
let winnerName;
let currentPlayer = 0;

const gameBoard = (function () {
  let board = new Array(9).fill(null);

  function reset() {
    board = new Array(9).fill(null);
    winner = false;
    winnerName;
    currentPlayer = 0;
  }

  function showBoard() {
    return board;
  }

  function win(marker) {
    const boardWin =
      [board[0], board[1], board[2]].every(mark => mark === marker) ||
      [board[0], board[3], board[6]].every(mark => mark === marker) ||
      [board[1], board[4], board[7]].every(mark => mark === marker) ||
      [board[2], board[5], board[8]].every(mark => mark === marker) ||
      [board[0], board[4], board[8]].every(mark => mark === marker) ||
      [board[3], board[4], board[5]].every(mark => mark === marker) ||
      [board[6], board[7], board[8]].every(mark => mark === marker) ||
      [board[0], board[4], board[8]].every(mark => mark === marker) ||
      [board[2], board[4], board[6]].every(mark => mark === marker);

    if (boardWin) {
      winner = true;

      if (marker === 'X') {
        winnerName = 'Player 1';
      } else {
        winnerName = 'Player 2';
      }

      return `${winnerName} wins`;
    } else if (!boardWin && board.every(marker => marker !== null)) {
      winnerName = 'Tie';

      return winnerName;
    }
  }

  function playMarker(marker, index) {
    if (board[index] !== null) {
      return;
    }

    board.splice(index, 1, marker);
  }

  return { playMarker, win, showBoard, reset };
})();

function createPlayer(marker) {
  function printMarker() {
    return marker;
  }

  return { printMarker, marker };
}

function playGame(index) {
  if (winner) {
    return;
  }

  if (currentPlayer == 0) {
    gameBoard.playMarker(markerX, index);
    gameBoard.win(markerX);

    currentPlayer = 1;
  } else {
    gameBoard.playMarker(markerO, index);

    gameBoard.win(markerO);
    currentPlayer = 0;
  }

  winner ? (results.textContent = `${winnerName} wins`) : '';
  winnerName === 'Tie' ? (results.textContent = winnerName) : '';
}

const randomNumber = () => Math.floor(Math.random() * 9);

// Create Player/s
const { marker: markerX } = createPlayer('X');
const { marker: markerO } = createPlayer('O');

function displayController() {
  const board = gameBoard.showBoard();

  for (let i = 0; i < allBoxesArray.length; i++) {
    allBoxesArray[i].textContent = board[i];
  }
}

function handleBoardClick(event) {
  const clickedElementIndex = Number(event.target.dataset.value) || 0;

  playGame(clickedElementIndex);

  displayController();
}

board.addEventListener('click', handleBoardClick);
resetButton.addEventListener('click', event => {
  gameBoard.reset();
  results.textContent = '';
  displayController();
});
