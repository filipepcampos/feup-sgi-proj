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
        console.log("Yo I got " + type + " and obj " + obj.row + "/" + obj.col);
        // TODO: verify type == tile and tile has obj
        if(obj.piece != null){
            this.stateManager.setState(new DestinationSelectionState(this.stateManager, this.gameCTO, obj));
        }
    }
}