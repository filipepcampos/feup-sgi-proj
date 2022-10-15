import { CGFcamera, CGFcameraOrtho } from "../../../lib/CGF.js";

export class MyView{
    constructor(id, CGFCamera){
        this.id = id;
        this.CGFCamera = CGFCamera;
    }

    // TODO: Document that angle should be in RAD
    static instantiate(id, angleRad, near, far, position, target) {
        let CGFCamera = new CGFcamera(angleRad, near, far, position, target);
        return new MyView(id, CGFCamera);
    }

    static instantiateOrtho(id, left, right, bottom, top, near, far, position, target, up=vec3.fromValues(0,1,0)) {
        let CGFCameraOrtho = new CGFcameraOrtho(left, right, bottom, top, near, far, position, target, up);
        return new MyView(id, CGFCameraOrtho);
    }

    getId() {
        return this.id;
    }

    getCGFCamera(){
        return this.CGFCamera;
    }
}