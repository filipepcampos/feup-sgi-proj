import { CGFappearance } from "../../lib/CGF.js";

export class MyMaterial {
    constructor(appearance){
        this.appearance = appearance;
    }

    static instantiate(ambient, diffuse, specular, emission, shininess, scene) {
        let appearance = new CGFappearance(scene);

        appearance.setAmbient(...ambient);
        appearance.setDiffuse(...diffuse);
        appearance.setSpecular(...specular);
        appearance.setEmission(...emission);
        appearance.setShininess(shininess);

        return new MyMaterial(appearance);
    }

    getAppearence(){
        return this.appearance;
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