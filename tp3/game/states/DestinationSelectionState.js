import { InteractableGameState } from './InteractableGameState.js';
import { NextTurnState } from './NextTurnState.js';
import { PickingTypes } from '../PickingTypes.js';
import { DropPieceState } from './DropPieceState.js';
import { AnimationState } from './AnimationState.js';
import { AnimationTracker } from '../AnimationTracker.js';
import { GameAnimations } from '../GameAnimations.js';
import { MovieState } from "./MovieState.js";
import { MyGameCTO } from '../MyGameCTO.js';
import { GameOverState } from './GameOverState.js';

/**
 * State that handles the selection of a destination tile.
 */
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

    update(current) {
        super.update(current);
        if(this.gameCTO.isGameover()) {
            this.stateManager.setState(new GameOverState(this.stateManager, this.gameCTO, this.renderer));
        }
    }

    handleInput(type, obj){
        super.handleInput(type, obj);
        if (type == PickingTypes.TileSelection) {
            this.handleTilePick(obj);
        } else if (type == PickingTypes.ButtonSelection) {
            if(obj == "undo_button") {
                this.undoMove();
            } else if (obj == "movie_button") {
                const movieGameCTO = new MyGameCTO(this.stateManager.scene);
                const movieGameSequence = movieGameCTO.migrateGameSequence(this.gameCTO.gameSequence.clone());
                this.stateManager.setState(new MovieState(this.stateManager, movieGameCTO, this.renderer, movieGameSequence, this));
            }
        }
    }

    /**
     * Sets the state to the animation state.
     * @param {Tile} endTile - Destination tile
     * @param {Piece} capturedPiece - Captured piece
     * @param {Tile} capturedTile - Captured tile
     * @param {boolean} continuePlaying - If the game should continue playing
     * @param {State} nextState - Next state
     */
    setAnimationState(endTile, capturedPiece, capturedTile, continuePlaying, nextState) {
        let animations = new Map();
        animations.set(endTile.piece.id, GameAnimations.createMovementAnimation(this.startTile, endTile, false, !continuePlaying));
        if (capturedPiece != null) {
            animations.set(capturedPiece.id, GameAnimations.createCaptureAnimation(capturedTile, capturedPiece.tile));
        }

        let animationTracker = new AnimationTracker(animations);

        this.stateManager.setState(new AnimationState(this.stateManager, this.gameCTO, this.renderer, animationTracker, nextState));
    }

    /**
     * Undoes the last move.
     */
    undoMove() {
        if(this.canCancelMove) {
            this.dropPiece();
        } else {
            const move = this.gameCTO.undoMove();
            if (move) {
                let animations = new Map();
                let dropPiece = !move.inMovementChain;
                animations.set(move.startTile.piece.id, GameAnimations.createMovementAnimation(move.endTile, move.startTile, false, dropPiece));
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
        this.gameCTO.removeWarning();
    }
    
    /**
     * Drops the selected piece.
     */
    dropPiece() {
        if(this.canCancelMove) {
            this.gameCTO.unpickPiece();
            this.stateManager.setState(new DropPieceState(this.stateManager, this.gameCTO, this.renderer, this.startTile));
        }
    }

    /**
     * Handles the selection of a tile.
     * @param {Tile} obj - Selected tile
     */
    handleTilePick(obj) {
        const piece = this.startTile.piece;
        const capturedPiece = this.gameCTO.getPieceBetweenTiles(piece.tile, obj);
        const capturedTile = capturedPiece != null ? capturedPiece.tile : null;

        if(this.gameCTO.movePiece(piece, obj, !this.canCancelMove)){ // Success (If can't cancel move, the piece is in a movement chain)
            if (this.gameCTO.pieceHasCaptureAvailable(piece) && (capturedPiece != null)) { // Continue capture chain
                this.setAnimationState(obj, capturedPiece, capturedTile, true, new DestinationSelectionState(this.stateManager, this.gameCTO, this.renderer, piece.tile, this.animationTracker, false));
            } else { // Switch to next player
                this.gameCTO.switchPlayer();
                this.gameCTO.unpickPiece();
                this.setAnimationState(obj, capturedPiece, capturedTile, false, new NextTurnState(this.stateManager, this.gameCTO, this.renderer));
            }
            this.gameCTO.removeWarning();
        } else {
            if(obj == this.startTile) { // Cancel move
                this.dropPiece();
                this.gameCTO.removeWarning();
            } else {
                this.gameCTO.displayWarning();
            }
        }
    }
}