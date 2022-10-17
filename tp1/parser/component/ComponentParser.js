import { ParserResult } from "../ParserResult.js";
import { ComponentNode } from "../../models/graph/ComponentNode.js";
import {ComponentTransformationParser} from "./ComponentTransformationParser.js";
import {ComponentChildrenParser} from "./ComponentChildrenParser.js";
import {MyTexture} from "../../models/wrappers/MyTexture.js";
import {FloatParser} from "../FloatParser.js";
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
        const materialResult = this.parseMaterial(children[materialsIndex], reader, sceneData);
        const textureResult = this.parseTexture(children[textureIndex], reader, sceneData);

        return ParserResult.collect(
            new ComponentNode(
                id,
                transformationResult.getValue(),
                materialResult.getValue(), // materials
                textureResult.getValueOrDefault("none"),
                childrenResult.getValue()["components"],
                childrenResult.getValue()["primitives"],
            ),
            [transformationResult, childrenResult, textureResult],
            "parsing <component> with id=" + id
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

        const length_sResult = FloatParser.parse(node, reader, 'length_s'); // TODO: Limits?
        const length_s = length_sResult.getValueOrDefault(1);

        const length_tResult = FloatParser.parse(node, reader, 'length_t'); // TODO Limits?
        const length_t = length_tResult.getValueOrDefault(1);

        return ParserResult.collect(new MyTexture(id, sceneData.textures[id], length_s, length_t), [length_sResult, length_tResult], "parsing <texture>");
    }

    static parseMaterial(node, reader, sceneData) {
        let materials = [];
        let errors = []
        for(const child of node.children) {
            if(child.nodeName !== "material"){
                errors.push("Unexpected tag <" + child.nodeName + ">");
                continue;
            }
            const id = reader.getString(child, "id");
            if(id != null){
                if(sceneData.materials[id] != null) {
                    materials.push(sceneData.materials[id]);
                } else if(id === "inherit") {
                    materials.push(id);
                } else {
                    errors.push("material with id=" + id + " does not exist");
                }
            } else {
                errors.push("missing id on <material>");
            }
        }

        // TODO: Set default material in case its missing
        return new ParserResult(materials, errors);
    }
}