import { CGFtexture } from "../../../lib/CGF.js";

// TODO: Document
export class MyTexture {
    constructor(id, texture, length_s, length_t) {
        this.id = id;
        this.CGFTexture = CGFTexture;
        this.length_s = length_s;
        this.length_t = length_t
    }

    static instantiate(id, length_s, length_t, scene, fileURL) {
        let CGFTexture = new CGFtexture(scene, fileURL)
        return new MyTexture(id, CGFTexture, length_s, length_t);
    }

    getId() {
        return this.id;
    }

    getCGFTexture() {
        return this.CGFTexture;
    }

    getLength_s() {
        return this.length_s;
    }

    getLength_t() {
        return this.length_t;
    }

    // TODO: this should be in display engine module
    /*apply(parentTexture, sceneData) {
        if (this.textureId == "inherit") {
            if (parentTexture != null && parentTexture.textureId != "none") {
                let texture = sceneData.getTexture(parentTexture.textureId);
                texture.bind(0);
                return parentTexture;
            }
        }
        else if (this.textureId != "none") {
            let texture = sceneData.getTexture(this.textureId);
            texture.bind(0);
            return this;
        }
        return null;
    }*/
}