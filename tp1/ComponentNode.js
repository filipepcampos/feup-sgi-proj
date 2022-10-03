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
        this.currentMaterial = this.materialIds.length > 0 ? 0 : -1;
        this.textureId = textureId;
        this.childComponentsId = childComponentsId;
        this.childPrimitivesId = childPrimitivesId;
    }

    setChildren(children) {
        this.children = children;
    }

    display(sceneData){
        var matrix = this.transformationId != null ? sceneData.getTransformation(this.transformationId) : mat4.create();
        var scene = sceneData.getScene();

        let material = this.materialIds[this.currentMaterial];
        if(material == 'inherit'){
            material = sceneData.materialStack.top();
        }
        sceneData.materialStack.push(material);
        sceneData.getMaterial(material).apply();
        
        // Save matrix
        scene.pushMatrix();
        
        // Apply transformation
        scene.multMatrix(matrix);

        // Display children
        for(var child of this.children){
            child.display(sceneData);
        }
        // Restore matrix
        scene.popMatrix();

        var topMaterial = sceneData.materialStack.pop();
        sceneData.getMaterial(topMaterial).apply();
    }
}