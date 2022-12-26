import { Keyframe } from "../models/Keyframe.js";
import { MyKeyframeAnimation } from "../models/MyKeyframeAnimation.js";

export class GameAnimations {
    static createMovementAnimation(startTile, endTile, liftPiece=false) {
        let keyframes = []

        const deltaRow = endTile.row - startTile.row;
        const deltaCol = endTile.col - startTile.col;
        const tileWidth = 1/8;
        const instantOffset = liftPiece ? 0.2 : 0;

        if(liftPiece) {
            const groundKeyframe = {
                "translation": vec3.fromValues(-deltaCol*tileWidth, 0, -deltaRow*tileWidth),
                "rotationx": vec3.fromValues(0,0,0),
                "rotationy": vec3.fromValues(0,0,0),
                "rotationz": vec3.fromValues(0,0,0),
                "scale": vec3.fromValues(1, 1, 1),
            }
            keyframes.push(new Keyframe(0, groundKeyframe));
        }

        const start = {
            "translation": vec3.fromValues(-deltaCol*tileWidth, 0.1, -deltaRow*tileWidth),
            "rotationx": vec3.fromValues(0,0,0),
            "rotationy": vec3.fromValues(0,0,0),
            "rotationz": vec3.fromValues(0,0,0),
            "scale": vec3.fromValues(1, 1, 1),
        }
        keyframes.push(new Keyframe(instantOffset, start));

        const velocity = 1;  // v=d/t <=> t=d/v
        const pieceArrivalInstant = (Math.abs(deltaRow) / velocity) + instantOffset;
        console.log(instantOffset, pieceArrivalInstant);

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

        return new MyKeyframeAnimation("_movement", keyframes, true, true);
    }

    static createCaptureAnimation(startTile, endTile) {
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

        const points = GameAnimations.getQuadraticPoints([-deltaCol*tileWidth, 0, -deltaRow*tileWidth], [0,0,0], 0.25, 9);

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
        keyframes.push(new Keyframe(1.5, end));

        return new MyKeyframeAnimation("_movement", keyframes, true, true);
    }

    static getQuadraticPoints(startPosition, endPosition, maxHeight, nDivisions) {
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
}