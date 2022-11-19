import { MyAnimation } from "./wrappers/MyAnimation.js";

export class KeyframeAnim extends MyAnimation {
    constructor(id, keyframes) {
        this.id = id;
        this.keyframes = keyframes;
        this.matrix = null;
    
        // X -- 5   ->  null
        // 5 ---  X -- 15   ->  i
    }

    getId() {
        return this.id;
    }

    getKeyframes() {
        return this.keyframes;
    }

    update(instant) {
        let lastKeyframeIndex = this.getLastKeyframeIndex(instant);
        
        if(lastKeyframeIndex == null) return;

        if (lastKeyframeIndex < this.keyframes.length - 1) { // Animation is running
            const nextKeyframeIndex = lastKeyframeIndex + 1;
            // Interpolate between lastKeyframeIndex and nextKeyframeIndex
            const lastKeyframe = this.keyframes[lastKeyframeIndex];
            const nextKeyframe = this.keyframes[nextKeyframeIndex];
            // const lastInstant = lastKeyframe.instant;
            // const nextInstant = nextKeyframe.instant;
            // const lastMatrix = lastKeyframe.matrix;
            // const nextMatrix = nextKeyframe.matrix;
            // const deltaInstant = nextInstant - lastInstant;
            // deltaInstant = instant - lastInstant;
            // deltaInstant = deltaInstant / deltaInstant;
            // this.matrix = lastMatrix.lerp(nextMatrix, deltaInstant);
        } else { // Animation is finished
            this.matrix = this.keyframes[lastKeyframeIndex].matrix;
        }
    }

    hasAnimationStarted() {
        return this.lastKeyframe != null;
    }

    getLastKeyframeIndex(instant) {
        for(let i = 0; i < this.keyframes.length; ++i) {
            if(keyframes[i].instant > instant){
                return i;
            }
        }
        return null;
    }

    apply(scene) {
        scene.multMatrix(this.matrix);
    }
}