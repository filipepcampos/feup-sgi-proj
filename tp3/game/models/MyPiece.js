import { MyCylinder } from "../../primitives/MyCylinder.js";
import { MyTransformation } from "../../models/wrappers/MyTransformation.js";
import { SceneRenderer } from "../../rendering/SceneRenderer.js";

export class MyPiece {
    constructor(scene, boardHeight) {
        // this.model = new MyCylinder(scene, 1/8/2, 1/8/2, 0.2, 10, 10);
        this.scene = scene;
        this.height = 0.05;
        this.boardHeight = boardHeight;
        this.tileWidth = 1/8;
        this.radius = this.tileWidth/2*0.9;
        this.model = new MyCylinder(scene, 0, this.radius, this.height, 10, 10);
    }

    display(x, y) {
        let DEGREE_TO_RAD = Math.PI / 180;
        this.scene.pushMatrix();
        let xOffset = (x-4) * this.tileWidth + this.tileWidth/2;
        let yOffset = (y-4) * this.tileWidth + this.tileWidth/2;
        this.scene.translate(xOffset, this.boardHeight / 2 + this.height, yOffset);
        this.scene.rotate(90 * DEGREE_TO_RAD, 1, 0, 0);
        // this.model.display();
        let renderer = new SceneRenderer(this.scene.sceneData);
        renderer.display(0, this.scene.sceneData.components["car"]);
        this.scene.popMatrix();
    }
}