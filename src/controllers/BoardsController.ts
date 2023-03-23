import { Ball } from "../classes/Ball";
import { Board } from "../classes/Board";
import { GameParameters } from "../constants/GameParameters";
import { TypeOfWin } from "../constants/TypeOfWin";
import { WinChecker } from "./WinChecker";

export class BoardsController{
    ballsPulled: number
    boards: Board[]
    bingoes: Board[]
    bingoTracker: number[]
    totalWins: number
    totalTypeOfWins: TypeOfWin
    typeOfWins: {[type: number]: TypeOfWin};
    gameParameters: GameParameters

    constructor(gameParams: GameParameters){
        this.ballsPulled = 0;
        this.boards = []
        this.bingoes = []
        this.bingoTracker = []
        this.gameParameters = gameParams;
        this.typeOfWins = {}
        this.totalWins = 0;
        this.totalTypeOfWins = {
            diagonalWin: 0,
            fourCornerWin: 0,
            blackOutWin: 0,
            linearWin: 0,
            easyLinearWin: 0,
        }
        for(let i = 0; i < gameParams.boards; i++){
            let board: Board = new Board(gameParams.gameName, gameParams.ballsPerLetter, gameParams.freeSpotEnabled, i);
            this.boards.push(board);
        }

    }

    playAndReturnBoards(ball: Ball): number {
        this.ballsPulled++;
        let boards = 0;
        this.boards.forEach(board => {
            if(board.checkAndMarkBoard(ball)) boards++;
        })
        return boards;
    }
    
    checkWins(): number {
        let typeOfWin: TypeOfWin = {
            diagonalWin: 0,
            fourCornerWin: 0,
            blackOutWin: 0,
            linearWin: 0,
            easyLinearWin: 0,
        }
        let currentWins = 0;
        for(let i = 0; i < this.boards.length; i++){
            let bingo: boolean = false;
            if(this.gameParameters.blackOutWin && WinChecker.blackOutWin(this.boards[i])){
                console.log('Blackout win???')
                console.log(this.boards[i].toString())
                typeOfWin.blackOutWin++;
                currentWins++;
                this.totalWins++;
                this.totalTypeOfWins.blackOutWin++;
                bingo = true;
            }
            if(this.gameParameters.linearWin){
                let win = WinChecker.linearWin(this.boards[i])
                if(win.win){
                    if(win.easyWin){
                        this.totalWins++;
                        this.totalTypeOfWins.easyLinearWin++;
                        typeOfWin.easyLinearWin++;
                    }else{
                        this.totalWins++;
                        this.totalTypeOfWins.linearWin++;
                        typeOfWin.linearWin++;
                    }
                    currentWins++;
                    bingo = true;
                }
            }
            if(this.gameParameters.diagonalWin && WinChecker.diagonalWin(this.boards[i])){
                typeOfWin.diagonalWin++;
                currentWins++;
                this.totalWins++;
                this.totalTypeOfWins.diagonalWin++;
                bingo = true;

            }
            if(this.gameParameters.fourCornerWin && WinChecker.fourCornerWin(this.boards[i])){
                typeOfWin.fourCornerWin++;
                currentWins++;
                this.totalWins++;
                this.totalTypeOfWins.fourCornerWin++;
                bingo = true;

            }
            if(bingo){
                this.bingoes.push(this.boards.splice(i, 1)[0])
            }
            
        }
        this.typeOfWins[this.ballsPulled] = typeOfWin;
        return currentWins;
    }


}


