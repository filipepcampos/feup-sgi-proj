import { ParserResult } from "./ParserResult.js";
import { MyTransformation } from "../models/wrappers/MyTransformation.js";
import { RotationParser } from "./RotationParser.js";
import { Coordinate3DParser } from "./Coordinate3DParser.js";

export class TransformationParser {
    static parse(node, reader, needsId=true) {
        if(node.nodeName !== "transformation") {
            return ParserResult.fromError("unknown tag <" + node.nodeName + ">");
        }

        let id = null;
        if(needsId){
            id = reader.getString(node, "id");
            if (id == null) {
                return ParserResult.fromError("no ID defined for transformation");
            }
        }

        let transformationMatrix = mat4.create();
        let errors = [];

        for(let child of node.children) {
            switch(child.nodeName) {
                case 'translate':
                    let translate_coordinates = Coordinate3DParser.parse(child, reader);
                    if(!translate_coordinates.hasError()){
                        transformationMatrix = mat4.translate(
                            transformationMatrix, 
                            transformationMatrix, 
                            translate_coordinates.getValue().getArray()
                        );
                    } else {
                        errors = errors.concat(translate_coordinates.getErrors());
                    }
                    break;
                case 'scale':
                    let scale_coordinates = Coordinate3DParser.parse(child, reader);
                    if(!scale_coordinates.hasError()){
                        transformationMatrix = mat4.scale(
                            transformationMatrix, 
                            transformationMatrix, 
                            scale_coordinates.getValue().getArray()
                        );
                    } else {
                        errors = errors.concat(scale_coordinates.getErrors());
                    }
                    break;
                case 'rotate':
                    let rotation = RotationParser.parse(child, reader);
                    if(!rotation.hasError()){
                        transformationMatrix = mat4.rotate(
                            transformationMatrix, 
                            transformationMatrix, 
                            rotation.getValue().getAngle(),
                            rotation.getValue().getAxisArray()
                        );
                    } else {
                        errors = errors.concat(rotation.getErrors());
                    }
                    break;
                default:
                    errors.add("unknown tag <" + child.nodeName + ">");
                    break;
            }
        }
        return new ParserResult(new MyTransformation(id, transformationMatrix), errors);
    }
}