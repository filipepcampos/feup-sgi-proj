/**
 * SceneData
 * @constructor
 */
export class SceneData {
    constructor(scene) {
        // Global values
        this.scene = scene;
        this.root = null;
        this.referenceLength = 1;
        this.ambient = [];
        this.background = [];

        // Active (default) values
        this.activeCamera = 0; // TODO: Remove or use?

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