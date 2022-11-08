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
    display(node=this.sceneData.components[this.sceneData.root], parentMaterial=null, parentTexture=null, highlight=false) {
        if(node instanceof PrimitiveNode){
            this.displayPrimitive(node, parentTexture, highlight);
        } else {
            this.displayComponent(node, parentMaterial, parentTexture);
        }
    }

    /**
     * Auxiliar method to display a PrimitiveNode
     * @param {PrimitiveNode} node - Reference to the PrimitiveNode
     * @param {MyTexture} texture - Reference to the parent's texture
     */
    displayPrimitive(node, texture, highlight) {
        const obj = node.getObject();
        if(texture !== "inherit" && texture !== "none"){
            obj.updateTexLength(texture.getLength_s(), texture.getLength_t());
        }
        if(highlight) {
            this.sceneData.scene.setActiveShader(this.sceneData.highlightShader);
        }
        node.getObject().display();
        if (highlight) {
            this.sceneData.scene.setActiveShader(this.sceneData.scene.defaultShader);
        }
    }

    /**
     * Auxiliar method to display a ComponentNode
     * @param {ComponentNode} node - Reference to the ComponentNode
     * @param {MyMaterial} parentMaterial - Reference to the parent's material
     * @param {MyTexture} parentTexture - Reference to the parent's texture
     */
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

        //material.getCGFAppearance().apply();
        scene.pushMatrix();
        scene.multMatrix(matrix);

        let activateHighlight = node.highlight != null && node.highlight.active;

        // TODO: SEPARETE FOR PRIMITIVES AND COMPONENTS
        for(const child of node.getChildren()){
            this.display(child, material, texture, activateHighlight);
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