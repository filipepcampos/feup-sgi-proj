import { TransformationParser } from "./TransformationParser.js";
import { ParserResult } from "./ParserResult.js";

export class TransformationsParser {
    static parse(node, reader) {
        let transformations = {};
        let results = [];
        let errors = [];

        for(let child of node.children){
            const result = TransformationParser.parse(child, reader);
            const transformation = result.getValue();
            results.push(result);

            if(transformations[transformation.getId()] == null){
                transformations[transformation.getId()] = transformation;
            } else {
                errors.push("Transformation with ID=" + transformation.getId() + " already exists");
            }
        }
        
        console.log("Parsed transformations", results);
        return ParserResult.collect(transformations, results, "parsing <transformations>", errors);
    }
}