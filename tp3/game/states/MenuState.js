import { State } from './State.js';

export class MenuState extends State {
    constructor(gameCTO) {
        super(gameCTO);
        this.start = 0;
        this.changed = false;
    }

    update(current) {
        if (!this.changed) {
            if (this.start == 0) this.start = current;
            else {
                if (current - this.start > 5000) {
                    this.changed = true;
                this.gameCTO.changeScene("scene.xml");
            }                                    
            }
        }
    }

    display() {
        console.log("this is menu state");
        
    }
}