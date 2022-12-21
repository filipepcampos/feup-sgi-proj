import { GameState } from './GameState.js';
import { NextTurnState } from './NextTurnState.js';

export class DestinationSelectionState extends GameState {
    constructor(stateManager, gameCTO, renderer, startTile) {
        super(stateManager, gameCTO, renderer);
        this.startTile = startTile;
    }

    display() {
        this.renderer.display(this.gameCTO, this.timeFactor);
    }

    handleInput(type, obj){
        // TODO: CHECK TYPE
        console.log("DestinationSelectionState: Yo I got " + type + " and obj " + obj.row + "/" + obj.col);
        console.log("Debugging: " + this.gameCTO.getPossibleCaptures(this.startTile.piece));
        if(this.gameCTO.movePiece(this.startTile.piece, obj)){ // Success
            this.gameCTO.switchPlayer();
            this.gameCTO.unpickPiece();
            this.stateManager.setState(new NextTurnState(this.stateManager, this.gameCTO, this.renderer));
        } else {
            if(obj == this.startTile) { // Cancel move
                this.gameCTO.unpickPiece();
                this.stateManager.setState(new NextTurnState(this.stateManager, this.gameCTO, this.renderer));    
            }
        }
    }
}