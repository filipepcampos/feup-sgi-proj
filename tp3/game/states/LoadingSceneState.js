import { GameState } from './GameState.js';
import { NextTurnState } from './NextTurnState.js';
import { MyGameCTO } from '../MyGameCTO.js';

export class LoadingSceneState extends GameState {
    constructor(stateManager, gameCTO) {
        super(stateManager, gameCTO);
    }

    update(current) {
        if(this.gameCTO.scene.sceneInited) {
            this.stateManager.setState(new NextTurnState(this.stateManager, this.gameCTO));
        }
    }

    display() {
        // TODO: DISPLAY LOADING SCREEN
    }
}