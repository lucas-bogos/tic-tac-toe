import { Game } from "./game.js";
import { Position } from "./position.js";
import { Toast } from "./toast.js";

export class View {
  #game;
  #table = document.querySelector("#table");
  #newGameButton = document.querySelector("#new-game");
  #player1 = {
    name: document.querySelector("#player-name-1"),
    score: document.querySelector("#score-1")
  };
  #player2 = {
    name: document.querySelector("#player-name-2"),
    score: document.querySelector("#score-2")
  };

  /**
   * 
   * @param {Game} game 
   */
  constructor(game) {
    this.#game = game;
  }

  bootstrap() {
    this.#renderPlayerNames();
    this.#table.addEventListener("click", (event) => {
      if (this.#game.isEndGame) {
        return Toast.dispatch("O jogo já terminou", "warn");
      }

      const element = event.target;
      const row = element.dataset.row;
      const col = element.dataset.col;

      if (row && col) {
        const position = new Position(+row, +col);
        const isPlayed = this.#game.play(position, element);

        if (!isPlayed) {
          return Toast.dispatch("Você não pode jogar nessa posição", "error");
        }

        element.innerHTML = this.#game.turn.piece;
        this.#updateScores();

        if (this.#game.isEndGame) {
          this.#newGameButton.classList.remove("hidden");
        }
      }
    });
    this.#newGameButton.addEventListener("click", () => {
      const cols = table.querySelectorAll(".col");
      cols.forEach(col => col.innerHTML = null);
      this.#game.start();
      this.#updateScores();
      this.#newGameButton.classList.add("hidden");
    });
  }

  /**
   * 
   * @param {Element} target 
   */
  renderPiece(target) {
    target.innerHTML = this.#game.turn.piece;
  }

  #renderPlayerNames() {
    this.#player1.name.innerHTML = this.#game.player1.name;
    this.#player2.name.innerHTML = this.#game.player2.name;
  }

  #updateScores() {
    this.#player1.score.innerHTML = this.#game.player1.victories;
    this.#player2.score.innerHTML = this.#game.player2.victories;
  }
}