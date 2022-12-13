import { State } from './State.js';
import { NextTurnState } from './NextTurnState.js';

export class MenuState extends State {
    constructor(gameCTO) {
        super(gameCTO);
        this.start = 0;
        this.changed = false;
    }

    update(current) {
        this.gameCTO.setState(new NextTurnState(this.gameCTO)); // TODO: Change for loading
        if (!this.changed) {
            if (this.start == 0) this.start = current;
            else {
                if (current - this.start > 5000) {
                    this.changed = true;
                    
                    
                }                                    
            }
        }
    }

    display() {
    }
}