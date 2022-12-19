import { State } from './State.js';
import { LoadingSceneState } from './LoadingSceneState.js';
import { MyGameCTO } from '../MyGameCTO.js';

export class MenuState extends State {
    constructor(stateManager) {
        super(stateManager);
        this.start = 0;
        this.changed = false;
    }

    update(current) {
        this.startGame();
        if (!this.changed) {
            if (this.start == 0) this.start = current;
            else {
                if (current - this.start > 5000) {
                    this.changed = true;
                    
                    
                }                                    
            }
        }
    }

    startGame() {
        let gameCTO = new MyGameCTO(this.stateManager.scene);
        this.stateManager.setState(new LoadingSceneState(this.stateManager, gameCTO));
    }

    display() {
    }
}