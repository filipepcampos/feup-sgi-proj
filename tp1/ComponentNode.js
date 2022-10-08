import { Texture } from "./Texture.js";

/**
 * Component Node representation, contains data from <component>
 * @constructor
 * @param id - Node id
 * @param transformationId - Id of the transformation used
 * @param materialIds - List of ids of the materials used (Or "inherit")
 * @param {Texture} texture - Texture used
 * @param childComponentsId - Ids of all the children components
 * @param childPrimitivesId - Ids of all the children primitives
 */
 export class ComponentNode {
    constructor(id, transformationId, materialIds, texture, childComponentsId, childPrimitivesId) {
        this.id = id;
        this.transformationId = transformationId;
        this.materialIds = materialIds;
        this.currentMaterial = 0;
        this.texture = texture;
        this.childComponentsId = childComponentsId;
        this.childPrimitivesId = childPrimitivesId;
    }

    setChildren(children) {
        this.children = children;
    }

    updateMaterial(){
        this.currentMaterial = (this.currentMaterial + 1) % this.materialIds.length;
    }

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
    }
}
