export class Ball{
    
    type: String;
    number: Number;

    constructor(type: String, number: Number){
        this.type = type;
        this.number = number;
    }

    toString(): String {
        return `${this.type}${this.number}`
    }
}


