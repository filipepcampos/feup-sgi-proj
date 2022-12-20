import { GameState } from './GameState.js';
import { DestinationSelectionState } from './DestinationSelectionState.js';
import { GameRenderer } from "../../rendering/GameRenderer.js";

export class NextTurnState extends GameState {
    constructor(stateManager, gameCTO) {
        super(stateManager, gameCTO);
        this.renderer = new GameRenderer(gameCTO.scene);
    }

    update(current) {
        
    }

    display() {
        this.renderer.display(this.gameCTO);
    }

    handleInput(type, obj){
        // TODO: verify type == tile and tile has obj
        console.log("NextTurnState: Yo I got " + type + " and obj " + obj.row + "/" + obj.col);
        if(obj.piece != null && this.gameCTO.canPickPiece(obj.piece)){
            this.gameCTO.pickPiece(obj.piece);
            this.stateManager.setState(new DestinationSelectionState(this.stateManager, this.gameCTO, obj));
        }
    }
}