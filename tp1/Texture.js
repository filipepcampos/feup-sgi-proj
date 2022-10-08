// TODO: Document
export class Texture {
    constructor(textureId, length_s = null, length_t = null) {
        this.textureId = textureId;
        this.length_s = length_s;
        this.length_t = length_t
    }

    apply(parentTexture, sceneData) {
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
    }
}