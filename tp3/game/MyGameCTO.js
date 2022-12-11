import { MenuState } from "./states/MenuState.js";

export class MyGameCTO {
    constructor() {
        this.state = new MenuState();
    }

    setState(state) {
        this.state = state;
    }

    update() {
        this.state.update();
    }

    display() {
        this.state.display();
    }
}