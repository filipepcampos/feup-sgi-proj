import { SceneRenderer } from "../../rendering/SceneRenderer.js";

const DEGREE_TO_RAD = Math.PI / 180;

export class MyPiece {
    constructor(scene, playerId) {
        this.scene = scene;
        this.tile = null;
        this.renderer = new SceneRenderer(this.scene.sceneData); // TODO: Maybe receive in constructor
        this.playerId = playerId;
    }

    setTile(tile) {
        this.tile = tile;
    }

    clearTile() {
        this.tile = null;
    }

    display() {
        if(this.playerId == 0) {
            this.renderer.display(0, this.scene.sceneData.components["car"]);
        } else {
            this.scene.rotate(180*DEGREE_TO_RAD, 0, 1, 0);
            this.renderer.display(0, this.scene.sceneData.components["car"]);
        }
        
    }
}