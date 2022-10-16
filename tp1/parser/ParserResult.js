export class ParserResult {
    constructor(value, errors){
        this.value = value;
        this.errors = errors;
    }

    static fromError(error) {
        return new ParserResult(null, [error]);
    }
    
    static fromValue(value) {
        return new ParserResult(value, []);
    }
    
    static collect(value, parserResults, context=""){
        let errors = [];
        for(const parserResult of parserResults){
            errors = errors.concat(parserResult.getErrors());
        }
        if(errors.length > 0){
            let k = {};
            k[context] = errors;
            return new ParserResult(value, [k]);
        }
        return this.fromValue(value);
    }

    getValue() {
        return this.value;
    }

    getValueOrDefault(defaultValue) {
        return this.value == null ? defaultValue : this.value;
    }

    getErrors() {
        return this.errors;
    }
    
    hasError() {
        return this.errors.length > 0;
    }
}