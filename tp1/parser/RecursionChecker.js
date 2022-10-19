import {PrimitiveNode} from "../models/graph/PrimitiveNode.js";

export class RecursionChecker {
    static checkRecursion(sceneData){
        const root = sceneData.root;
        let errors = [];
        const hasRecursion = this._check(sceneData.components[root], {}, errors);
        return errors;
    }

    // TODO: Document
    static _check(node, visited, errors=[]){
        if(node instanceof PrimitiveNode) {
            return false;
        }

        let nextVisited = structuredClone(visited); // Avoid using same reference for multiple component forks
        nextVisited[node.getId()] = true;

        let hasRecursion = false;
        let children = node.getChildren();
        for(let i = children.length - 1; i >= 0; i--) {
            if(nextVisited[children[i].getId()] === true) {
                errors.push("rendering component with id=" + children[i].getId() + " (child of component with id=" + node.getId() + ") would cause recursion, so it will be removed");
                children.splice(i, 1);
                hasRecursion = true;
            } else {
                hasRecursion = this._check(children[i], nextVisited, errors) || hasRecursion;
            }
        }
        return hasRecursion;
    }
}