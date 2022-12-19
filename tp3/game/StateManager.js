import { MenuState } from "./states/MenuState.js";
import { MySceneGraph } from "../MySceneGraph.js";

export class StateManager {
    constructor(scene) {
        this.state = new MenuState(this);
        this.scene = scene;
    }

    setState(state) {
        this.state = state;
    }

    update(current) {
        this.state.update(current);
    }

    display() { 
        this.state.display();
    }
}