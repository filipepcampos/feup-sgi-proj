import { ComponentParser } from "./ComponentParser.js";
import { ParserResult } from "./ParserResult.js";

export class ComponentsParser {
    static parse(node, reader, sceneData) {
        let components = [];
        let errors = [];

        for (const child of node.children) {
            let result = ComponentParser.parse(child, reader, sceneData);
            components.push(result.getValue());
            errors.push(...result.getErrors());
        }
        // TODO: Check for repeated ids

        return new ParserResult(components, errors);
    }
}