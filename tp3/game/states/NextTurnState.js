import { GameState } from './GameState.js';
import { DestinationSelectionState } from './DestinationSelectionState.js';

export class NextTurnState extends GameState {
    constructor(stateManager, gameCTO, renderer) {
        super(stateManager, gameCTO, renderer);
    }

    display() {
        this.renderer.display(this.gameCTO, this.timeFactor);
    }

    handleInput(type, obj){
        // TODO: verify type == tile and tile has obj
        console.log("NextTurnState: Yo I got " + type + " and obj " + obj.row + "/" + obj.col);
        if(obj.piece != null && this.gameCTO.canPickPiece(obj.piece)){
            this.gameCTO.pickPiece(obj.piece);
            this.stateManager.setState(new DestinationSelectionState(this.stateManager, this.gameCTO, this.renderer, obj));
        }
    }
}