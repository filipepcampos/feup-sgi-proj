export class ComponentsLinker {
    static link(sceneData){
        let errors = [];
        for(const [_, component] of Object.entries(sceneData.components)) {
            let children = [];
            for(const id of component.childComponentsId) {
                children.push(sceneData.components[id]); // TODO: Check for existing keys
            }
            for(const id of component.childPrimitivesId) {
                children.push(sceneData.primitives[id]); // TODO: Check for existing keys
            }
            component.setChildren(children);
            component.childComponentsId = null; // Free unecessary memory usage
            component.childPrimitivesId = null;
        }
        return errors;
    }
}