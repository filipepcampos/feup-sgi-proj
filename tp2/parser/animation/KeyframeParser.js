import { FloatParser } from "../FloatParser.js";
import { TransformationParser } from "../TransformationParser.js";
import { ParserResult } from "../ParserResult.js";
import { Keyframe } from "../../models/Keyframe.js";

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
        
        // TODO: What should we do when there's no instant?
        if (node.children.length !== 5) {
            // TODO: RETURN ERROR
            return null;
        }

        if (KeyframeParser.hasOrderError(node, reader)) {
            // TODO: RETURN ERROR
            console.log("wrong order");
            return null;
        }

        // PARSE TRANSFORMATIONS
        const transformationResult = TransformationParser.parse(node, reader, false, "keyframe", "translation", "rotation", ["sx", "sy", "sz"]);
        return new ParserResult(new Keyframe(instantResult.getValue(), transformationResult.getValue().mat)); // TODO: Error handling
    }

    static hasOrderError(node, reader) {
        let transformations = [];
        for (const child of node.children) {
            let name = child.nodeName;
            if (name === "rotation") {
                const axis = reader.getString(child, 'axis');
                if (!(axis != null && axis.length === 1 && ['x', 'y', 'z'].includes(axis)))
                    return ParserResult.fromError("unable to parse axis");
                name += axis;
            }
            transformations.push(name);
        }

        return transformations[TRANSLATION_INDEX] !== "translation" ||
            transformations[ROTATION_Z_INDEX] !== "rotationz" ||
            transformations[ROTATION_Y_INDEX] !== "rotationy" ||
            transformations[ROTATION_X_INDEX] !== "rotationx" ||
            transformations[SCALE_INDEX] !== "scale";
    }
}