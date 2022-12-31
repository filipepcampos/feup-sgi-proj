import { InteractableGameState } from './InteractableGameState.js';
import { MyKeyframeAnimation } from "../../models/MyKeyframeAnimation.js";
import { Keyframe } from '../../models/Keyframe.js';
import { AnimationTracker } from "../AnimationTracker.js";
import { DestinationSelectionState } from './DestinationSelectionState.js';
import { GameAnimations } from '../GameAnimations.js';

/**
 * State that manages the lifting of a piece.
 */
export class LiftPieceState extends InteractableGameState {
    /**
     * @param {StateManager} stateManager - Reference to StateManager object
     * @param {GameCTO} gameCTO - Reference to GameCTO object
     * @param {Renderer} renderer - Reference to Renderer object
     * @param {Tile} startTile - Tile where the piece is located
     */
    constructor(stateManager, gameCTO, renderer, startTile) {
        super(stateManager, gameCTO, renderer);
        this.startTile = startTile;

        let animations = new Map();
        animations.set(startTile.piece.id, GameAnimations.createLiftAnimation(false));
        this.animationTracker = new AnimationTracker(animations);
    }

    update(curr) {
        if(this.animationTracker.isOver()) {
            this.stateManager.setState(new DestinationSelectionState(this.stateManager, this.gameCTO, this.renderer, this.startTile, this.animationTracker));
        } else {
            this.animationTracker.update(curr / 1000);
        }
    }

    display() {
        this.renderer.display(this.gameCTO, this.timeFactor, this.animationTracker);
    }
}