import { BoardRenderer } from "./BoardRenderer.js";
import { SceneRenderer } from "./SceneRenderer.js";

export class GameRenderer {
    constructor(scene) {
        this.scene = scene;
        this.sceneRenderer = new SceneRenderer(scene.sceneData);
        this.boardRenderer = new BoardRenderer(scene);
    }

    display(gameCTO, timeFactor) {
        this.boardRenderer.display(gameCTO.board, gameCTO.auxiliaryBoard, gameCTO.selectedPiece);
        this.sceneRenderer.display(timeFactor);
    }
}