export class ParserErrorPrinter {
    static print(error, nesting_level=0) {
        if(Array.isArray(error)){
            for(const e of error){
                if (typeof e === 'string' || e instanceof String){
                    console.warn(" ".repeat(nesting_level*4) + error);
                } else {
                    for(const [context, otherErrors] of Object.entries(e)) {
                        console.warn(" ".repeat(nesting_level*4) + context);
                        this.print(otherErrors, nesting_level+1);
                    }
                }
            }
        } else {
            console.log(" ".repeat(nesting_level*4) + error);
        }
    }
}