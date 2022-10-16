import { PrimitiveParser } from "./PrimitiveParser.js";
import { ParserResult } from "./ParserResult.js";

export class PrimitivesParser {
    static parse(node, scene, reader) {
        let primitives = {};
        let results = [];

        for (const child of node.children) {
            const result = PrimitiveParser.parse(child, scene, reader);
            const primitive = result.getValue();
            primitives[primitive.getId()] = primitive; // TODO: REPEATED IDS
            results.push(result);
        }

        return ParserResult.collect(primitives, results, "parsing <primitives>");
    }
}