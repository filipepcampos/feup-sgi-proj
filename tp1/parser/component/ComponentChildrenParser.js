import {ParserResult} from "../ParserResult.js";

export class ComponentChildrenParser {
    static parse(node, reader) {
        let components = [];
        let primitives = [];
        let errors = [];

        for(const child of node.children) {
            let childNodeName = child.nodeName;

            let id = reader.getString(child, "id");
            if(childNodeName === "componentref") {
                if(id != null){
                    components.push(id);
                } else {
                    errors.push("no ID defined for componentref");
                }
            } else if (childNodeName === "primitiveref") {
                if(id != null) {
                    primitives.push(id);
                } else {
                    errors.push("no ID defined for primitiveref");
                }
            } else {
                errors.push("unknown tag <" + childNodeName + ">");
            }
        }
        return new ParserResult({'components': components, 'primitives': primitives}, errors);
    }
}