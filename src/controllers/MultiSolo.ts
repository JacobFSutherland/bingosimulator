import { Board } from "../classes/Board";
import { GameParameters } from "../constants/GameParameters";
import { TypeOfWin } from "../constants/TypeOfWin";
import { BlowerController } from "./BlowerContoller";
import { BoardsController } from "./BoardsController";
import { MultiplayerController } from "./MultiplayerController";

export class MultiSolo{
    params: GameParameters
    iterations: number
    game: MultiplayerController
    typeOfWins: {[type: number]: TypeOfWin};
    totalTypeOfWins: TypeOfWin
    

    constructor(p: GameParameters){
        this.params = p
        this.iterations = p.boards
        p.boards = 1
        this.game = new MultiplayerController(p)
        this.typeOfWins = {}
        this.totalTypeOfWins = {
            diagonalWin: 0,
            fourCornerWin: 0,
            blackOutWin: 0,
            linearWin: 0,
            easyLinearWin: 0,
        }
    }

    start(){
        for(let i = 0; i < this.params.pulls; i++){
            let winBoard: TypeOfWin = {
                diagonalWin: 0,
                fourCornerWin: 0,
                blackOutWin: 0,
                linearWin: 0,
                easyLinearWin: 0,
            }
            this.typeOfWins[i] = winBoard
        }
        for(let i = 0; i < this.iterations; i++){
            console.log(`Run ${i} of ${this.iterations}`)
            this.game.start();
            addTypeOfWinTogether(this.totalTypeOfWins, this.game.boardController.totalTypeOfWins);
            for(let i = 1; i < this.params.pulls; i++){
                addTypeOfWinTogether(this.typeOfWins[i], this.game.boardController.typeOfWins[i]);
            }
            this.game = new MultiplayerController(this.params)
        }
    }
    printStats(){
        this.game = new MultiplayerController(this.params)
        this.game.boardController.totalTypeOfWins = this.totalTypeOfWins
        this.game.boardController.typeOfWins = this.typeOfWins
        this.game.printStats()
    }
    
}

function addTypeOfWinTogether(wins: TypeOfWin, winsToBeAdded: TypeOfWin): void {
    wins.blackOutWin += winsToBeAdded.blackOutWin
    wins.diagonalWin += winsToBeAdded.diagonalWin
    wins.easyLinearWin += winsToBeAdded.easyLinearWin
    wins.fourCornerWin += winsToBeAdded.fourCornerWin
    wins.linearWin += winsToBeAdded.linearWin
}