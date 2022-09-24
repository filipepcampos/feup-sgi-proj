export class ComponentNode {
    // TODO: DOCUMENTATION
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

    applyTransformation(sceneData){
        
    }

    display(sceneData){
        var matrix = sceneData.getTransformation(this.transformationId);
        var scene = sceneData.getScene();

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
    }
}