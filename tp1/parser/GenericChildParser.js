import {ParserResult} from "./ParserResult.js";

export class GenericChildParser {
    static parse(node, reader, arg, parserClass, typeName="") {
        let output = {};
        let results = [];
        let errors = [];

        for(let child of node.children){
            const result = parserClass.parse(child, reader, arg);
            const v = result.getValue();
            results.push(result);

            if(output[v.getId()] == null){
                output[v.getId()] = v;
            } else {
                errors.push(typeName + " with id=" + v.getId() + " already exists");
            }
        }

        console.log("Parsed " + typeName + "s", results);
        return ParserResult.collect(output, results, "parsing <" + typeName + "s>", errors);
    }
}