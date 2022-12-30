import { InteractableGameState } from './InteractableGameState.js';
import { MyKeyframeAnimation } from "../../models/MyKeyframeAnimation.js";
import { Keyframe } from '../../models/Keyframe.js';
import { AnimationTracker } from "../AnimationTracker.js";
import { NextTurnState } from './NextTurnState.js';

/**
 * State that manages the dropping of a piece.
 */
export class DropPieceState extends InteractableGameState {
    /**
     * @param {StateManager} stateManager - Reference to StateManager object
     * @param {GameCTO} gameCTO - Reference to GameCTO object
     * @param {Renderer} renderer - Reference to Renderer object
     * @param {Tile} startTile - Tile where the piece is dropped
     * @param {function} callback - Callback method called on animation end
     */
    constructor(stateManager, gameCTO, renderer, startTile, callback) {
        super(stateManager, gameCTO, renderer);
        this.startTile = startTile;

        let animations = new Map();
        animations.set(startTile.piece.id, this.createAnimation());
        this.animationTracker = new AnimationTracker(animations);

        this.callback = callback;
    }

    // TODO: Move
    /**
     * Creates the animation for the piece.
     * @returns {MyKeyframeAnimation} - Animation for the piece
     */
    createAnimation() {
        let keyframes = []
        const start = {
            "translation": vec3.fromValues(0, 0.04, 0),
            "rotationx": vec3.fromValues(0,0,0),
            "rotationy": vec3.fromValues(0,0,0),
            "rotationz": vec3.fromValues(0,0,0),
            "scale": vec3.fromValues(1, 1, 1),
        }
        keyframes.push(new Keyframe(0, start));

        const end = {
            "translation": vec3.fromValues(0, 0.0, 0),
            "rotationx": vec3.fromValues(0,0,0),
            "rotationy": vec3.fromValues(0,0,0),
            "rotationz": vec3.fromValues(0,0,0),
            "scale": vec3.fromValues(1, 1, 1),
        }
        keyframes.push(new Keyframe(0.5, end));

        return new MyKeyframeAnimation("_lift", keyframes, true, true);
    }

    update(curr) {
        if(this.animationTracker.isOver()) {
            if(this.callback) {
                this.callback();
            }
            this.stateManager.setState(new NextTurnState(this.stateManager, this.gameCTO, this.renderer));
        } else {
            this.animationTracker.update(curr / 1000);
        }
    }

    display() {
        this.renderer.display(this.gameCTO, this.timeFactor, this.animationTracker);
    }
}