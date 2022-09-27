import { CGFobject } from '../lib/CGF.js';
/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Radius of sphere
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MySphere extends CGFobject {
	constructor(scene, radius, slices, stacks) {
		super(scene);
		this.radius = radius;
        this.slices = slices;
        this.stacks = stacks;

		this.initBuffers();
	}

	
	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		var phi = 0;
		var phiInc = Math.PI / this.stacks;
		var thetaInc = (2 * Math.PI) / this.slices;
		var stackVertices = this.slices + 1;

		var thetaCache = [];
		for(let slice = 0; slice <= this.slices; slice++){
			let theta = thetaInc*slice;
			thetaCache.push([Math.sin(-theta), Math.cos(theta)]);
		}
		
		// build an all-around stack at a time
		for (let stack = 0; stack <= this.stacks; stack++) {
			var sinPhi = Math.sin(phi);
			var cosPhi = Math.cos(phi);

			sinPhi = sinPhi*this.radius
			
			// in each stack, build all the slices around
			for (let slice = 0; slice <= this.slices; slice++) {
				//--- Vertices coordinates
				var [x,y] = thetaCache[slice];
				var x =  x*sinPhi;
				var y =  y*sinPhi
				var z = cosPhi*this.radius;
				this.vertices.push(x, y, z);

				//--- Indices
				if (stack < this.stacks && slice < this.slices) {
					var current = stack * stackVertices + slice;
					var next = current + stackVertices;

					// pushing two triangles using indices from this round (current, current+1)
					// and the ones directly south (next, next+1)
					// (i.e. one full round of slices ahead)
					this.indices.push( current + 1, current, next);
					this.indices.push( current + 1, next, next +1);
				}

				//--- Normals
				// at each vertex, the direction of the normal is equal to 
				// the vector from the center of the sphere to the vertex.
				// in a sphere of radius equal to one, the vector length is one.
				// therefore, the value of the normal is equal to the position vector
				this.normals.push(x, y, z);
			}
			phi += phiInc;
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

