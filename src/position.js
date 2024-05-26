export class Position {
  #row;
  #col;

  /**
   * @param {number} row 
   * @param {number} col 
   */
  constructor(row, col) {
    this.#row = row;
    this.#col = col;
  }

  get row() {
    return this.#row;
  }

  get col() {
    return this.#col;
  }
}