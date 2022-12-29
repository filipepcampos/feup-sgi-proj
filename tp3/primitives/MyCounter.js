import { MyCharacter } from "./MyCharacter.js";

/**
 * Primitive that represents a counter.
 */
export class MyCounter {
    constructor(scene) {
        this.digits = [
            new MyCharacter(scene, -2.5, -1.5, -0.5, 0.5, "0"),
            new MyCharacter(scene, -1.5, -0.5, -0.5, 0.5, "0"),
            new MyCharacter(scene, 0.5, 1.5, -0.5, 0.5, "0"),
            new MyCharacter(scene, 1.5, 2.5, -0.5, 0.5, "0"),
        ];
        
        this.separator = new MyCharacter(scene, -0.5, 0.5, -0.5, 0.5, ":");
    }

    setDigit(index, value) {
        this.digits[index].setCharacter(value);
    }

    display() {
        for (const digit of this.digits) {
            digit.display();
        }
        this.separator.display();
    }
}