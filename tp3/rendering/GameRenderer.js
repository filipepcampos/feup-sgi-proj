import { BoardRenderer } from "./BoardRenderer.js";

export class GameRenderer {
    constructor(scene) {
        this.scene = scene;
        this.boardRenderer = new BoardRenderer(scene);
    }

    display(gameCTO) {
        this.boardRenderer.display(gameCTO.board);
    }
}