import { ParserResult } from "./ParserResult.js";
import { MyTexture } from "../models/wrappers/MyTexture.js";

export class TextureParser {
    static parse(node, reader, scene) {
        if (node.nodeName !== "texture") {
            return ParserResult.fromError("unknown tag <" + node.nodeName + ">");
        }

        const id = reader.getString(node, "id");
        if (id == null) {
            return ParserResult.fromError("no ID defined for texture");
        }

        let fileUrl = reader.getString(node, 'file');
        if (fileUrl == null) {
            return ParserResult.fromError("no file defined for texture with ID = " + id);
        }
        // TODO: Check if file exists?

        return ParserResult.fromValue(MyTexture.instantiate(id, 1, 1, scene, fileUrl));
    }
}