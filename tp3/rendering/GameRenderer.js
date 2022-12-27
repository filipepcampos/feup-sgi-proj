import { BoardRenderer } from "./BoardRenderer.js";
import { SceneRenderer } from "./SceneRenderer.js";

export class GameRenderer {
    constructor(scene) {
        this.scene = scene;
        this.sceneRenderer = new SceneRenderer(scene.sceneData);
        this.boardRenderer = new BoardRenderer(scene);
    }

    display(gameCTO, timeFactor, animations) {
        this.boardRenderer.display(gameCTO.board, gameCTO.auxiliaryBoard, animations);

        const warning_node = gameCTO.warningActive ? this.scene.sceneData.components["warning_message"] : null;
        this.sceneRenderer.display(timeFactor, warning_node);
    }
}