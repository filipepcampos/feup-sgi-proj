import { ParserResult } from "../ParserResult.js";
import { KeyframeAnim } from "../../models/KeyframeAnim.js";
import { KeyframeParser } from "./KeyframeParser.js";

// TODO: Documentation
export class KeyframeAnimationParser {

    static parse(node, reader, scene) {
        if (node.nodeName !== "keyframeanim") {
            return ParserResult.fromError("unknown tag <" + node.nodeName + ">");
        }

        const id = reader.getString(node, "id");
        if (id == null) {
            return ParserResult.fromError("no ID defined for keyframeanim");
        }

        // TODO: CHECK CRESCENT ORDER
        const children = node.children;
        let results = [];
        let keyframes = [];
        for(const child of children){
            // const keyframeResult = KeyframeParser.parse(child, reader, scene);
            // results.push(keyframeResult);
            // keyframes.push(keyframeResult.getValue()); // TODO: Think about error handling
        }

        return ParserResult.fromValue(new KeyframeAnim(id));
    }
}