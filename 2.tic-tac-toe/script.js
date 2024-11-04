const board = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restart");
let currentPlayer = "x";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

  if (gameState[clickedCellIndex] !== "" || !gameActive) return;

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.classList.add(currentPlayer);
  clickedCell.innerText = currentPlayer.toUpperCase();

  checkResult();
}


function checkResult() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      highlightWinningCells([a, b, c]);
      break;
    }
  }

  if (roundWon) {
    document.body.classList.add(`win-${currentPlayer}`);
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    document.body.style.backgroundColor = "#f39c12";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "x" ? "o" : "x";
}


function highlightWinningCells(winCombo) {
  winCombo.forEach(index => board[index].classList.add("win"));
}


function restartGame() {
  currentPlayer = "x";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  board.forEach(cell => {
    cell.classList.remove("x", "o", "win");
    cell.innerText = "";
  });
  document.body.classList.remove("win-x", "win-o");
  document.body.style.backgroundColor = "#1c1f2b";
}


board.forEach(cell => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
