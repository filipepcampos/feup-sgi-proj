import { ParserResult } from "./ParserResult";
import { FloatParser } from "./FloatParser";
import { BlockParser } from "./BlockParser";
import { MyMaterial } from "../models/wrappers/MyMaterial";

export class ParseMaterial {
    static parse(node, scene) {
        if (node.nodeName != "material") {
            return ParserResult.fromError("unknown tag <" + node.nodeName + ">");
        }

        let id = this.reader.getString(node, "id");
        if (id == null){
            return ParserResult.fromError("no ID defined for material");
        }

        let shininessResult = FloatParser.parse(node, "shininess");

        const defaultColor = new Color(0,0,0,1);
        const handlerEntries = {
            "emission": [ColorParser.parse, defaultColor],
            "ambient": [ColorParser.parse, defaultColor],
            "diffuse": [ColorParser.parse, defaultColor],
            "specular": [ColorParser.parse, defaultColor],
        };
        const parseResult = BlockParser.parse(node, handlerEntries);

        const components = parseResult.getValue();
        let mat = MyMaterial.instantiate(
            id,
            parseResult["ambient"],
            parseResult["diffuse"],
            parseResult["specular"],
            parseResult["emission"],
            shininessResult.getValueOrDefault(10),
            scene
        );
        return ParserResult.collect(mat, [shininessResult, parseResult]);
    }
}