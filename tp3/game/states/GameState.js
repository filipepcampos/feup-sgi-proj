import { State } from "./State.js";

/**
 * Abstract class for a game state.
 */
export class GameState extends State {
    /**
     * @param {StateManager} stateManager - Reference to StateManager object
     * @param {GameCTO} gameCTO - Reference to GameCTO object
     * @param {Renderer} renderer - Reference to Renderer object
     */
    constructor(stateManager, gameCTO, renderer) {
        super(stateManager);
        this.gameCTO = gameCTO;
        this.renderer = renderer;
        this.timeFactor = 0;
    }

    update(current) {
        this.timeFactor = (current / 500) % 5000 * Math.PI;
        this.timeFactor = (Math.sin(this.timeFactor) + 1.0) / 2.0;
    }
}
