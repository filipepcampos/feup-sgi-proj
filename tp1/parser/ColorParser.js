import { FloatParser } from "./FloatParser.js";
import { ParserResult } from "./ParserResult.js";
import { Color } from "../models/Color.js";

export class ColorParser {
    static parse(node, reader) {
        let r = FloatParser.parse(node, reader, 'r', 0, 1);
        let g = FloatParser.parse(node, reader, 'g', 0, 1);
        let b = FloatParser.parse(node, reader, 'b', 0, 1);
        let a = FloatParser.parse(node, reader, 'a', 0, 1);
        
        return ParserResult.collect(
            new Color(r.getValueOrDefault(0), g.getValueOrDefault(0), b.getValueOrDefault(0), a.getValueOrDefault(1)),
            [r, g, b, a],
            "parsing rgba color"
        );
    }
}