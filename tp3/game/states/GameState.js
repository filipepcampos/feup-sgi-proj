import { State } from "./State.js";

export class GameState extends State {
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
