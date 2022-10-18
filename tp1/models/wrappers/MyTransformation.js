export class MyTransformation {
    constructor(id, mat=mat4.create()){
        this.id = id;
        this.mat = mat;
    }

    getId() {
        return this.id;
    }

    getMat() {
        return this.mat;
    }
}