import { InteractableGameState } from './InteractableGameState.js';
import { PickingTypes } from '../PickingTypes.js';
import { LiftPieceState } from './LiftPieceState.js';
import { GameAnimations } from '../GameAnimations.js';
import { AnimationTracker } from '../AnimationTracker.js';
import { AnimationState } from './AnimationState.js';
import { DestinationSelectionState } from './DestinationSelectionState.js';

export class NextTurnState extends InteractableGameState {
    constructor(stateManager, gameCTO, renderer) {
        super(stateManager, gameCTO, renderer);
    }

    display() {
        this.renderer.display(this.gameCTO, this.timeFactor);
    }

    handleInput(type, obj) {
        super.handleInput(type, obj);
        if (type == PickingTypes.TileSelection) {
            this.handleTilePick(obj);
        } else if (type == PickingTypes.ButtonSelection) {
            if(obj == "undo_button") {
                this.undoMove();
            }
        }
    }

    undoMove() {
        const move = this.gameCTO.undoMove();
        
        if(move) {
            let animations = new Map();
            animations.set(move.startTile.piece.id, GameAnimations.createMovementAnimation(move.endTile, move.startTile, true, !move.inMovementChain));
            if (move.capturedPiece) {
                const capturedPiece = move.capturedPiece;
                animations.set(capturedPiece.id, GameAnimations.createCaptureAnimation(this.gameCTO.auxiliaryBoard.getAvailableTile(capturedPiece), capturedPiece.tile))
            }
            let animationTracker = new AnimationTracker(animations);
            
            if(move.inMovementChain) {
                this.stateManager.setState(new AnimationState(this.stateManager, this.gameCTO, this.renderer, animationTracker, new DestinationSelectionState(this.stateManager, this.gameCTO, this.renderer, move.startTile, animationTracker, false)));
            } else {
                this.stateManager.setState(new AnimationState(this.stateManager, this.gameCTO, this.renderer, animationTracker, new NextTurnState(this.stateManager, this.gameCTO, this.renderer)));
            }
        }
    }

    handleTilePick(obj) {
        if(obj.piece != null && this.gameCTO.canPickPiece(obj.piece) && !this.gameCTO.isGameover()){
            this.gameCTO.pickPiece(obj.piece);
            this.stateManager.setState(new LiftPieceState(this.stateManager, this.gameCTO, this.renderer, obj));
        }
    }
}