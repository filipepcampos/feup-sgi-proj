import { InteractableGameState } from './InteractableGameState.js';
import { MyKeyframeAnimation } from "../../models/MyKeyframeAnimation.js";
import { Keyframe } from '../../models/Keyframe.js';
import { AnimationTracker } from "../AnimationTracker.js";
import { DestinationSelectionState } from './DestinationSelectionState.js';

export class LiftPieceState extends InteractableGameState {
    constructor(stateManager, gameCTO, renderer, startTile) {
        super(stateManager, gameCTO, renderer);
        this.startTile = startTile;

        let animations = new Map();
        animations.set(startTile.piece.id, this.createAnimation());
        this.animationTracker = new AnimationTracker(animations);
    }

    createAnimation() {
        let keyframes = []
        const start = {
            "translation": vec3.fromValues(0, 0, 0),
            "rotationx": vec3.fromValues(0,0,0),
            "rotationy": vec3.fromValues(0,0,0),
            "rotationz": vec3.fromValues(0,0,0),
            "scale": vec3.fromValues(1, 1, 1),
        }
        keyframes.push(new Keyframe(0, start));

        const end = {
            "translation": vec3.fromValues(0, 2.0, 0),
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
            this.stateManager.setState(new DestinationSelectionState(this.stateManager, this.gameCTO, this.renderer, this.startTile, this.animationTracker));
        } else {
            this.animationTracker.update(curr / 1000);
        }
    }

    display() {
        this.renderer.display(this.gameCTO, this.timeFactor, this.animationTracker);
    }
}