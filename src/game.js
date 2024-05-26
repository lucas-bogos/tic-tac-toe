import { Player } from "./player.js";
import { Position } from "./position.js";
import { Toast } from "./toast.js";

export class Game {
  #turn;
  #player1;
  #player2;
  #table;
  #isEndGame = false;

  /**
   * @param {Player} player1 
   * @param {Player} player2 
   */
  constructor(player1, player2) {
    this.#player1 = player1;
    this.#player2 = player2;
    this.#turn = player1;
    this.#emptyTable();
  }

  /**
   * @param {Position} position
   * 
   * @returns {boolean} 
   */
  play(position) {
    if (this.#table[position.row][position.col]) return false;

    this.#table[position.row][position.col] = this.#turn.piece;
    this.#checkResult();
    this.changeTurn();
    return true;
  }

  changeTurn() {
    const players = [this.#player1, this.#player2];
    this.#turn = players.find(player => player.piece !== this.#turn.piece);
  }

  start() {
    this.#isEndGame = false;
  }

  #checkResult() {
    const isVictory = (cells) => cells.every(cell => cell === this.#turn.piece);

    for (let i = 0; i < 3; i++) {
      if (isVictory([this.#table[i][0], this.#table[i][1], this.#table[i][2]])) {
        this.#turn.win();
        this.#end();
        return Toast.dispatch(`${this.#turn.name} ganhou o jogo!`);
      }

      if (isVictory([this.#table[0][i], this.#table[1][i], this.#table[2][i]])) {
        this.#turn.win();
        this.#end();
        return Toast.dispatch(`${this.#turn.name} ganhou o jogo!`);
      }
    }

    if (isVictory([this.#table[0][0], this.#table[1][1], this.#table[2][2]]) || isVictory([this.#table[0][2], this.#table[1][1], this.#table[2][0]])) {
      this.#turn.win();
      this.#end();
      return Toast.dispatch(`${this.#turn.name} ganhou o jogo!`);
    }

    const isDraw = this.#table.flat().every(cell => cell !== null);

    if (isDraw) {
      this.#end();
      return Toast.dispatch("Deu velha o jogo!");
    }
  }

  #end() {
    this.#isEndGame = true;
    this.#emptyTable();
  }

  #emptyTable() {
    this.#table = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  }

  get player1() {
    return this.#player1;
  }

  get player2() {
    return this.#player2;
  }

  get isEndGame() {
    return this.#isEndGame;
  }

  get turn() {
    return this.#turn;
  }
}