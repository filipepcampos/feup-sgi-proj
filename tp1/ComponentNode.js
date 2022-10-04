/**
 * Component Node representation, contains data from <component>
 * @constructor
 * @param id - Node id
 * @param transformationId - Id of the transformation used
 * @param materialIds - List of ids of the materials used (Or "inherit")
 * @param textureId - Id of the texture used (Or "inherit" / "none")
 * @param childComponentsId - Ids of all the children components
 * @param childPrimitivesId - Ids of all the children primitives
 */
export class ComponentNode {
    constructor(id, transformationId, materialIds, textureId, childComponentsId, childPrimitivesId) {
        this.id = id;
        this.transformationId = transformationId;
        this.materialIds = materialIds;
        this.currentMaterial = 0;
        this.textureId = textureId;
        this.childComponentsId = childComponentsId;
        this.childPrimitivesId = childPrimitivesId;
    }

    setChildren(children) {
        this.children = children;
    }

    updateMaterial(){
        this.currentMaterial = (this.currentMaterial + 1) % this.materialIds.length;

        for(let child of this.children){
            if(child instanceof ComponentNode){
                child.updateMaterial();
            }
        }
    }

    display(sceneData, parentMaterial=""){
        var matrix = this.transformationId != null ? sceneData.getTransformation(this.transformationId) : mat4.create();
        var scene = sceneData.getScene();

        let material = this.materialIds[this.currentMaterial];
        if(material == 'inherit'){
            material = parentMaterial;
        }
        sceneData.getMaterial(material).apply();
        
        // Save matrix
        scene.pushMatrix();
        
        // Apply transformation
        scene.multMatrix(matrix);

        // Display children
        for(var child of this.children){
            child.display(sceneData, material);
        }
        // Restore matrix
        scene.popMatrix();
    }
}