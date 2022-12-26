import { InteractableGameState } from './InteractableGameState.js';
import { NextTurnState } from './NextTurnState.js';
import { PickingTypes } from '../PickingTypes.js';
import { DropPieceState } from './DropPieceState.js';
import { AnimationState } from './AnimationState.js';
import { AnimationTracker } from '../AnimationTracker.js';
import { Keyframe } from '../../models/Keyframe.js';
import { MyKeyframeAnimation } from '../../models/MyKeyframeAnimation.js';

export class DestinationSelectionState extends InteractableGameState {
    constructor(stateManager, gameCTO, renderer, startTile, animationTracker, canCancelMove=true) {
        super(stateManager, gameCTO, renderer);
        this.startTile = startTile;
        this.canCancelMove = canCancelMove;
        this.animationTracker = animationTracker;
    }

    display() {
        this.renderer.display(this.gameCTO, this.timeFactor, this.animationTracker);
    }

    handleInput(type, obj){
        if (type == PickingTypes.TileSelection) {
            this.handleTilePick(obj);
        }
    }

    setAnimationState(endTile, nextState) {
        let animations = new Map();
        animations.set(endTile.piece.id, this.createMovementAnimation(this.startTile, endTile));
        let animationTracker = new AnimationTracker(animations);

        this.stateManager.setState(new AnimationState(this.stateManager, this.gameCTO, this.renderer, animationTracker, nextState));
    }

    createMovementAnimation(startTile, endTile) {
        let keyframes = []

        const deltaRow = endTile.row - startTile.row;
        const deltaCol = endTile.col - startTile.col;
        const tileWidth = 1/8;

        const start = {
            "translation": vec3.fromValues(-deltaCol*tileWidth, 0.1, -deltaRow*tileWidth),
            "rotationx": vec3.fromValues(0,0,0),
            "rotationy": vec3.fromValues(0,0,0),
            "rotationz": vec3.fromValues(0,0,0),
            "scale": vec3.fromValues(1, 1, 1),
        }
        keyframes.push(new Keyframe(0, start));

        const velocity = 1;  // v=d/t <=> t=d/v
        const pieceArrivalInstant = Math.abs(deltaRow) / velocity;

        const middle = { // Arrived at the top of the endTile
            "translation": vec3.fromValues(0, 0.1, 0),
            "rotationx": vec3.fromValues(0,0,0),
            "rotationy": vec3.fromValues(0,0,0),
            "rotationz": vec3.fromValues(0,0,0),
            "scale": vec3.fromValues(1, 1, 1),
        }
        keyframes.push(new Keyframe(pieceArrivalInstant, middle));

        const end = { // Dropdown
            "translation": vec3.fromValues(0,0.0,0),
            "rotationx": vec3.fromValues(0,0,0),
            "rotationy": vec3.fromValues(0,0,0),
            "rotationz": vec3.fromValues(0,0,0),
            "scale": vec3.fromValues(1, 1, 1),
        }
        keyframes.push(new Keyframe(pieceArrivalInstant + 0.2, end));


        console.log(keyframes);
        return new MyKeyframeAnimation("_movement", keyframes, true, true);
    }

    handleTilePick(obj) {
        const piece = this.startTile.piece;
        console.log(piece);
        const hasCaptureAvailable = this.gameCTO.pieceHasCaptureAvailable(piece);

        if(this.gameCTO.movePiece(piece, obj, !this.canCancelMove)){ // Success (If can't cancel move, the piece is in a movement chain)
            
            if (this.gameCTO.pieceHasCaptureAvailable(piece) && hasCaptureAvailable) { // Continue capture chain
                this.setAnimationState(obj, new DestinationSelectionState(this.stateManager, this.gameCTO, this.renderer, piece.tile, this.animationTracker, false));
            } else { // Switch to next player
                this.gameCTO.switchPlayer();
                this.gameCTO.unpickPiece();
                this.setAnimationState(obj, new NextTurnState(this.stateManager, this.gameCTO, this.renderer));
            }
        } else {
            if(this.canCancelMove && obj == this.startTile) { // Cancel move
                this.gameCTO.unpickPiece();
                this.stateManager.setState(new DropPieceState(this.stateManager, this.gameCTO, this.renderer, this.startTile));    
            }
        }
        console.log("Handled pick (shoudl move to new state)");
    }
}