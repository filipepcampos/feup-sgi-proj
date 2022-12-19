import { State } from './State.js';
import { NextTurnState } from './NextTurnState.js';
import { MyGameCTO } from '../MyGameCTO.js';

export class LoadingSceneState extends State {
    constructor(stateManager) {
        super(stateManager);
    }

    update(current) {
        if(this.stateManager.scene.sceneInited) {
            let gameCTO = new MyGameCTO(this.stateManager.scene);
            this.stateManager.setState(new NextTurnState(this.stateManager, gameCTO));
        }
    }

    display() {
        // TODO: DISPLAY LOADING SCREEN
    }
}