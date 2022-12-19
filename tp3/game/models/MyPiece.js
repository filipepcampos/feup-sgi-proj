import { SceneRenderer } from "../../rendering/SceneRenderer.js";

export class MyPiece {
    constructor(scene) {
        this.scene = scene;
        this.tile = null;
        this.renderer = new SceneRenderer(this.scene.sceneData); // TODO: Maybe receive in constructor
    }

    setTile(tile) {
        this.tile = tile;
    }

    clearTile() {
        this.tile = null;
    }

    display() {
        this.renderer.display(0, this.scene.sceneData.components["car"]);
    }
}