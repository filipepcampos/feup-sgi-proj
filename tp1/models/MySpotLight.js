export class MySpotLights extends MyLight {
    constructor(id, enabled, location, ambient, diffuse, specular, attenuation, angle, exponent, target) {
        super(id, enabled, location, ambient, diffuse, specular, attenuation);
        this.angle = angle;
        this.exponent = exponent;
        this.target = target;
    }

    getAngle() {
        return this.angle;
    }

    getExponent() {
        return this.exponent;
    }

    getTarget() {
        return this.target;
    }
}