import { SceneRenderer } from "../../rendering/SceneRenderer.js";

export class MyPiece {
    constructor(scene) {
        this.scene = scene;
        this.height = 0.05;  // TODO: VARIABLE?
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
        /*let DEGREE_TO_RAD = Math.PI / 180;
        this.scene.pushMatrix();
        let xOffset = (x-4) * this.tileWidth + this.tileWidth/2;
        let yOffset = (y-4) * this.tileWidth + this.tileWidth/2;
        this.scene.translate(xOffset, this.boardHeight / 2 + this.height, yOffset);
        this.scene.rotate(90 * DEGREE_TO_RAD, 1, 0, 0);*/
        this.renderer.display(0, this.scene.sceneData.components["car"]);
        //this.scene.popMatrix();
    }
}