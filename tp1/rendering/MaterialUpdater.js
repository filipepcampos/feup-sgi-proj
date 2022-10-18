import { ComponentNode } from "../models/graph/ComponentNode.js";

export class MaterialUpdater {
    constructor(sceneData) { 
        this.sceneData = sceneData;
    }

    update() {
        // TODO See if its possible to iterate only the components
        for (const [id, component] of Object.entries(this.sceneData.components)) {
            component.updateMaterial();
        }
    }
}