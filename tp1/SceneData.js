import { Stack } from "./Stack.js";

/**
 * SceneData
 * @constructor
 * @param scene - Reference to MyScene object
 * @param textures - Object with all texture definitions
 * @param materials - Object with all materials definitions
 * @param transformations - Object with all transformations definitions
 * @param primitive - Object with all primitives definitions
 */
export class SceneData {
    constructor(scene, textures, materials, transformations, primitives){
        this.scene = scene;
        this.textures = textures;
        this.materials = materials;
        this.materialStack = new Stack();
        this.transformations = transformations;
        this.primitives = primitives;
    }

    getScene(){
        return this.scene;
    }

    getMaterial(materialId) {
        return this.materials[materialId];
    }

    getTexture(textureId) {
        return this.textures[textureId];
    }

    getTransformation(transformationId){
        return this.transformations[transformationId];
    }

    getPrimitive(primitiveId) {
        return this.primitives[primitiveId];
    }
}