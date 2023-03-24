import { Ball } from "../classes/Ball";
import { Board } from "../classes/Board";
import { BingoArray } from "../constants/BingoArray";
import { GameParameters } from "../constants/GameParameters";
import { TypeOfWin } from "../constants/TypeOfWin";
import { WinChecker } from "./WinChecker";

export class BoardsController{
    ballsPulled: number
    boards: BingoArray[]
    boardsThatHadBall: number[]
    bingoTracker: number[]
    totalWins: number
    totalTypeOfWins: TypeOfWin
    typeOfWins: {[type: number]: TypeOfWin};
    gameParameters: GameParameters

    constructor(gameParams: GameParameters){
        this.ballsPulled = 0;
        this.boards = []
        this.bingoTracker = []
        this.boardsThatHadBall = []
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
            this.boards.push({board, bingoed: false});
        }

    }

    playAndReturnBoards(ball: Ball): number {
        this.ballsPulled++;
        let boards = 0;
        for(let i = 0; i < this.boards.length; i++){
            if(this.boards[i].board.checkAndMarkBoard(ball)){
                boards++;
                this.boardsThatHadBall.push(i)
            } 
        }
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
        for(let i = 0; i < this.boardsThatHadBall.length; i++){
            if(this.boards[this.boardsThatHadBall[i]].bingoed) continue;
            let bingo: boolean = false;
            if(this.gameParameters.blackOutWin && WinChecker.blackOutWin(this.boards[this.boardsThatHadBall[i]].board)){
                typeOfWin.blackOutWin++;
                currentWins++;
                this.totalWins++;
                this.totalTypeOfWins.blackOutWin++;
                bingo = true;
            }
            if(this.gameParameters.linearWin){
                let win = WinChecker.linearWin(this.boards[this.boardsThatHadBall[i]].board)
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
            if(this.gameParameters.diagonalWin && WinChecker.diagonalWin(this.boards[this.boardsThatHadBall[i]].board)){
                typeOfWin.diagonalWin++;
                currentWins++;
                this.totalWins++;
                this.totalTypeOfWins.diagonalWin++;
                bingo = true;

            }
            if(this.gameParameters.fourCornerWin && WinChecker.fourCornerWin(this.boards[this.boardsThatHadBall[i]].board)){
                typeOfWin.fourCornerWin++;
                currentWins++;
                this.totalWins++;
                this.totalTypeOfWins.fourCornerWin++;
                bingo = true;

            }

            this.boards[this.boardsThatHadBall[i]].bingoed = bingo
            
        }
        this.typeOfWins[this.ballsPulled] = typeOfWin;
        return currentWins;
    }


}


