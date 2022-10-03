import { CGFobject } from '../lib/CGF.js';
/**
 * TODO
 */
export class MyTorus extends CGFobject {
	constructor(scene, inner, outer, slices, loops) {
		super(scene);
		this.inner = inner;
        this.outer = outer;
        this.slices = slices;
        this.loops = loops;

		this.initBuffers();
	}

	
	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];

        let theta = 0;
        let thetaInc = 2*Math.PI / this.slices;
        let phi = 0;
        let phiInc = 2*Math.PI / this.loops;

        var phiCache = [];
		for(let loop = 0; loop < this.loops; ++loop){
			phiCache.push([Math.sin(phi), Math.cos(phi)]);
            phi += phiInc;
		}

        for(let slice = 0; slice < this.slices; ++slice){ // theta
            let cosTheta = Math.cos(theta);
            let sinTheta = Math.sin(theta);

            // z = r * sin(theta)
            // x = (R+r*cos(theta)) * cos(phi)
            // y = (R+r*cos(theta)) * sin(phi)
            //     ----------------
            //     sliceComponent

            let sliceComponent = this.outer+this.inner*cosTheta;
            let z = this.inner * sinTheta;

            for(let loop = 0; loop < this.loops; ++loop) { // phi
                let [sinPhi, cosPhi] = phiCache[loop];
                
                let x = sliceComponent * cosPhi;
                let y = sliceComponent * sinPhi;
                this.vertices.push(...[x,y,z]);

                let normalX = cosTheta * cosPhi;
                let normalY = cosTheta * sinPhi;
                let normalZ = sinTheta;
                this.normals.push(...[normalX, normalY, normalZ]);
            }
            theta += thetaInc;
        }

        for(let slice = 0; slice < this.slices; ++slice){
            let sliceOffset = slice * (this.loops); // TODO: Optimize? next could be reused
            let nextSliceOffset = ((slice+1) % this.slices) * (this.loops);

            for(let loop = 0; loop < this.loops; ++loop){
                this.indices.push(...[
                    sliceOffset+loop, 
                    sliceOffset+((loop+1)%this.loops),
                    nextSliceOffset+loop
                ]);
                this.indices.push(...[
                    nextSliceOffset+loop, 
                    sliceOffset+((loop+1)%this.loops),
                    nextSliceOffset+((loop+1)%this.loops)
                ]);
            }
        }

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

