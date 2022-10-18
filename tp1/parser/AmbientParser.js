import {ColorParser} from "./ColorParser.js";
import {ParserResult} from "./ParserResult.js";

export class AmbientParser {
    static parse(node, reader) {
        let ambient = [];
        let background = [];
        let nodeNames = [];
        for(const child of node.children) {
            nodeNames.push(child.nodeName);
        }

        const ambientIndex = nodeNames.indexOf("ambient");
        const backgroundIndex = nodeNames.indexOf("background");

        const ambientColorResult = ColorParser.parse(node.children[ambientIndex], reader);
        ambient = ambientColorResult.getValueOrDefault([0,0,0,0]);

        const backgroundColorResult = ColorParser.parse(node.children[backgroundIndex], reader);
        background = backgroundColorResult.getValueOrDefault([0,0,0,0]);

        return ParserResult.collect(
                {"ambient": ambient.getArray(), "background": background.getArray()},
                [ambientColorResult, backgroundColorResult],
                "parsing <ambient>");
    }
}