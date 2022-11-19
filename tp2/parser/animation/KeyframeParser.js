import { FloatParser } from "../FloatParser.js";
import { TransformationParser } from "../TransformationParser.js";

const TRANSLATION_INDEX = 0;
const ROTATION_Z_INDEX = 1;
const ROTATION_Y_INDEX = 2;
const ROTATION_X_INDEX = 3;
const SCALE_INDEX = 4;

export class KeyframeParser {
    static parse(node, reader, scene) {
        if (node.nodeName !== "keyframe") {
            return ParserResult.fromError("unknown tag <" + node.nodeName + ">");
        }

        const instantResult = FloatParser.parse(node, reader, "instant"); // TODO: Error handle float
        
        if (node.children.length !== 5) {
            // TODO: RETURN ERROR
            return null;
        }

        if (KeyframeParser.hasOrderError(node, reader)) {
            // TODO: RETURN ERROR
            return null;
        }
        // PARSE TRANSFORMATIONS
        const transformationResult = TransformationParser.parse(node, reader, false, "keyframe", ["sx", "sy", "sz"]);
        console.log(transformationResult);
    }

    static hasOrderError(node, reader) {
        let transformations = [];
        for (const child of node.children) {
            let name = child.nodeName;
            if (name === "rotation") {
                const axis = reader.getString(node, 'axis');
                if (!(axis != null && axis.length === 1 && ['x', 'y', 'z'].includes(axis)))
                    return ParserResult.fromError("unable to parse axis");
                name += axis;
            }
            transformations.push(name);
        }
        return transformations[TRANSLATION_INDEX] !== "translate" ||
            transformations[ROTATION_Z_INDEX] !== "rotatez" ||
            transformations[ROTATION_Y_INDEX] !== "rotatey" ||
            transformations[ROTATION_X_INDEX] !== "rotatex" ||
            transformations[SCALE_INDEX] !== "scale";
    }
}