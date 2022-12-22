import { State } from './State.js';
import { NextTurnState } from './NextTurnState.js';
import { MyGameCTO } from '../MyGameCTO.js';
import {GameRenderer} from "../../rendering/GameRenderer.js";

export class LoadingSceneState extends State {
    constructor(stateManager) {
        super(stateManager);
    }

    update(current) {
        if(this.stateManager.scene.sceneInited) {
            let gameCTO = new MyGameCTO(this.stateManager.scene);
            let renderer = new GameRenderer(this.stateManager.scene);
            this.stateManager.setState(new NextTurnState(this.stateManager, gameCTO, renderer));
        }
    }

    display() {
        // TODO: DISPLAY LOADING SCREEN
    }
}