class Game {
  #symbol;
  #player1moves;
  #player2moves;

  constructor(main) {
    this.#symbol = "❌";
    this.#player1moves = new Set();
    this.#player2moves = new Set();
  }

  changeSymbol(messageArea) {
    if (this.#symbol === "❌") {
      this.#symbol = "⭕️";
      this.displayChance(messageArea);
      return;
    }

    this.#symbol = "❌";
    this.displayChance(messageArea);
  }

  displayChance(messageArea) {
    if (this.#symbol === "❌") {
      messageArea.textContent = "Player 1 chance";
      return;
    }

    messageArea.textContent = "Player 2 chance";
  }

  updateScreen(target) {
    target.textContent = this.#symbol;
    if (this.#symbol === "❌") {
      this.#player1moves.add(+target.id);
      return;
    }

    this.#player2moves.add(+target.id);
  }

  hasWon() {
    const winningCondition = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];

    const playerMoves =
      this.#symbol === "❌" ? this.#player1moves : this.#player2moves;

    const moves = Array.from(playerMoves);

    return winningCondition.some((array) =>
      array.every((element) => moves.includes(element))
    );
  }

  hasDraw() {
    const totalMoves = [
      ...Array.from(this.#player1moves),
      ...Array.from(this.#player2moves),
    ];

    return totalMoves.length === 9;
  }

  reset() {
    document.location.reload();
  }

  winMessage(messageArea) {
    const winner = this.#symbol === "❌" ? "Player 1" : "Player 2";
    messageArea.textContent = `${winner} Won`;
  }

  drawMessage(messageArea) {
    messageArea.textContent = "Match tied";
  }
}

const startGame = () => {
  const game = new Game();
  const board = document.querySelector(".outer-box");
  const messageArea = document.querySelector(".message-area");
  const button = document.querySelector(".reset");

  board.addEventListener("click", () => {
    if (event.target.textContent !== "") return;
    game.updateScreen(event.target);

    if (game.hasWon()) {
      game.winMessage(messageArea);
      setTimeout(game.reset, 2000);
      return;
    }

    if (game.hasDraw()) {
      game.drawMessage(messageArea);
      return;
    }

    game.changeSymbol(messageArea);
  });

  button.addEventListener("click", () => {
    window.location.reload();
  });
};

window.onload = startGame;
