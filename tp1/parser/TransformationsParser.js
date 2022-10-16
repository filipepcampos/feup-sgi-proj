import { TransformationParser } from "./TransformationParser.js";
import { ParserResult } from "./ParserResult.js";

export class TransformationsParser {
    static parse(node, reader) {
        let transformations = {};
        let errors = [];

        for(let child of node.children){
            const result = TransformationParser.parse(child, reader);
            const transformation = result.getValue();
            errors.push(...result.getErrors());

            if(transformations[transformation.getId()] == null){
                transformations[transformation.getId()] = transformation;
            } else {
                errors.push("Transformation with ID=" + transformation.getId() + " already exists");
            }
        }
        
        console.log("Parsed transformations");
        return new ParserResult(transformations, errors);
    }
}