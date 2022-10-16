import { ViewParser } from "./ViewParser.js";
import { ParserResult } from "./ParserResult.js";

export class ViewsParser {
    static parse(node, reader) {
        let views = {};
        let errors = [];

        for (const child of node.children) {
            const result = ViewParser.parse(child, reader);
            const view = result.getValue();
            views[view.getId()] = view; // TODO: REPEATED IDS
            errors.push(...result.getErrors());
        }

        console.log("Parsed views");
        return new ParserResult(views, errors);
    }
}