import { MenuLoadingState } from "./states/MenuLoadingState.js";

export class StateManager {
    constructor(scene) {
        this.scene = scene;
        this.state = new MenuLoadingState(this);
    }

    setState(state) {
        this.state = state;
    }

    update(current) {
        this.state.update(current);
    }

    display() {
        this.state.display();
    }

    handleInput(type, obj) {
        this.state.handleInput(type, obj);
    }
}