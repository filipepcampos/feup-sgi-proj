import { GameState } from './GameState.js';
import { MyPiece } from '../models/MyPiece.js';

export class NextTurnState extends GameState {
    constructor(stateManager, gameCTO) {
        super(stateManager, gameCTO);
    }

    update(current) {
        
    }

    display() {
        this.gameCTO.display();
    }

    handleInput(type, obj){
        console.log("Yo I got " + type + " and obj " + obj.row + "/" + obj.col);
    }
}