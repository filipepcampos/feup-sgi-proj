import { ParserResult } from "./ParserResult.js";
import { Rotation } from "../models/Rotation.js";
import { FloatParser } from "./FloatParser.js";

export class RotationParser {
    static parse(node, reader){
        let errors = [];

        // Get axis
        let axis = reader.getString(node, 'axis');
        if (!(axis != null && axis.length === 1 && ['x', 'y', 'z'].includes(axis)))
            return ParserResult.fromError("unable to parse axis");

        // Get angle
        let angleResult = FloatParser.parse(node, reader, 'angle');
        if(angleResult.hasError()){
            return new ParserResult(null, angleResult.getErrors());
        }

        return ParserResult.fromValue(new Rotation(axis, angleResult.getValue()));
    }
}