import { CGFappearance } from "../lib/CGF.js";

export class Material {
    constructor(emission, ambient, diffuse, specular, scene){
        this.emission = emission;
        this.ambient = ambient;
        this.diffuse = diffuse;
        this.specular = specular;
        this.appearance = new CGFappearance(scene);
		this.appearance.setAmbient(...ambient);
        this.appearance.setDiffuse(...diffuse);
        this.appearance.setSpecular(...specular);
        this.appearance.setEmission(...emission);
    }
}