import { Ball } from "./Ball";
import { Tile } from "./Tile";

export class Board{
    id: number
    spacesFilled: number;
    state: {[type: string]: Tile[]};
    gameName: string;
    constructor(gameName: string, maxBall: number, freeSpot: boolean, id: number){

        
        this.id = id;
        this.gameName = gameName;
        this.state = {};
        let game = gameName.split('');
        game.forEach(letter => {
            let ballArr: number[] = []
            for(let i = 0; i < maxBall; i++){
                ballArr.push(i+1);
            }
            ballArr = shuffle(ballArr)
            this.state[letter] = []
            for(let i = 0; i < this.gameName.length; i++){
                this.state[letter].push(new Tile(ballArr[i]))
            }
        }) 
        if(freeSpot){
            let center = Math.floor(this.gameName.length/2);
            let freeTile = new Tile(-1);
            freeTile.marked = true;
            this.state[game[center]][center] = freeTile;
        }
        this.spacesFilled = 0;
    }

    checkAndMarkBoard(ball: Ball): boolean{
        let wasMarked: boolean = false;
        this.state[`${ball.type}`].forEach(T => {
            if(T.value == ball.number){
                T.marked = true;
                wasMarked = true
                this.spacesFilled++;
            }
        })
        return wasMarked
    }
    toString(): string{
        let board = `--- Board ID: ${this.id} ---\n`
        for(let i = 0; i < this.gameName.length; i++){
            for(let j = 0; j < this.gameName.length; j++){
                if(this.state[this.gameName.split('')[i]][j].marked){
                    board = `${board}|${this.state[this.gameName.split('')[i]][j].value}'O'|`
                }else{
                    board = `${board}|${this.state[this.gameName.split('')[i]][j].value}'X'|`
                }
            }
            board = board + this.gameName.split('')[i] +'\n';
        }  
        board = board + '--- End Board ---'
        return board; 
        
    }
}

function shuffle(array: number[]): number[] {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }


  