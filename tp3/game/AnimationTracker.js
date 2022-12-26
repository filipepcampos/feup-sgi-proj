export class AnimationTracker {
    constructor(animations) {
        this.animations = animations;
    }

    isOver() {
        for(const animation of this.animations.values()) {
            if(!animation.isOver()) {
                return false;
            }
        }
        return true;
    }

    update(curr) {
        for(const animation of this.animations.values()) {
            animation.update(curr);
        }
    }

    getAnimation(index) {
        return this.animations.get(index);
    }
}