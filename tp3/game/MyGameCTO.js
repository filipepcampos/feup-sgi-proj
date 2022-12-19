import { MenuState } from "./states/MenuState.js";
import { MySceneGraph } from "../MySceneGraph.js";
import { MyGameBoard } from "./models/MyGameBoard.js";

export class MyGameCTO {
    constructor(scene) {
        this.state = new MenuState(this);
        this.scene = scene;
        this.board = new MyGameBoard(scene);
        console.log(scene);
    }

    setState(state) {
        this.state = state;
    }

    update(currTime) {
        this.state.update(currTime);
    }

    display() {
        this.board.display();
    }

    changeScene(filename) {
        new MySceneGraph(filename, this.scene);
    }
}