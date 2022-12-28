import { MyGameCTO } from "../MyGameCTO.js";
import { MovieState } from "./MovieState.js";
import { InteractableGameState } from "./InteractableGameState.js";
import { PickingTypes } from "../PickingTypes.js";

export class GameOverState extends InteractableGameState {
    constructor(stateManager, gameCTO, renderer) {
        super(stateManager, gameCTO, renderer);
    }

    display() {
        this.renderer.display(this.gameCTO, this.timeFactor);
    }

    handleInput(type, obj) {
        super.handleInput(type, obj);
        if (type == PickingTypes.ButtonSelection) {
            if (obj == "movie_button") {
                const movieGameCTO = new MyGameCTO(this.stateManager.scene);
                console.log(this.gameCTO.gameSequence);
                const movieGameSequence = movieGameCTO.migrateGameSequence(this.gameCTO.gameSequence.clone());
                this.stateManager.setState(new MovieState(this.stateManager, movieGameCTO, this.renderer, movieGameSequence, this));
            }
        }
    }

    update(current) {}
}