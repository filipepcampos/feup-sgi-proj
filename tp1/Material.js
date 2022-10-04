import { CGFappearance } from "../lib/CGF.js";

export class Material {
    constructor(emission, ambient, diffuse, specular, shininess, scene){
        this.appearance = new CGFappearance(scene);
		this.appearance.setAmbient(...ambient);
        this.appearance.setDiffuse(...diffuse);
        this.appearance.setSpecular(...specular);
        this.appearance.setEmission(...emission);
        this.appearance.setShininess(shininess);
    }

    getAppearence(){
        return this.appearance;
    }
}