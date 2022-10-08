import { Texture } from "./Texture.js";

/**
 * TODO
 */
export class PrimitiveNode {
    constructor(primitive) {
        this.primitive = primitive;
    }


    display(sceneData, parentMaterial = "", parentTexture = null) {
        if (parentTexture != null) {
            this.primitive.updateTexLength(parentTexture.length_s, parentTexture.length_t);
        }
        this.primitive.display();
    }
}
