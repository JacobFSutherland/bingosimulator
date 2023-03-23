import { GameController } from "./src/controllers/GameController";
import { GameParameters } from "./src/constants/GameParameters";
import { Board } from "./src/classes/Board";
import { WinChecker } from "./src/controllers/WinChecker";

const gameParameters: GameParameters = {
    diagonalWin: true,
    fourCornerWin: true,
    blackOutWin: true,
    linearWin: true,
    ballsPerLetter: 15,
    boards: 100000,
    gameName: 'BINGO',
    pulls: 75,
    freeSpotEnabled: true
}


//let b = new Board(gameParameters.gameName, gameParameters.ballsPerLetter, gameParameters.freeSpotEnabled, 0);
//
//let win = WinChecker.linearWin(b);
//console.log(win)
let gc = new GameController(gameParameters);
gc.start();
gc.printStats();