import { Ball } from "../classes/Ball";
import { GameParameters } from "../constants/GameParameters";

export class BlowerController{
    balls: Ball[]
    ballsPulled: Ball[]
    constructor(gp: GameParameters){
        this.balls = []
        this.ballsPulled = []
        for(let i = 0; i < gp.gameName.length; i++){
            for(let j = 1; j < gp.ballsPerLetter+1; j++){
                let b: Ball = new Ball(gp.gameName.split('')[i], j);
                this.balls.push(b);
            }
        }
    }

    blow(): Ball{
        this.balls = shuffle(this.balls);
        let blownBall = this.balls.pop()
        if(blownBall === undefined){
            throw new Error("No More Ball!!!!!")
        }
        this.ballsPulled.push(blownBall);
        return blownBall;
    }
}

function shuffle(array: Ball[]): Ball[] {
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