import { MaterialParser } from "./MaterialParser.js";
import { ParserResult } from "./ParserResult.js";

export class MaterialsParser {
    static parse(node, scene, reader) {
        let materials = {};
        let errors = [];

        for (const child of node.children) {
            const result = MaterialParser.parse(child, reader, scene);
            const material = result.getValue();
            materials[material.getId()] = material; // TODO: Repeated Id
            errors.push(...result.getErrors());
        }

        console.log("Parsed materials");
        return new ParserResult(materials, errors);
    }
}