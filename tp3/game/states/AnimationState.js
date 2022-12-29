import { GameState } from './GameState.js';

/**
 * State that displays an animation.
 */
export class AnimationState extends GameState {
    /**
     * @param {StateManager} stateManager - Reference to StateManager object
     * @param {GameCTO} gameCTO - Reference to GameCTO object
     * @param {Renderer} renderer - Reference to Renderer object
     * @param {AnimationTracker} animationTracker - Reference to AnimationTracker object
     * @param {State} nextState - Next state
     * @param {function} callback - Callback method called on animation end
     */
    constructor(stateManager, gameCTO, renderer, animationTracker, nextState, callback=null) {
        super(stateManager, gameCTO, renderer);
        this.animationTracker = animationTracker;
        this.nextState = nextState;
        this.callback = callback;
    }

    update(curr) {
        if(this.animationTracker.isOver()) {
            if(this.callback) {
                this.callback();
            }
            this.stateManager.setState(this.nextState);
        } else {
            this.animationTracker.update(curr / 1000);
        }
    }

    display() {
        this.renderer.display(this.gameCTO, this.timeFactor, this.animationTracker);
    }
}