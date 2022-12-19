import { State } from "./State.js";

export class GameState extends State {
    constructor(stateManager, gameCTO) {
        super(stateManager);
        this.gameCTO = gameCTO;
    }
}
