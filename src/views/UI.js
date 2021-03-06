import * as Player from '../js/player';
import board from '../js/board';

const mainElement = document.querySelector('.main-section');
const UI = (() => {
  const renderBoard = (board) => {
    const table = document.createElement('table');
    const boardSize = 10;
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    table.setAttribute('id', `${board.player.username}-board`);
    for (let i = 0; i <= boardSize; i += 1) {
      const row = document.createElement('tr');
      for (let j = 0; j <= boardSize; j += 1) {
        const cell = document.createElement('td');
        if (i !== 0 && j !== 0) {
          cell.setAttribute('data-value', ((i - 1) * 10 + (j - 1)));
          cell.classList.add('cell');
          cell.setAttribute('id', ((i - 1) * 10 + (j - 1)));
        } else if (i === 0 && j > 0) {
          cell.textContent = j;
        } else if (i > 0 && j === 0) {
          cell.textContent = letters[i - 1];
        }
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
    const playerName = document.createElement('h3');
    playerName.textContent = `${board.player.username}`;
    playerName.classList.add('player-name');
    table.classList.add('board');
    const boardDiv = document.createElement('div');
    boardDiv.classList.add('board-div');
    boardDiv.append(table);
    mainElement.append(boardDiv);
    boardDiv.append(playerName);
  };

  function renderShips(board) {
    const arr = board.shipsArr;
    arr.forEach(ship => {
      ship.position.forEach(cell => {
        const shipCell = document.getElementById(`${board.player.username}-board`).querySelector(`td[data-value="${cell}"]`);
        shipCell.classList.add('ships');
      });
    });
  }

  return { mainElement, renderBoard, renderShips };
})();


function markCell(cell, gameBoard, selectedCell) {
  const attack = gameBoard.receiveAttack(cell);
  const messageBoard = document.querySelector('.message-board');
  if (attack === false) {
    messageBoard.innerHTML = '<p class=\'message-text\'> Select an empty cell </p>';
  }
  if (attack === 'hit') {
    selectedCell.classList.add('hit-cell');
    return true;
  }
  if (attack === 'miss') {
    selectedCell.classList.add('missed-cell');
    return true;
  }
  return false;
}


const gameLogic = () => {
  let board1;
  let board2;

  const init = () => {
    const player1 = Player.player('player');
    const player2 = Player.player('computer');
    board1 = board(player1);
    board2 = board(player2);
    UI.renderBoard(board1);
    UI.renderShips(board1);
    UI.renderBoard(board2);
    Player.setTurn(player1);
  };

  function findCell(computerCell) {
    const allCells = document.getElementById(`${board1.player.username}-board`).querySelectorAll('.cell');
    for (let i = 0; i < allCells.length; i += 1) {
      if (allCells[i].dataset.value === computerCell.toString()) {
        return allCells[i];
      }
    }
    return true;
  }

  function cellClick(e) {
    const cell = parseInt(e.target.dataset.value, 10);
    const messageBoard = document.querySelector('.message-board');
    messageBoard.innerHTML = '';
    if (markCell(cell, board2, e.target)) {
      if (board2.winner()) {
        messageBoard.innerHTML = `<p class='message-text'> Congratulations ${board1.player.username}! You win!</p>`;
        setTimeout(() => {
          /* eslint no-restricted-globals: ["error", "event"] */
          location.reload();
        }, 2000);
      }
      setTimeout(() => {
        const computerCell = Player.computerSelection(board1.emptyCells);
        const selectedCell = findCell(computerCell);
        markCell(computerCell, board1, selectedCell);
        if (board1.winner()) {
          messageBoard.innerHTML = `<p class='message-text'> Congratulations ${board2.player.username}! You win! </p>`;
          setTimeout(() => {
            /* eslint no-restricted-globals: ["error", "event"] */
            location.reload();
          }, 2000);
        }
      }, 500);
    }
  }

  const eventHandler = () => {
    const domBoard = document.getElementById('computer-board');
    domBoard.addEventListener('click', cellClick);
  };
  init();
  eventHandler();
};


export default gameLogic;