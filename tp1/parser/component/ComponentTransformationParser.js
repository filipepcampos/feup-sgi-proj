import {TransformationParser} from "../TransformationParser.js";
import {ParserResult} from "../ParserResult.js";
import { MyTransformation } from "../../models/wrappers/MyTransformation.js";

export class ComponentTransformationParser {
    static embeddedTransformationCount = 0;
    static parse(node, reader, sceneData){
        if (node.nodeName !== "transformation") {
            return ParserResult.fromError("unknown tag <" + node.nodeName + ">");
        }
        const children = node.children;
        let id = "";
        if (children.length === 1 && children[0].nodeName === "transformationref") {
            id = reader.getString(children[0], 'id');
            if (sceneData.transformations[id] == null) {
                return ParserResult.fromError("transformation with id=" + id + " is not defined");
            }
        } else {
            if (children.length > 0) {
                const transformationMatrixResult = TransformationParser.parse(node, reader, false);
                return ParserResult.collect(transformationMatrixResult.getValue().getMat(), [transformationMatrixResult], "parsing <transformation>");
            } else {
                return ParserResult.fromValue(null);
            }
        }
        return ParserResult.fromValue(sceneData.transformations[id].getMat());
    }
}