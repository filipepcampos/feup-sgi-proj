import { ParseMaterial } from "./ParseMaterial";

export class ParseMaterials {
    static parse(node, scene) {
        let materials = [];
        let errors = [];
        let result;

        for (const child of node.children) {
            // parse Child
            result = ParseMaterial.parse(child, scene);
            materials.push(result.getValue());
            errors.push(result.getErrors());
        }

        console.log("Parsed materials");
        return new ParserResult(materials, errors);
    }
}