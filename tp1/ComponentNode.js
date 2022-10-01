/**
 * Component Node representation, contains data from <component>
 * @constructor
 * @param id - Node id
 * @param transformationId - Id of the transformation used
 * @param materialId - Id of the material used (Or "inherit")
 * @param textureId - Id of the texture used (Or "inherit" / "none")
 * @param childComponentsId - Ids of all the children components
 * @param childPrimitivesId - Ids of all the children primitives
 */
export class ComponentNode {
    constructor(id, transformationId, materialId, textureId, childComponentsId, childPrimitivesId) {
        this.id = id;
        this.transformationId = transformationId;
        this.materialId = materialId;
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

        if(this.materialId != 'inherit'){
            sceneData.materialStack.push(this.materialId);
            sceneData.materials[this.materialId].appearance.apply();
        } else {
            sceneData.materialStack.push(sceneData.materialStack.top());
        }

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
        sceneData.materials[topMaterial].appearance.apply();
    }
}