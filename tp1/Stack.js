export class Stack {
    constructor(){
        this.stack = [];
    }

    push(elem){
        this.stack.push(elem);
    }

    pop(){
        return this.stack.pop();
    }

    top(){
        if(this.stack.length > 0){
            return this.stack[this.stack.length-1];
        }
        return null;
    }
}