import { ParserResult } from "./ParserResult.js";
import { FloatParser } from "./FloatParser.js";
import { BlockParser } from "./BlockParser.js";
import { Coordinate3DParser } from "./Coordinate3DParser.js";
import { Coordinate3D } from "../models/Coordinate3D.js";
import { MyView } from "../models/wrappers/MyView.js";

var DEGREE_TO_RAD = Math.PI / 180;

export class ViewParser {
    static parse(node, reader, scene) {
        if (node.nodeName != "perspective" && node.nodeName != "ortho") {
            return ParserResult.fromError("unknown tag <" + node.nodeName + ">");
        }

        let id = reader.getString(node, 'id');
        if (id == null)
            return ParserResult.fromError("no ID defined for view");
        
        let near = FloatParser.parse(node, reader, "near", 0);
        let far = FloatParser.parse(node, reader, "far", 0);

        if (near.hasError() || far.hasError()) {
            return ParserResult.collect(null, [near, far]);
        }

        let blockParser = new BlockParser();
        const defaultCoord = new Coordinate3D(0, 0, 0);
        const func = (c) => Coordinate3DParser.parse(c, reader);
        const handlerEntries = {
            "from": [func, defaultCoord],
            "to": [func, defaultCoord]
        };

        const handlerMap = new Map(Object.entries(handlerEntries));
        const result = blockParser.parse(node, handlerMap);
        if (result.hasError())
            return result;

        if (node.nodeName == "perspective") {
            let angle = FloatParser.parse(node, reader, "angle", 0);
            if (angle.hasError())
                return angle;
            
            let view = new MyView.instantiate(
                id, 
                angle.getValue() * DEGREE_TO_RAD, 
                near.getValue(),
                far.getValue(),
                vec3.fromValues(...result.getValue()["from"]),
                vec3.fromValues(...result.getValue()["to"])
            );

            return ParserResult.fromValue(view);
        } else if (nodeName == "ortho") {
            let left = FloatParser.parse(node, reader, "left", 0);
            let right = FloatParser.parse(node, reader, "right", 0);
            let top = FloatParser.parse(node, reader, "top", 0);
            let bottom = FloatParser.parse(node, reader, "bottom", 0);

            let up = new Coordinate3D(0, 1, 0);
            for (const child of node.children) {
                if (child.nodeName == "up") {
                    up = Coordinate3DParser.parse(child, reader).getValue();
                }
            }

            let viewOrtho = MyView.instantiateOrtho(
                id,
                left.getValue(),
                right.getValue(),
                bottom.getValue(),
                top.getValue(),
                near.getValue(),
                far.getValue(),
                vec3.fromValues(...result.getValue()["from"]),
                vec3.fromValues(...result.getValue()["to"]),
                up.getArray()
            );

            return ParserResult.fromValue(viewOrtho);
        }
    }
/*
        // Checks for repeated IDs.
        if (this.views[viewID] != null)
            return "ID must be unique for each view (conflict: ID = " + viewID + ")";
*/
}