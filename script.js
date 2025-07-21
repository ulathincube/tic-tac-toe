let winner = false;
let currentPlayer = 0;

const gameBoard = (function () {
  const board = new Array(9).fill(null);

  function changePlayer() {}

  function showBoard() {
    console.log(`${board[0]} ${board[1]} ${board[2]}\n
                  ${board[3]} ${board[4]} ${board[5]}\n
                  ${board[6]} ${board[7]} ${board[8]}`);
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
      console.log(`${marker} wins`);
      return;
    }
  }

  function playMarker(marker, index) {
    if (board[index] !== null) {
      return;
    }

    board.splice(index, 1, marker);
  }

  return { playMarker, win, showBoard };
})();

function createPlayer(marker) {
  function printMarker() {
    return marker;
  }

  return { printMarker, marker };
}

function playGame() {
  if (winner) {
    return;
  }

  if (currentPlayer == 0) {
    const userAIndex = Number(prompt('User A'));
    gameBoard.playMarker(markerX, userAIndex);
    gameBoard.win(markerX);
    console.log(gameBoard.showBoard());
    currentPlayer = 1;
  } else {
    const userBIndex = Number(prompt('User B'));
    gameBoard.playMarker(markerO, userBIndex);
    console.log(gameBoard.showBoard());
    gameBoard.win(markerO);
    currentPlayer = 0;
  }
}

const randomNumber = () => Math.floor(Math.random() * 9);

// Create Player/s
const { marker: markerX } = createPlayer('X');
const { marker: markerO } = createPlayer('O');

for (let i = 0; i < 9; i++) {
  playGame();
}
