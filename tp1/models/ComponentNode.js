import { Texture } from "./MyTexture.js";

/**
 * Component Node representation, contains data from <component>
 * @constructor
 * @param id - Node id
 * @param transformation - Id of the transformation used
 * @param materials - List of ids of the materials used (Or "inherit")
 * @param {Texture} texture - Texture used
 * @param childComponentsId - Ids of all the children components
 * @param childPrimitives - All the children primitives
 */
 export class ComponentNode {
    constructor(id, transformation, materials, texture, childComponentsId, childPrimitives) {
        this.id = id;
        this.transformation = transformation;
        this.materials = materials;
        this.currentMaterial = 0;
        this.texture = texture;
        this.childComponentsId = childComponentsId;
        this.childPrimitives = childPrimitives;
    }

    setChildren(children) {
        this.children = children;
    }

    updateMaterial(){
        this.currentMaterial = (this.currentMaterial + 1) % this.materialIds.length;
    }

    /*
    display(sceneData, parentMaterial="", parentTexture=null){
        var matrix = this.transformationId != null ? sceneData.getTransformation(this.transformationId) : mat4.create();
        var scene = sceneData.getScene();

        let material = this.materialIds[this.currentMaterial];
        if(material == 'inherit'){
            material = parentMaterial;
        }
        
        sceneData.getMaterial(material).apply();

        var texture = this.texture.apply(parentTexture, sceneData);
        
        // Save matrix
        scene.pushMatrix();
        
        // Apply transformation
        scene.multMatrix(matrix);

        // Display children
        for(var child of this.children){
            child.display(sceneData, material, texture);
        }
        // Restore matrix
        scene.popMatrix();
    } */
}
