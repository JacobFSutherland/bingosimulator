import { GameParameters } from "../constants/GameParameters";
import { BlowerController } from "./BlowerContoller";
import { BoardsController } from "./BoardsController";

export class MultiplayerController{
    blower: BlowerController;
    boardController: BoardsController
    gameParameters: GameParameters;
    constructor(params: GameParameters){
        this.gameParameters = params;
        this.blower = new BlowerController(params);
        this.boardController = new BoardsController(params)
    }
    start(){
        for(let i = 0; i < this.gameParameters.pulls; i++){
            let ball = this.blower.blow()
            let boardsThatHadBall = this.boardController.playAndReturnBoards(ball);
            let wins = this.boardController.checkWins();
        }
        
    }
    printStats(){

        let avgDiagonal = 0;
        let avg4Corner = 0;
        let avgBlackout = 0;
        let avgEasyLineWin = 0;
        let avgHardLineWin = 0;
        let avgLineWin = 0;

        for(let i = 0; i < Object.keys(this.boardController.typeOfWins).length; i++){
            let intKey = parseInt(Object.keys(this.boardController.typeOfWins)[i])
            avgBlackout = avgBlackout + (intKey * this.boardController.typeOfWins[intKey].blackOutWin)
            avgDiagonal = avgDiagonal + (intKey * this.boardController.typeOfWins[intKey].diagonalWin)
            avg4Corner = avg4Corner + (intKey * this.boardController.typeOfWins[intKey].fourCornerWin)
            avgEasyLineWin = avgEasyLineWin + (intKey * this.boardController.typeOfWins[intKey].easyLinearWin)
            avgHardLineWin = avgHardLineWin + (intKey * this.boardController.typeOfWins[intKey].linearWin)
        }
        avgLineWin = (avgEasyLineWin + avgHardLineWin)/(this.boardController.totalTypeOfWins.linearWin+this.boardController.totalTypeOfWins.easyLinearWin);
        avgBlackout = avgBlackout/this.boardController.totalTypeOfWins.blackOutWin;
        avgDiagonal = avgDiagonal/this.boardController.totalTypeOfWins.diagonalWin;
        avg4Corner = avg4Corner/this.boardController.totalTypeOfWins.fourCornerWin;
        avgBlackout = avgBlackout/this.boardController.totalTypeOfWins.blackOutWin;
        avgEasyLineWin = avgEasyLineWin/this.boardController.totalTypeOfWins.easyLinearWin;
        avgHardLineWin = avgHardLineWin/this.boardController.totalTypeOfWins.linearWin;


        console.log(`Board Name: ${this.gameParameters.gameName}`)
        console.log(`Number of itterations: ${this.gameParameters.pulls}`)
        console.log(`Bingo Cards Played: ${this.gameParameters.boards}`)
        console.log('--------------------------------\n')
        console.log(`diagonal win: ${this.boardController.totalTypeOfWins.diagonalWin/this.boardController.totalWins} | ${this.boardController.totalTypeOfWins.diagonalWin}/${this.boardController.totalWins}`)
        console.log(`four corner win: ${this.boardController.totalTypeOfWins.fourCornerWin/this.boardController.totalWins} | ${this.boardController.totalTypeOfWins.fourCornerWin}/${this.boardController.totalWins}`)
        console.log(`blackout win: ${this.boardController.totalTypeOfWins.blackOutWin/this.boardController.totalWins} | ${this.boardController.totalTypeOfWins.blackOutWin}/${this.boardController.totalWins}`)
        console.log(`-------------------------------\n`)
        if(this.gameParameters.freeSpotEnabled){
            console.log('--- Free Spot Enabled ---')
            console.log(`hard line win: ${this.boardController.totalTypeOfWins.linearWin/this.boardController.totalWins} | ${this.boardController.totalTypeOfWins.linearWin}/${this.boardController.totalWins}`)
            console.log(`easy line win: ${this.boardController.totalTypeOfWins.easyLinearWin/this.boardController.totalWins} | ${this.boardController.totalTypeOfWins.easyLinearWin}/${this.boardController.totalWins}`)
            console.log(`ratio of easy to hard linear win: ${this.boardController.totalTypeOfWins.easyLinearWin/this.boardController.totalTypeOfWins.linearWin} | ${this.boardController.totalTypeOfWins.easyLinearWin}/${this.boardController.totalTypeOfWins.linearWin}`)
        }else{
            console.log('--- Free Spot Disabled ---');
            console.log(`line win: ${(this.boardController.totalTypeOfWins.linearWin + this.boardController.totalTypeOfWins.easyLinearWin)/this.boardController.totalWins} | ${(this.boardController.totalTypeOfWins.linearWin + this.boardController.totalTypeOfWins.easyLinearWin)}/${this.boardController.totalWins}`)
        }
        console.log('\n')
        console.log('-------------------------------\n')
        console.log(`average time for diagonal win: ${avgDiagonal}`)
        console.log(`average time for four corner win: ${avg4Corner}`)
        console.log(`average time for blackout win: ${avgBlackout}`)
        if(this.gameParameters.freeSpotEnabled){
            console.log(`average time for easy line win: ${avgEasyLineWin}`)
            console.log(`average time for hard line win: ${avgHardLineWin}`)
        }
        console.log(`average time for line win: ${avgLineWin}`)

        console.log('\n')
        for(let i = 1; i <= this.blower.ballsPulled.length; i++){
            let {easyLinearWin, diagonalWin, fourCornerWin, linearWin, blackOutWin} = this.boardController.typeOfWins[i];
            if(!(easyLinearWin == 0 && diagonalWin == 0 && fourCornerWin == 0 && linearWin == 0 && blackOutWin == 0)){
                let outputstr = `Pull ${i} |`
                if(this.gameParameters.diagonalWin) outputstr += ` Diagonal Wins: ${diagonalWin} |`
                if(this.gameParameters.fourCornerWin) outputstr += ` Four Corner Wins: ${fourCornerWin} |`
                if(this.gameParameters.linearWin) outputstr += (this.gameParameters.freeSpotEnabled)?` Easy Linear Wins: ${easyLinearWin} | Hard Linear Wins: ${linearWin}| `: ` Linear Wins: ${easyLinearWin+linearWin} |`
                if(this.gameParameters.blackOutWin) outputstr += ` Blackout Wins: ${blackOutWin} |`
                console.log(outputstr)
            }
        }
    }

    printNonWinningBoards(){
        this.boardController.boards.forEach(board => {
            console.log(board.toString());
        });
    }
}