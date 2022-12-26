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

    setAnimationState(endTile, capturedPiece, capturedTile, nextState) {
        let animations = new Map();
        animations.set(endTile.piece.id, this.createMovementAnimation(this.startTile, endTile));
        if (capturedPiece != null) {
            animations.set(capturedPiece.id, this.createCaptureAnimation(capturedTile, capturedPiece.tile));
        }

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

    createCaptureAnimation(startTile, endTile) {
        let keyframes = []

        const deltaRow = endTile.row - startTile.row;
        const deltaCol = endTile.col - startTile.col;
        const tileWidth = 1/8;

        const start = {
            "translation": vec3.fromValues(-deltaCol*tileWidth, 0, -deltaRow*tileWidth),
            "rotationx": vec3.fromValues(0,0,0),
            "rotationy": vec3.fromValues(0,0,0),
            "rotationz": vec3.fromValues(0,0,0),
            "scale": vec3.fromValues(1, 1, 1),
        }
        keyframes.push(new Keyframe(0, start));

        const collision = {
            "translation": vec3.fromValues(-deltaCol*tileWidth, 0, -deltaRow*tileWidth),
            "rotationx": vec3.fromValues(0,0,0),
            "rotationy": vec3.fromValues(0,0,0),
            "rotationz": vec3.fromValues(0,0,0),
            "scale": vec3.fromValues(1, 1, 1),
        }
        keyframes.push(new Keyframe(0.2, collision));

        const points = this.getQuadraticPoints([-deltaCol*tileWidth, 0, -deltaRow*tileWidth], [0,0,0], 0.25, 9);

        let instant = 0.3;
        for (const point of points) {
            let [x, y, z] = point;
            const transformation = {
                "translation": vec3.fromValues(x, y, z),
                "rotationx": vec3.fromValues(0,0,0),
                "rotationy": vec3.fromValues(0,0,0),
                "rotationz": vec3.fromValues(0,0,0),
                "scale": vec3.fromValues(1, 1, 1),
            }
            keyframes.push(new Keyframe(instant, transformation));
            instant += 0.1;
        }

        const end = {
            "translation": vec3.fromValues(0,0.0,0),
            "rotationx": vec3.fromValues(0,0,0),
            "rotationy": vec3.fromValues(0,0,0),
            "rotationz": vec3.fromValues(0,0,0),
            "scale": vec3.fromValues(1, 1, 1),
        }
        keyframes.push(new Keyframe(10, end));

        return new MyKeyframeAnimation("_movement", keyframes, true, true);
    }

    getQuadraticPoints_v1(startPosition, endPosition, maxHeight, nDivisions) {
        let [x1, y1, z1] = startPosition;
        let [x2, y2, z2] = endPosition;

        const distance = Math.abs(x2-x1);
        let f = (x) => -maxHeight * Math.pow(x / (distance / 2) , 2) + maxHeight;
        
        let x = x1, z = z1;
        let deltaX = (x2-x1)/(nDivisions + 1);
        let deltaZ = (z2-z1)/(nDivisions + 1);

        let points = [];
        for(let i = 0; i < nDivisions + 2; ++i, x += deltaX, z += deltaZ) {
            let y = f(x);
            points.push([x,y,z]);
        }
        return points;
    }

    getQuadraticPoints(startPosition, endPosition, maxHeight, nDivisions) {
        let [col1, y1, row1] = startPosition;
        let [col2, y2, row2] = endPosition;

        let f = (x) => (-Math.pow(2*x-1, 2) + 1) * maxHeight;
        
        let col = col1, row = row1;
        let deltaCol = (col2-col1)/(nDivisions + 1);
        let deltaRow = (row2-row1)/(nDivisions + 1);
        let deltaX = 1/(nDivisions+1)
        let x = 0;

        let points = [];
        for(let i = 0; i < nDivisions + 2; ++i, col += deltaCol, row += deltaRow, x += deltaX) {
            let y = f(x);
            points.push([col,y,row]);
        }
        return points;
    }

    handleTilePick(obj) {
        const piece = this.startTile.piece;
        console.log(piece);
        const capturedPiece = this.gameCTO.getPieceBetweenTiles(piece.tile, obj);
        const capturedTile = capturedPiece != null ? capturedPiece.tile : null;

        if(this.gameCTO.movePiece(piece, obj, !this.canCancelMove)){ // Success (If can't cancel move, the piece is in a movement chain)
            
            if (this.gameCTO.pieceHasCaptureAvailable(piece) && (capturedPiece != null)) { // Continue capture chain
                this.setAnimationState(obj, capturedPiece, capturedTile, new DestinationSelectionState(this.stateManager, this.gameCTO, this.renderer, piece.tile, this.animationTracker, false));
            } else { // Switch to next player
                this.gameCTO.switchPlayer();
                this.gameCTO.unpickPiece();
                this.setAnimationState(obj, capturedPiece, capturedTile, new NextTurnState(this.stateManager, this.gameCTO, this.renderer));
            }
        } else {
            if(this.canCancelMove && obj == this.startTile) { // Cancel move
                this.gameCTO.unpickPiece();
                this.stateManager.setState(new DropPieceState(this.stateManager, this.gameCTO, this.renderer, this.startTile));    
            }
        }
    }
}