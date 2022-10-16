export class PrimitiveNode {
    constructor(id, CGFObject) {
        this.id = id;
        this.object = CGFObject;
    }

    getId() {
        return this.id;
    }

    getObject() {
        return this.object;
    }
}