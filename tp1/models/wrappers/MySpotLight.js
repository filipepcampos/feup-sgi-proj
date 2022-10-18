/**
 * Model representing a spot light
 */
export class MySpotLights extends MyLight {
    /**
     * @param {string} id - Light id
     * @param {bool} enabled - Define if the light is enabled or not
     * @param {vec4} location - Light location
     * @param {vec3} ambient - Light ambient component
     * @param {vec3} diffuse - Light diffuse component
     * @param {vec3} specular - Light specular component
     * @param {vec3} attenuation - Light attenuation
     * @param {float} angle - Light angle
     * @param {float} exponent - Light exponent
     * @param {vec3} target - Light target
     */
    constructor(id, enabled, location, ambient, diffuse, specular, attenuation, angle, exponent, target) {
        super(id, enabled, location, ambient, diffuse, specular, attenuation);
        this.angle = angle;
        this.exponent = exponent;
        this.target = target;
    }

    /**
     * Gets the angle of the light
     * @returns {float} - Light angle
     */
    getAngle() {
        return this.angle;
    }

    /**
     * Gets the light exponent
     * @returns {float} - Light exponent
     */
    getExponent() {
        return this.exponent;
    }

    /**
     * Gets the light target
     * @returns {vec3} - Light target
     */
    getTarget() {
        return this.target;
    }
}