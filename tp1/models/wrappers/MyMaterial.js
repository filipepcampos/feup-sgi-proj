import { CGFappearance } from "../../../lib/CGF.js";

export class MyMaterial {
    constructor(id, CGFAppearance){
        this.id = id;
        this.CGFAppearance = CGFAppearance;
    }

    static instantiate(id, ambient, diffuse, specular, emission, shininess, scene) {
        let CGFAppearance = new CGFappearance(scene);

        CGFAppearance.setAmbient(...ambient.getArray());
        CGFAppearance.setDiffuse(...diffuse.getArray());
        CGFAppearance.setSpecular(...specular.getArray());
        CGFAppearance.setEmission(...emission.getArray());
        CGFAppearance.setShininess(shininess);

        return new MyMaterial(id, CGFAppearance);
    }

    getId() {
        return this.id;
    }

    getCGFAppearance(){
        return this.CGFAppearance;
    }

    getEmission(){
        return this.CGFAppearance.emission;
    }

    getAmbient(){
        return this.CGFAppearance.ambient;
    }

    getDiffuse(){
        return this.CGFAppearance.diffuse;
    }

    getSpecular(){
        return this.CGFAppearance.specular;
    }

    getShininess(){
        return this.CGFAppearance.shininess;
    }
}