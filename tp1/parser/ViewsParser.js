import { ViewParser } from "./ViewParser.js";
import { ParserResult } from "./ParserResult.js";

export class ViewsParser {
    static parse(node, reader) {
        let views = [];
        let errors = [];

        for (const child of node.children) {
            let result = ViewParser.parse(child, reader);
            console.log("viewparser: ", result);
            views.push(result.getValue());
            errors.push(...result.getErrors());
        }

        console.log("Parsed views");
        return new ParserResult(views, errors);
    }
}