import { InteractableGameState } from './InteractableGameState.js';
import { PickingTypes } from '../PickingTypes.js';
import { LiftPieceState } from './LiftPieceState.js';
import { GameAnimations } from '../GameAnimations.js';
import { AnimationTracker } from '../AnimationTracker.js';
import { AnimationState } from './AnimationState.js';
import { DestinationSelectionState } from './DestinationSelectionState.js';
import { MovieState } from "./MovieState.js";
import { MyGameCTO } from '../MyGameCTO.js';
import { GameOverState } from "./GameOverState.js";

/**
 * State that handles the selection of a tile.
 * If the tile has a piece, it will be lifted.
 */
export class NextTurnState extends InteractableGameState {
    /**
     * @param {StateManager} stateManager - State manager
     * @param {GameCTO} gameCTO - Game CTO
     * @param {Renderer} renderer - Renderer
     */
    constructor(stateManager, gameCTO, renderer) {
        super(stateManager, gameCTO, renderer);
    }

    display() {
        this.renderer.display(this.gameCTO, this.timeFactor);
    }

    update(current) {
        super.update(current);
        if(this.gameCTO.isGameover()) {
            this.stateManager.setState(new GameOverState(this.stateManager, this.gameCTO, this.renderer));
        }
    }

    handleInput(type, obj) {
        super.handleInput(type, obj);
        if (type == PickingTypes.TileSelection) {
            this.handleTilePick(obj);
        } else if (type == PickingTypes.ButtonSelection) {
            if(obj == "undo_button") {
                this.undoMove();
            }  else if (obj == "movie_button") {
                const movieGameCTO = new MyGameCTO(this.stateManager.scene);
                console.log(this.gameCTO.gameSequence);
                const movieGameSequence = movieGameCTO.migrateGameSequence(this.gameCTO.gameSequence.clone());
                this.stateManager.setState(new MovieState(this.stateManager, movieGameCTO, this.renderer, movieGameSequence, this));
            }
        }
    }

    /**
     * Handles the undo of a move.
     * If the move was part of a movement chain, the state will be changed to the destination selection state.
     * Otherwise, the state will be changed to the next turn state.
     */
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
                this.gameCTO.pickPiece(move.endTile.piece);
                this.stateManager.setState(new AnimationState(this.stateManager, this.gameCTO, this.renderer, animationTracker, new DestinationSelectionState(this.stateManager, this.gameCTO, this.renderer, move.startTile, animationTracker, false)));
            } else {
                this.stateManager.setState(new AnimationState(this.stateManager, this.gameCTO, this.renderer, animationTracker, new NextTurnState(this.stateManager, this.gameCTO, this.renderer)));
            }
        }
    }

    /**
     * Handles the selection of a tile.
     */
    handleTilePick(obj) {
        if(obj.piece != null && this.gameCTO.canPickPiece(obj.piece) && !this.gameCTO.isGameover()){
            this.gameCTO.pickPiece(obj.piece);
            this.stateManager.setState(new LiftPieceState(this.stateManager, this.gameCTO, this.renderer, obj));
        }
    }
}