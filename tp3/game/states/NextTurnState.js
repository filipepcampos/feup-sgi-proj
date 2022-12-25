import { InteractableGameState } from './InteractableGameState.js';
import { DestinationSelectionState } from './DestinationSelectionState.js';
import { PickingTypes } from '../PickingTypes.js';

export class NextTurnState extends InteractableGameState {
    constructor(stateManager, gameCTO, renderer) {
        super(stateManager, gameCTO, renderer);
    }

    display() {
        this.renderer.display(this.gameCTO, this.timeFactor);
    }

    handleInput(type, obj) {
        if (type == PickingTypes.TileSelection) {
            this.handleTilePick(obj);
        }
    }

    handleTilePick(obj) {
        if(obj.piece != null && this.gameCTO.canPickPiece(obj.piece)){
            this.gameCTO.pickPiece(obj.piece);
            this.stateManager.setState(new DestinationSelectionState(this.stateManager, this.gameCTO, this.renderer, obj));
        }
    }
}