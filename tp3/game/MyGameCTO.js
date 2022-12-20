import { MenuState } from "./states/MenuState.js";
import { MySceneGraph } from "../MySceneGraph.js";
import { MyGameBoard } from "./models/MyGameBoard.js";

export class MyGameCTO {
    constructor(scene) {
        this.scene = scene;
        this.board = new MyGameBoard(scene);
    }

    update(currTime) {
        this.state.update(currTime);
    }

    changeScene(filename) {
        new MySceneGraph(filename, this.scene);
    }
}