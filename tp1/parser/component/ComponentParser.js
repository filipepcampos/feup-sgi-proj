import { ParserResult } from "../ParserResult.js";
import { ComponentNode } from "../../models/graph/ComponentNode.js";
import {ComponentTransformationParser} from "./ComponentTransformationParser.js";
import {ComponentChildrenParser} from "./ComponentChildrenParser.js";
import {MyTexture} from "../../models/wrappers/MyTexture.js";
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

        // TODO: Error handle all these results
        const transformationResult = ComponentTransformationParser.parse(children[transformationIndex], reader, sceneData);
        const childrenResult = ComponentChildrenParser.parse(children[childrenIndex], reader);
        const textureResult = this.parseTexture(children[textureIndex], reader, sceneData);

        return ParserResult.collect(
            new ComponentNode(
                id,
                transformationResult.getValue(),
                null, // materials
                textureResult.getValueOrDefault("none"),
                childrenResult.getValue()["components"],
                childrenResult.getValue()["primitives"],
            ),
            [transformationResult, childrenResult, textureResult],
            "component with ID=" + id
        );
    }

    static parseTexture(node, reader, sceneData) {
        if (node.nodeName !== "texture") {
            return ParserResult.fromError("unknown tag <" + node.nodeName + ">");
        }

        // Get id of the current texture.
        const id = reader.getString(node, 'id');
        if (id == null) {
            return ParserResult.fromError("no ID defined for texture");
        }

        if(id === "inherit" || id === "none") {
            return ParserResult.fromValue(id);
        }

        // Check if texture exists
        if (sceneData.textures[id] == null) {
            return ParserResult.fromError("Texture with ID " + id + " does not exist");
        }

        let errors = [];
        let length_s = reader.getFloat(node, 'length_s');
        if (!(length_s != null && !isNaN(length_s))) {
            errors.push("unable to parse length_s of the texture for ID = " + id);
            length_s = 1;
        }

        let length_t = reader.getFloat(node, 'length_t');
        if (!(length_t != null && !isNaN(length_t))) {
            errors.push("unable to parse length_t of the texture for ID = " + id);
            length_t = 1;
        }

        return new ParserResult(new MyTexture(id, sceneData.textures[id], length_s, length_t), errors);
    }
}