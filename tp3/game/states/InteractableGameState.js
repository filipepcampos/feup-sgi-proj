import { GameState } from "./GameState.js";

export class InteractableGameState extends GameState {
    constructor(stateManager, gameCTO, renderer) {
        super(stateManager, gameCTO, renderer);
    }

    handleInput(type, obj) {
        // handle picking of undo and movie maker buttons
    }
}
