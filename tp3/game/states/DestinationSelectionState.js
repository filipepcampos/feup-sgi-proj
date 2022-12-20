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
        console.log("DestinationSelectionState: Yo I got " + type + " and obj " + obj.row + "/" + obj.col);
        console.log("Debugging: " + this.gameCTO.getPossibleCaptures(this.startTile.piece));
        if(this.gameCTO.movePiece(this.startTile.piece, obj)){ // Success
            this.gameCTO.switchPlayer();
            this.gameCTO.unpickPiece();
            this.stateManager.setState(new NextTurnState(this.stateManager, this.gameCTO));
        } else {
            if(obj == this.startTile) { // Cancel move
                this.gameCTO.unpickPiece();
                this.stateManager.setState(new NextTurnState(this.stateManager, this.gameCTO));    
            }
        }
    }
}