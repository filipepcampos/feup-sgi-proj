import { GameState } from "./GameState.js";
import { MyGameCTO } from "../MyGameCTO.js";
import { GameAnimations } from "../GameAnimations.js";
import { AnimationTracker } from "../AnimationTracker.js";
import { AnimationState } from "./AnimationState.js";

export class MovieState extends GameState {
    constructor(stateManager, gameCTO, renderer, gameSequence, initialState, animationTracker=null) {
        super(stateManager, gameCTO, renderer);

        this.gameSequence = gameSequence;
        this.initialState = initialState;
        this.animationTracker = animationTracker;
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
            const capturedPiece = this.gameCTO.getPieceBetweenTiles(move.startTile, move.endTile);
            const capturedPieceTile = capturedPiece ? capturedPiece.tile : null;

            this.gameCTO.movePiece(move.startTile.piece, move.endTile, move.inMovementChain);
            if (move.switchedPlayer) {
                this.gameCTO.switchPlayer();
            }

            let animations = new Map();
            animations.set(move.endTile.piece.id, GameAnimations.createMovementAnimation(move.startTile, move.endTile, true, move.switchedPlayer));
            if (capturedPiece) {
                console.log("Captured tile: ", capturedPieceTile);
                animations.set(capturedPiece.id, GameAnimations.createCaptureAnimation(capturedPieceTile, capturedPiece.tile));
            }
            let animationTracker = new AnimationTracker(animations);


            const nextState = new MovieState(this.stateManager, this.gameCTO, this.renderer, this.gameSequence, this.initialState, this.animationTracker);
            console.log("Swapping state");
            this.stateManager.setState(new AnimationState(this.stateManager, this.gameCTO, this.renderer, animationTracker, nextState));
        } else { // Return to previous state
            console.log("Returning to ", this.initialState);
            this.stateManager.setState(this.initialState);
        }
        console.log(move, this.gameSequence);
    }
}