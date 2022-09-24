export class SceneData {
    constructor(scene, textures, materials, transformations, primitives){
        this.scene = scene;
        this.textures = textures;
        this.materials = materials;
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