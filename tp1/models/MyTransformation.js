export class MyTransformation {
    constructor(id, mat){
        this.id = id;
        this.mat = mat;
    }

    static instantiate(id) {
        return new MyTransformation(id, mat4.create())
    }

    getId() {
        return this.id;
    }

    getMat() {
        return this.mat;
    }
}