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

    display(){
        for(var child of this.children){
            child.display();
        }
    }
}