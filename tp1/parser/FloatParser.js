export class FloatParser {
    static parse(node, attributeName, minLimit=Number.NEGATIVE_INFINITY, maxLimit=Number.POSITIVE_INFINITY) {
        let value = this.reader.getFloat(node, attributeName);
        if(!(value != null && !isNaN(value) && value >= minLimit && value <= maxLimit))
            return ParserResult.fromError("unable to parse " + attributeName);
        return ParserResult.fromValue(value);
    }
}