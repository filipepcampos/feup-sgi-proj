import { GameState } from './GameState.js';
import { NextTurnState } from './NextTurnState.js';
import { GameRenderer } from "../../rendering/GameRenderer.js";

export class DestinationSelectionState extends GameState {
    constructor(stateManager, gameCTO, startTile) {
        super(stateManager, gameCTO);
        this.startTile = startTile;
        this.renderer = new GameRenderer(gameCTO.scene);
    }

    update(current) {
        
    }

    display() {
        this.renderer.display(this.gameCTO);
    }

    handleInput(type, obj){
        // TODO: CHECK TYPE
        console.log("Yo I got " + type + " and obj " + obj.row + "/" + obj.col);
        if(obj.piece == null) {
            this.gameCTO.board.movePiece(this.startTile.piece, obj);
            this.stateManager.setState(new NextTurnState(this.stateManager, this.gameCTO));
        }
        if(obj == this.startTile) { // Cancel move
            this.stateManager.setState(new NextTurnState(this.stateManager, this.gameCTO));    
        }
    }
}