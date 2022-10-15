export class MyLight {
    constructor(id, enabled, location, ambient, diffuse, specular, attenuation){
        this.id = id;
        this.enabled = enabled;
        this.location = location;
        this.ambient = ambient;
        this.diffuse = diffuse;
        this.specular = specular;
        this.attenuation = attenuation;
    }

    getId() {
        return this.id;
    }

    getEnabled(){
        return this.enabled;
    }

    getLocation(){
        return this.location;
    }

    getAmbient(){
        return this.ambient;
    }

    getDiffuse(){
        return this.diffuse;
    }

    getSpecular(){
        return this.specular;
    }
    
    getAttenuation() {
        this.attenuation;
    }
}