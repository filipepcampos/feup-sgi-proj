import { MaterialParser } from "./MaterialParser.js";
import { ParserResult } from "./ParserResult.js";

export class MaterialsParser {
    static parse(node, scene, reader) {
        let materials = {};
        let results = [];

        for (const child of node.children) {
            const result = MaterialParser.parse(child, reader, scene);
            const material = result.getValue();
            materials[material.getId()] = material;
            results.push(result);
        }

        console.log("Parsed materials");
        return ParserResult.collect(materials, results, "parsing <materials>");
    }
}