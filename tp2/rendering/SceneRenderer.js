import {PrimitiveNode} from "../models/graph/PrimitiveNode.js";

/**
 * Class responsible for rendering a SceneData
 */
export class SceneRenderer {
    /**
     * @param {SceneData} sceneData - Reference to the SceneData
     */
    constructor(sceneData) {
        this.sceneData = sceneData;
    }

    /**
     * Displays the given node.
     * Should be called every frame.
     * @param {*} node - Reference to the PrimitiveNode or ComponentNode
     * @param {MyMaterial} parentMaterial - Reference to the parent's material
     * @param {MyTexture} parentTexture - Reference to the parent's texture
     */
    display(timeFactor, node=this.sceneData.components[this.sceneData.root], parentMaterial=null, parentTexture=null) {
        if(node instanceof PrimitiveNode){
            this.displayPrimitive(node, parentTexture);
        } else {
            this.displayComponent(node, parentMaterial, parentTexture, timeFactor);
        }
    }

    /**
     * Auxiliar method to display a PrimitiveNode
     * @param {PrimitiveNode} node - Reference to the PrimitiveNode
     * @param {MyTexture} texture - Reference to the parent's texture
     */
    displayPrimitive(node, texture) {
        const obj = node.getObject();
        if(texture !== "inherit" && texture !== "none"){
            obj.updateTexLength(texture.getLength_s(), texture.getLength_t());
        }
        node.getObject().display();
    }

    /**
     * Auxiliar method to display a ComponentNode
     * @param {ComponentNode} node - Reference to the ComponentNode
     * @param {MyMaterial} parentMaterial - Reference to the parent's material
     * @param {MyTexture} parentTexture - Reference to the parent's texture
     */
    displayComponent(node, parentMaterial, parentTexture, timeFactor) {
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

        //material.getCGFAppearance().apply();
        scene.pushMatrix();
        scene.multMatrix(matrix);

        for(const child of node.getChildComponents()){
            this.displayComponent(child, material, texture, timeFactor);
        }

        const highlight = node.highlight;
        let hasTexture = texture !== "none"; // TODO: Check if this makes sense
        if(highlight != null && highlight.active) {
            this.sceneData.scene.setActiveShader(this.sceneData.highlightShader);
            this.sceneData.highlightShader.setUniformsValues({'scale': highlight.scale_h, 'timeFactor': timeFactor, 'targetColor': highlight.color.getArray(), 'hasTexture': hasTexture});
        }
        for(const child of node.getChildPrimitives()){
            this.displayPrimitive(child, texture);
        }
        if (highlight != null && highlight.active) {
            this.sceneData.scene.setActiveShader(this.sceneData.scene.defaultShader);
        }

        if(texture !== "none") {
            texture.getCGFTexture().unbind(0);
        }
        if(parentTexture !== null && parentTexture !== "none") {
            parentTexture.getCGFTexture().bind(0);
        }
        scene.popMatrix();
        
        if(material != parentMaterial && parentMaterial != null) {
            parentMaterial.getCGFAppearance().apply();
        }
    }
}