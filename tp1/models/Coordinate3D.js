export class Coordinate3D {
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    getArray() {
        return [this.x, this.y, this.z];
    }
}