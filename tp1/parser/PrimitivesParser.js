import { PrimitiveParser } from "./PrimitiveParser.js";
import { ParserResult } from "./ParserResult.js";

export class PrimitivesParser {
    static parse(node, scene, reader) {
        let primitives = {};
        let errors = [];

        for (const child of node.children) {
            const result = PrimitiveParser.parse(child, scene, reader);
            const primitive = result.getValue();
            primitives[primitive.getId()] = primitive; // TODO: REPEATED IDS
            errors.push(...result.getErrors());
        }

        return new ParserResult(primitives, errors);
    }
}