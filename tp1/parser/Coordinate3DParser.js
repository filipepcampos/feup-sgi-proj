import { ParserResult } from "./ParserResult.js";
import { FloatParser } from "./FloatParser.js";
import { Coordinate3D } from "../models/Coordinate3D.js";

export class Coordinate3DParser {
    static parse(node, reader) {
        let x = FloatParser.parse(node, reader, "x");
        let y = FloatParser.parse(node, reader, "y");
        let z = FloatParser.parse(node, reader, "z");

        return ParserResult.collect(
            new Coordinate3D(x.getValueOrDefault(0), y.getValueOrDefault(0), z.getValueOrDefault(0)),
            [x, y, z]
        );
    }
}