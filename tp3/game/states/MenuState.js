import { State } from './State.js';
import { LoadingSceneState } from './LoadingSceneState.js';
import { SceneRenderer } from '../../rendering/SceneRenderer.js';

export class MenuState extends State {
    constructor(stateManager) {
        super(stateManager);
        this.start = 0;
        this.changed = false;
        this.renderer = new SceneRenderer(stateManager.scene.sceneData);
    }

    update(current) {
        //this.stateManager.setState(new LoadingSceneState(this.stateManager));
        if (!this.changed) {
            if (this.start == 0) this.start = current;
            else {
                if (current - this.start > 5000) {
                    this.changed = true;
                    
                    
                }                                    
            }
        }
    }

    display() {
        this.renderer.display(0);
    }
}