import { MenuState } from "./states/MenuState.js";
import { MySceneGraph } from "../MySceneGraph.js";

export class MyGameCTO {
    constructor(scene) {
        this.state = new MenuState(this);
        this.scene = scene;
        console.log(scene);
    }

    setState(state) {
        this.state = state;
    }

    update(currTime) {
        this.state.update(currTime);
    }

    display() {
        this.state.display();
    }

    changeScene(filename) {
        new MySceneGraph(filename, this.scene);
    }
}