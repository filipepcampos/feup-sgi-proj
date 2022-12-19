import { GameState } from './GameState.js';
import { DestinationSelectionState } from './DestinationSelectionState.js';

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
        // TODO: verify type == tile and tile has obj
        if(obj.piece != null){
            this.stateManager.setState(new DestinationSelectionState(this.stateManager, this.gameCTO, obj));
        }
    }
}