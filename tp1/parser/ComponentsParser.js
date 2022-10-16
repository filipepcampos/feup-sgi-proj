import { ComponentParser } from "./ComponentParser.js";
import { ParserResult } from "./ParserResult.js";

export class ComponentsParser {
    static parse(node, reader, sceneData) {
        let components = {};
        let errors = [];

        for (const child of node.children) {
            const result = ComponentParser.parse(child, reader, sceneData);
            const component = result.getValue();
            components[component.getId()] = component; // TODO: Repeated Ids
            errors.push(...result.getErrors());
        }
        // TODO: Check for repeated ids

        return new ParserResult(components, errors);
    }
}