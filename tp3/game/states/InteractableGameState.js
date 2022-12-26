import { GameState } from "./GameState.js";
import { PickingTypes } from "../PickingTypes.js";
import { MenuLoadingState } from "./MenuLoadingState.js";
import { MySceneGraph } from "../../MySceneGraph.js";

export class InteractableGameState extends GameState {
    constructor(stateManager, gameCTO, renderer) {
        super(stateManager, gameCTO, renderer);
    }

    handleInput(type, obj) {
        if (type == PickingTypes.ButtonSelection) {
            if (obj == "return_to_menu_button") {
                this.returnToMenu();
            }
        }
    }

    update(instant) {
        if(this.lastInstant == null) {
            this.lastInstant = instant;
        } else {
            const elapsedTime = instant - this.lastInstant;
            this.gameCTO.updatePlaytime(elapsedTime);
            this.lastInstant = instant;
        }
    }

    returnToMenu() {
        console.log("Returning to menu!");
        this.stateManager.scene.initScene();
        new MySceneGraph("menu.xml", this.stateManager.scene);
        this.stateManager.setState(new MenuLoadingState(this.stateManager));
    }
}
