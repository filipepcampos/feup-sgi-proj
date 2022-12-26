import { InteractableGameState } from './InteractableGameState.js';
import { PickingTypes } from '../PickingTypes.js';
import { LiftPieceState } from './LiftPieceState.js';

export class NextTurnState extends InteractableGameState {
    constructor(stateManager, gameCTO, renderer) {
        super(stateManager, gameCTO, renderer);
    }

    display() {
        this.renderer.display(this.gameCTO, this.timeFactor);
    }

    handleInput(type, obj) {
        super.handleInput(type, obj);
        if (type == PickingTypes.TileSelection) {
            this.handleTilePick(obj);
        }
    }

    handleTilePick(obj) {
        if(obj.piece != null && this.gameCTO.canPickPiece(obj.piece) && !this.gameCTO.isGameover()){
            this.gameCTO.pickPiece(obj.piece);
            this.stateManager.setState(new LiftPieceState(this.stateManager, this.gameCTO, this.renderer, obj));
        }
    }
}