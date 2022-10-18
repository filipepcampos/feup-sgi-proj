import {PrimitiveNode} from "../models/graph/PrimitiveNode.js";

export class SceneRenderer {
    constructor(sceneData) {
        this.sceneData = sceneData;
    }

    display(node=this.sceneData.components[this.sceneData.root], parentMaterial=null, parentTexture=null) {
        if(node instanceof PrimitiveNode){
            this.displayPrimitive(node, parentTexture);
        } else {
            this.displayComponent(node, parentMaterial, parentTexture);
        }
    }

    displayPrimitive(node, texture) {
        const obj = node.getObject();
        if(texture !== "inherit" && texture !== "none"){
            obj.updateTexLength(texture.getLength_s(), texture.getLength_t());
        }
        node.getObject().display();
    }

    displayComponent(node, parentMaterial, parentTexture) {
        const matrix = node.getTransformation() != null ? node.getTransformation() : mat4.create();
        const scene = this.sceneData.scene;

        let material = node.getMaterial();
        if(material === "inherit") {
            material = parentMaterial;
        }

        material.getCGFAppearance().apply();


        let texture = node.getTexture();
        if(texture === "inherit") {
            texture = parentTexture;
        }
        if(texture !== "none") {
            texture.getCGFTexture().bind(0);
        }

        scene.pushMatrix();
        scene.multMatrix(matrix);

        for(const child of node.getChildren()){
            this.display(child, material, texture);
        }

        scene.popMatrix();
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