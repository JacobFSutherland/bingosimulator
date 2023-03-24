import { Board } from "../classes/Board";
import { WinType } from "../constants/WinType";

export class WinChecker{
    static diagonalWin(b: Board): boolean{
        return (firstDiagonal(b) || secondDiagonal(b))
    }

    static fourCornerWin(b: Board): boolean{
        let first = b.gameName.split('')[0]
        let last = b.gameName.split('')[b.gameName.length-1]
        return (b.state[first][0].marked && b.state[last][0].marked && b.state[first][b.gameName.length-1].marked && b.state[last][b.gameName.length-1].marked)
    }
    static blackOutWin(b: Board): boolean{
        for(let i = 0; i < b.gameName.length; i++){
            for(let j = 0; j < b.gameName.length; j++){
                if(!b.state[b.gameName.split('')[i]][j].marked) return false;
            }
        }
        return true;
    }
    static linearWin(b: Board): WinType{
        for(let i = 0; i < b.gameName.length; i++){
            for(let j = 0; j < b.gameName.length; j++){
                if(!b.state[b.gameName.split('')[i]][j].marked){
                    break;
                } 
                if(j == b.gameName.length-1){
                    if(i == Math.floor(b.gameName.length/2)){
                        return {easyWin: true, win: true}
                    }
                    return {easyWin: false, win: true}
                }
            }
        }
        for(let i = 0; i < b.gameName.length; i++){
            for(let j = 0; j < b.gameName.length; j++){
                if(!b.state[b.gameName.split('')[j]][i].marked){
                    break;
                } 
                if(j == b.gameName.length-1){
                    if(j == Math.floor(b.gameName.length/2)){
                        return {easyWin: true, win: true}
                    }
                    return {easyWin: false, win: true}
                }
            }
        }
        return {easyWin: false, win: false};
    }
}

function firstDiagonal(b: Board): boolean{
    for(let i = 0; i < b.gameName.length; i++){
        if(b.state[b.gameName.split('')[i]][i].marked == false) return false;
    }
    return true;
}
function secondDiagonal(b: Board): boolean{
    let i = 0
    for(let j = b.gameName.length-1; j >= 0; j--){
        if(b.state[b.gameName.split('')[i++]][j].marked == false) return false;
    }
    return true;
}