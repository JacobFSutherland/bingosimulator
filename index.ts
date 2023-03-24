import { MultiplayerController } from "./src/controllers/MultiplayerController";
import { GameParameters } from "./src/constants/GameParameters";
import { Board } from "./src/classes/Board";
import { WinChecker } from "./src/controllers/WinChecker";
import { Ball } from "./src/classes/Ball";
import { MultiSolo } from "./src/controllers/MultiSolo";

const gameParameters: GameParameters = {
    diagonalWin: true,
    fourCornerWin: true,
    blackOutWin: true,
    linearWin: true,
    ballsPerLetter: 15,
    boards: 10000,
    gameName: 'BOGEY',
    pulls: 75,
    freeSpotEnabled: true
}



//let mc = new MultiplayerController(gameParameters);
//console.log('Starting Game')
//mc.start();
//mc.printStats();

let ms = new MultiSolo(gameParameters)
ms.start()
ms.printStats()




