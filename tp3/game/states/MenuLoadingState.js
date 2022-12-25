import { State } from './State.js';
import { MenuState } from './MenuState.js';

export class MenuLoadingState extends State {
    constructor(stateManager) {
        super(stateManager);
    }

    update(current) {
        console.log("loading?");
        if(this.stateManager.scene.sceneInited) {
            this.stateManager.setState(new MenuState(this.stateManager));
        }
    }

    display() {
        // TODO: DISPLAY LOADING SCREEN
    }
}