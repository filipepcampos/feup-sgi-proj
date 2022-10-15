import { CGFappearance } from "../../../lib/CGF.js";

export class MyMaterial {
    constructor(id, CGFAppearance){
        this.id = id;
        this.CGFAppearance = CGFAppearance;
    }

    static instantiate(id, ambient, diffuse, specular, emission, shininess, scene) {
        let CGFAppearance = new CGFappearance(scene);

        appearance.setAmbient(...ambient);
        appearance.setDiffuse(...diffuse);
        appearance.setSpecular(...specular);
        appearance.setEmission(...emission);
        appearance.setShininess(shininess);

        return new MyMaterial(id, CGFAppearance);
    }

    getId() {
        return this.id;
    }

    getCGFAppearance(){
        return this.CGFAppearance;
    }

    getEmission(){
        return this.appearance.emission;
    }

    getAmbient(){
        return this.appearance.ambient;
    }

    getDiffuse(){
        return this.appearance.diffuse;
    }

    getSpecular(){
        return this.appearance.specular;
    }

    getShininess(){
        return this.appearance.shininess;
    }
}