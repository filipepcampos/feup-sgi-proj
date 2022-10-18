import { ComponentNode } from "../models/graph/ComponentNode.js";

export class MaterialUpdater {
    constructor(sceneData) { 
        this.sceneData = sceneData;
    }

    update() {
        for (const component of Object.values(this.sceneData.components)) {
            component.updateMaterial();
        }
    }
}