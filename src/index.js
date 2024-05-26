import { Game } from "./game.js";
import { Player } from "./player.js";
import { View } from "./view.js";

const player1 = new Player("Player 1 (X)", "X");
const player2 = new Player("Player 2 (O)", "O");
const game = new Game(player1, player2);

game.start();

const view = new View(game);

view.bootstrap();