import { BoardRenderer } from "./BoardRenderer.js";
import { SceneRenderer } from "./SceneRenderer.js";

export class GameRenderer {
    constructor(scene) {
        this.scene = scene;
        this.sceneRenderer = new SceneRenderer(scene.sceneData);
        this.boardRenderer = new BoardRenderer(scene);
    }

    display(gameCTO) { // TODO: Add timefactor
        this.sceneRenderer.display(0);
        this.boardRenderer.display(gameCTO.board, gameCTO.selectedPiece);
    }
}