import { PrimitiveParser } from "./PrimitiveParser.js";
import { ParserResult } from "./ParserResult.js";

export class PrimitivesParser {
    static parse(node, scene, reader) {
        let primitives = [];
        let errors = [];

        for (const child of node.children) {
            let result = PrimitiveParser.parse(child, scene, reader);
            primitives.push(result.getValue());
            errors.push(...result.getErrors());
        }

        return new ParserResult(primitives, errors);
    }
}