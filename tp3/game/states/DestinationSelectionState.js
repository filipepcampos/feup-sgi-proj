import { GameState } from './GameState.js';
import { NextTurnState } from './NextTurnState.js';

export class DestinationSelectionState extends GameState {
    constructor(stateManager, gameCTO, renderer, startTile, canCancelMove=true) {
        super(stateManager, gameCTO, renderer);
        this.startTile = startTile;
        this.canCancelMove = canCancelMove;
    }

    display() {
        this.renderer.display(this.gameCTO, this.timeFactor);
    }

    handleInput(type, obj){
        // TODO: CHECK TYPE
        console.log("DestinationSelectionState: Yo I got " + type + " and obj " + obj.row + "/" + obj.col);
        console.log("Debugging: " + this.gameCTO.getPossibleCapturesByPiece(this.startTile.piece));
        const piece = this.startTile.piece;
        const hasCaptureAvailable = this.gameCTO.pieceHasCaptureAvailable(piece);

        if(this.gameCTO.movePiece(piece, obj)){ // Success
            if (this.gameCTO.pieceHasCaptureAvailable(piece) && hasCaptureAvailable) { // Continue capture chain
                this.stateManager.setState(new DestinationSelectionState(this.stateManager, this.gameCTO, this.renderer, piece.tile, false));
            } else { // Switch to next player
                this.gameCTO.switchPlayer();
                this.gameCTO.unpickPiece();
                this.stateManager.setState(new NextTurnState(this.stateManager, this.gameCTO, this.renderer));
            }
        } else {
            if(this.canCancelMove && obj == this.startTile) { // Cancel move
                this.gameCTO.unpickPiece();
                this.stateManager.setState(new NextTurnState(this.stateManager, this.gameCTO, this.renderer));    
            }
        }
    }
}