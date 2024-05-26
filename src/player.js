export class Player {
  #name;
  #piece;
  #victories = 0;
  #losses = 0;

  /**
   * @param {string} name
   * @param {"X" | "O"} piece 
   */
  constructor(name, piece) {
    this.#name = name;
    this.#piece = piece;
  }

  changeName(newName) {
    this.#name = newName;
  }

  win() {
    this.#victories++;
  }

  lose() {
    this.#losses++;
  }

  get name() {
    return this.#name;
  }

  get losses() {
    return this.#losses;
  }

  get victories() {
    return this.#victories;
  }

  get piece() {
    return this.#piece;
  }
}