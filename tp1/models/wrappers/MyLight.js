/**
 * Model that represents a light
 */
export class MyLight {
    /**
     * @param {string} id - Light id
     * @param {bool} enabled - Define if the light is enabled or not
     * @param {vec4} location - Light location
     * @param {vec3} ambient - Light ambient component
     * @param {vec3} diffuse - Light diffuse component
     * @param {vec3} specular - Light specular component
     * @param {vec3} attenuation - Light attenuation
     */
    constructor(id, enabled, location, ambient, diffuse, specular, attenuation){
        this.id = id;
        this.enabled = enabled;
        this.location = location;
        this.ambient = ambient;
        this.diffuse = diffuse;
        this.specular = specular;
        this.attenuation = attenuation;
    }

    /**
     * Gets the id of the light
     * @returns {string} - Id of the light
     */
    getId() {
        return this.id;
    }

    /**
     * Gets the enabled state of the light
     * @returns {bool} - True if the light is enabled, false otherwise
     */
    getEnabled(){
        return this.enabled;
    }

    /**
     * Gets the location of the light
     * @returns {vec4} - Light location
     */
    getLocation(){
        return this.location;
    }

    /**
     * Gets the ambient component of the light
     * @returns {vec3} - Light ambient component
     */
    getAmbient(){
        return this.ambient;
    }

    /**
     * Gets the diffuse component of the light
     * @returns {vec3} - Light diffuse component
     */
    getDiffuse(){
        return this.diffuse;
    }

    /**
     * Gets the specular component of the light
     * @returns {vec3} - Light specular component
     */
    getSpecular(){
        return this.specular;
    }
    
    /**
     * Gets the attenuation of the light
     * @returns {vec3} - Light attenuation
     */
    getAttenuation() {
        this.attenuation;
    }
}