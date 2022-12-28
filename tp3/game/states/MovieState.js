import { GameState } from "./GameState.js";
import { MyGameCTO } from "../MyGameCTO.js";
import { GameAnimations } from "../GameAnimations.js";
import { AnimationTracker } from "../AnimationTracker.js";
import { AnimationState } from "./AnimationState.js";

export class MovieState extends GameState {
    constructor(stateManager, gameCTO, renderer, gameSequence, initialState) {
        super(stateManager, gameCTO, renderer);
        
        this.gameSequence = gameSequence;
        this.initialState = initialState;
        console.log("INIT MOVIE STATE", this.gameCTO);
        console.log(this.gameSequence);
    }

    update(current) {
        super.update(current);
        this.playMove();
    }

    display() {
        this.renderer.display(this.gameCTO, this.timeFactor, this.animationTracker);
    }

    playMove() {
        const move = this.gameSequence.popFirstMove();
        if (move) {
            console.log("Got move: ", move);
            this.gameCTO.movePiece(move.startTile.piece, move.endTile, move.inMovementChain);
            let animations = new Map();
            animations.set(move.endTile.piece.id, GameAnimations.createMovementAnimation(move.startTile, move.endTile, true, move.switchedPlayer));
            if (move.capturedPiece) {
                const capturedPiece = move.capturedPiece;
                animations.set(capturedPiece.id, GameAnimations.createCaptureAnimation(this.gameCTO.auxiliaryBoard.getAvailableTile(capturedPiece), capturedPiece.tile))
            }
            let animationTracker = new AnimationTracker(animations);

            const nextState = new MovieState(this.stateManager, this.gameCTO, this.renderer, this.gameSequence, this.initialState);
            console.log("Swapping state");
            this.stateManager.setState(new AnimationState(this.stateManager, this.gameCTO, this.renderer, animationTracker, nextState));
        } else { // Return to previous state
            console.log("Returning to ", this.initialState);
            this.stateManager.setState(this.initialState);
        }
        console.log(move, this.gameSequence);
    }
}