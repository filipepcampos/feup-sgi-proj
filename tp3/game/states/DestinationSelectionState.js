import { InteractableGameState } from './InteractableGameState.js';
import { NextTurnState } from './NextTurnState.js';
import { PickingTypes } from '../PickingTypes.js';
import { DropPieceState } from './DropPieceState.js';

export class DestinationSelectionState extends InteractableGameState {
    constructor(stateManager, gameCTO, renderer, startTile, animationTracker, canCancelMove=true) {
        super(stateManager, gameCTO, renderer);
        this.startTile = startTile;
        this.canCancelMove = canCancelMove;
        this.animationTracker = animationTracker;
    }

    display() {
        this.renderer.display(this.gameCTO, this.timeFactor, this.animationTracker);
    }

    handleInput(type, obj){
        if (type == PickingTypes.TileSelection) {
            this.handleTilePick(obj);
        }
        
    }

    handleTilePick(obj) {
        const piece = this.startTile.piece;
        console.log(piece);
        const hasCaptureAvailable = this.gameCTO.pieceHasCaptureAvailable(piece);

        if(this.gameCTO.movePiece(piece, obj, !this.canCancelMove)){ // Success (If can't cancel move, the piece is in a movement chain)
            
            if (this.gameCTO.pieceHasCaptureAvailable(piece) && hasCaptureAvailable) { // Continue capture chain
                this.stateManager.setState(new DestinationSelectionState(this.stateManager, this.gameCTO, this.renderer, piece.tile, this.animationTracker, false));
            } else { // Switch to next player
                this.gameCTO.switchPlayer();
                this.gameCTO.unpickPiece();
                this.stateManager.setState(new NextTurnState(this.stateManager, this.gameCTO, this.renderer));
            }
        } else {
            if(this.canCancelMove && obj == this.startTile) { // Cancel move
                this.gameCTO.unpickPiece();
                this.stateManager.setState(new DropPieceState(this.stateManager, this.gameCTO, this.renderer, this.startTile));    
            }
        }
        console.log("Handled pick (shoudl move to new state)");
    }
}