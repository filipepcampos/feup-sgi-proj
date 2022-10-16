/**
 * Component Node representation, contains data from <component>
 * @constructor
 * @param id - Node id
 * @param transformation - Id of the transformation used
 * @param materials - List of ids of the materials used (Or "inherit")
 * @param {Texture} texture - Texture used
 * @param childComponentsId - Ids of all the children components
 * @param childPrimitivesId - Ids of all the children primitives
 */
 export class ComponentNode {
    constructor(id, transformation, materials, texture, childComponentsId, childPrimitivesId) {
        this.id = id;
        this.transformation = transformation;
        this.materials = materials;
        this.currentMaterial = 0;
        this.texture = texture;
        this.childComponentsId = childComponentsId;
        this.childPrimitivesId = childPrimitivesId;
    }

    getId() {
        return this.id;
    }

    setChildren(children) {
        this.children = children;
    }

    getChildren() {
        return this.children;
    }

    getTransformation() {
        return this.transformation;
    }

    getMaterial() {
        return this.materials[this.currentMaterial];
    }

    getTexture() {
        return this.texture;
    }

    updateMaterial() {
        this.currentMaterial = (this.currentMaterial + 1) % this.materialIds.length;
    }
}
