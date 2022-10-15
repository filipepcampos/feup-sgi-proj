export class Rotation {
    constructor(axis, angle){
        this.axis = axis;
        let DEGREE_TO_RAD = Math.PI / 180;
        this.angle = angle * DEGREE_TO_RAD;
    }

    getAxisArray(){
        switch (this.axis) {
            case 'x': return [1, 0, 0];
            case 'y': return [0, 1, 0];
            case 'z': return [0, 0, 1];
        }
        return [0, 0, 0];
    }

    getAngle() {
        return this.angle;
    }
}