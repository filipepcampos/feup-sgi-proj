import { FloatParser } from "./FloatParser";

export class ColorParser {
    static parse(node) {
        let r = FloatParser.parse(node, 'r', 0, 1);
        let g = FloatParser.parse(node, 'g', 0, 1);
        let b = FloatParser.parse(node, 'b', 0, 1);
        let a = FloatParser.parse(node, 'a', 0, 1);

        return ParserResult.collect(
            new Color(r.getValueOrDefault(0), g.getValueOrDefault(0), b.getValueOrDefault(0), a.getValueOrDefault(1)),
            [r, g, b, a]
        );
    }
}