import { GameState } from './GameState.js';

export class AnimationState extends GameState {
    constructor(stateManager, gameCTO, renderer, animationTracker, nextState) {
        super(stateManager, gameCTO, renderer);
        this.animationTracker = animationTracker;
        this.nextState = nextState;
    }

    update(curr) {
        if(this.animationTracker.isOver()) {
            this.stateManager.setState(this.nextState);
        } else {
            this.animationTracker.update(curr / 1000);
        }
    }

    display() {
        this.renderer.display(this.gameCTO, this.timeFactor, this.animationTracker);
    }
}