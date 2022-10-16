import { ParserResult } from "../ParserResult.js";
import { ComponentNode } from "../../models/graph/ComponentNode.js";
import {ComponentTransformationParser} from "./ComponentTransformationParser.js";
import {ComponentChildrenParser} from "./ComponentChildrenParser.js";
export class ComponentParser {
    static parse(node, reader, sceneData) {
        if (node.nodeName != "component") {
            return ParserResult.fromError("unknown tag <" + node.nodeName + ">");
        }

        let id = reader.getString(node, "id");
        if (id == null) {
            return ParserResult.fromError("no ID defined for component");
        }

        const children = node.children;
        let nodeNames = [];
        for (let j = 0; j < children.length; j++) {
            nodeNames.push(children[j].nodeName);
        }
        const transformationIndex = nodeNames.indexOf("transformation");
        const materialsIndex = nodeNames.indexOf("materials");
        const textureIndex = nodeNames.indexOf("texture");
        const childrenIndex = nodeNames.indexOf("children");
        // TODO: Handle missing subnodes

        const transformationResult = ComponentTransformationParser.parse(children[transformationIndex], reader, sceneData);
        const childrenResult = ComponentChildrenParser.parse(children[childrenIndex], reader);

        return ParserResult.fromValue(
            new ComponentNode(
                id,
                transformationResult.getValue(),
                null, // materials
                null, // texture
                childrenResult.getValue()['components'],
                childrenResult.getValue()['primitives'],
            )
        );
    }
}