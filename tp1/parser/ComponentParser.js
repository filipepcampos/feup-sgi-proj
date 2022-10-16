import { ParserResult } from "./ParserResult.js";
import { TransformationParser } from "./TransformationParser.js";

export class ComponentParser {
    static parse(node, reader, sceneData) {
        if (node.nodeName != "component") {
            return ParserResult.fromError("unknown tag <" + node.nodeName + ">");
        }

        let id = reader.getString(node, "id");
        if (id == null) {
            return ParserResult.fromError("no ID defined for component");
        }

        let nodeNames = [];
        for (var j = 0; j < grandChildren.length; j++) {
            nodeNames.push(grandChildren[j].nodeName);
        }
        var transformationIndex = nodeNames.indexOf("transformation");
        var materialsIndex = nodeNames.indexOf("materials");
        var textureIndex = nodeNames.indexOf("texture");
        var childrenIndex = nodeNames.indexOf("children");
        // TODO: Handle missing subnodes

        const transformation = this.parseTransformation(nodeNames.at(transformationIndex), reader, sceneData);

        return null;
    }

    static embeddedTransformationCount = 0;

    static parseTransformation(node, reader, sceneData){
        if (node.nodeName != "transformation") {
            return ParserResult.fromError("unknown tag <" + node.nodeName + ">");
        }
        const children = transformationNode.children;
        let id = "";
        if (children.length === 1 && children[0].nodeName === "transformationref") {
            id = reader.getString(children[0], 'id');
            if (sceneData.transformations[id] == null) {
                return ParserResult.fromError("transformation with id=" + id + " is not defined");
            }
        } else {
            if (children.length > 0) {
                let transformationMatrix = TransformationParser.parse(node, reader).getValue(); // TODO: Add error
                do {
                    id = '_embeddedtransf' + (this.embeddedTransformationCount++);
                } while (sceneData.transformations[id] != null);
                sceneData.transformations[id] = transformationMatrix;
            } else {
                return null // TODO
            }
        }
        return ParserResult.fromValue(sceneData.transformations[id]);
    }
}