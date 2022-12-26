import { State } from './State.js';
import { LoadingSceneState } from "./LoadingSceneState.js";
import { SceneRenderer } from '../../rendering/SceneRenderer.js';
import { PickingTypes } from '../PickingTypes.js';
import { MySceneGraph } from '../../MySceneGraph.js';

export class MenuState extends State {
    constructor(stateManager) {
        super(stateManager);
        this.start = 0;
        this.changed = false;
        this.renderer = new SceneRenderer(stateManager.scene.sceneData);
        this.selected_scene = null;
    }

    update(current) {
        if (!this.changed) {
            if (this.start == 0) this.start = current;
            else {
                if (current - this.start > 5000) {
                    this.changed = true;
                    
                    
                }                                    
            }
        }
    }

    handleInput(type, obj) {
        if (type == PickingTypes.ButtonSelection) {
            if (obj == "start_button" && this.selected_scene != null) {
                // parse scene name
                // change scene and state
                let filename = this.selected_scene.replace("scene_button_", "") + ".xml";
                console.log("Switching scene to filename=" + filename);
                this.stateManager.scene.initScene();
                new MySceneGraph(filename, this.stateManager.scene);
                this.stateManager.setState(new LoadingSceneState(this.stateManager));
            } else if (obj.startsWith("scene_button_")) {
                this.selected_scene = obj;
                this.changeSceneButtonColor(obj);
            }
        }
    }

    changeSceneButtonColor(selectedScene) {
        const componentsObject = this.stateManager.scene.sceneData.components 
        for(const [id, component] of Object.entries(componentsObject)) {
            if (id == selectedScene) {
                component.currentMaterial = 1;
            }
            else if (id.startsWith("scene_button_")) {
                component.currentMaterial = 0;
            }
        }
    }

    display() {
        this.renderer.display(0);
    }
}