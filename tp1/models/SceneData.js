/**
 * SceneData
 * @constructor
 */
export class SceneData {
    constructor(scene) {
        // Global values
        this.scene = scene;
        this.root = null;

        // Active (default) values
        this.activeCamera = 0;

        // Lists of elements
        this.views = {};
        this.lights = {};
        this.textures = {};
        this.materials = {};
        this.transformations = {};
        this.primitives = {};
        this.components = {}
    }
}