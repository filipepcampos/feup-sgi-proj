import { ParserResult } from "./ParserResult.js";

export class FloatParser {
    static parse(node, reader, attributeName, minLimit=Number.NEGATIVE_INFINITY, maxLimit=Number.POSITIVE_INFINITY) {
        let value = reader.getFloat(node, attributeName);
        if(!(value != null && !isNaN(value) && value >= minLimit && value <= maxLimit))
            return ParserResult.fromError("unable to parse " + attributeName);
        return ParserResult.fromValue(value);
    }
}