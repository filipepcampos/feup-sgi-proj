import { CGFobject } from '../lib/CGF.js';

/**
 * MyCilinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param baseRadius - radius of the cylinder base
 * @param topRadius - radius of the cylinder top
 * @param height - height of the cylinder
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the height
 */
export class MyCylinder extends CGFobject {
    constructor(scene, baseRadius, topRadius, height, slices, stacks) {
        super(scene);
        this.baseRadius = baseRadius;
        this.topRadius = topRadius;
        this.height = height;
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        const alphaAng = 2 * Math.PI / this.slices;
        const alphaHeight = this.height / this.stacks;
        const alphaRadius = (this.topRadius - this.baseRadius) / this.stacks;
        const normalSlope = (this.baseRadius - this.topRadius) / this.height;
        var radius = this.baseRadius;
        var x, y, ang, height = 0;

        // TODO: OPTIMIZE RADIUS = 0 ?
        for (var stack = 0; stack <= this.stacks; ++stack) {
            ang = 0;
            for (var slice = 0; slice <= this.slices; ++slice) {
                // Calculate vertex position
                x = Math.cos(ang);
                y = Math.sin(ang);

                // Push vertex position
                this.vertices.push(x * radius, y * radius, height);

                // Push vertex normal
                this.normals.push(x, y, normalSlope);

                ang += alphaAng;
            }
            radius += alphaRadius;
            height += alphaHeight;
        }

        // TODO: OPTIMIZE CALCULATIONS (repetitions like: vertexPerStack * i)
        var vertexPerStack = this.slices + 1;
        var bottomCurrent, bottomNext, topCurrent, topNext;
        for (var i = 0; i < this.stacks; ++i) {
            for (var j = 0; j < this.slices; ++j) {
                // Update variables
                bottomCurrent = vertexPerStack * i + j;
                bottomNext = vertexPerStack * i + (j + 1);
                topCurrent = vertexPerStack * (i + 1) + j;
                topNext = vertexPerStack * (i + 1) + (j + 1);

                // Top Triangle
                this.indices.push(bottomNext, topCurrent, bottomCurrent);

                // Bottom Triangle
                this.indices.push(bottomNext, topNext, topCurrent);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}