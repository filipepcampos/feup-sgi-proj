import { PickingTypes } from "../game/PickingTypes.js";
import { MyRectangle } from "../primitives/MyRectangle.js";
import {PickableComponentNode} from "../models/graph/PickableComponentNode.js";
import {EditedComponentNode} from "../models/graph/EditedComponentNode.js";

const DEGREE_TO_RAD = Math.PI / 180;

export class BoardRenderer {
    constructor(scene) {
        this.scene = scene;
        this.tileWidth = 1/8;
        this.tileModel = new MyRectangle(scene, -0.5*this.tileWidth, 0.5*this.tileWidth, -0.5*this.tileWidth, 0.5*this.tileWidth);
        this.boardHeight = 0.2;
        this.boardsetTransformationMatrix = this.getBoardsetTransformationMatrix();
    }

    display(board, auxiliaryBoard, animations) {
        const numRows = board.board.length;
        const numCols = board.board[0].length;

        const boardsetComponent = this.scene.sceneData.components["boardset"];
        const newChildComponents = [];
        for (const child of boardsetComponent.getChildComponents()) {
            if(!child.getId().startsWith("_")) { // TODO: Make sure names starting with _ are reserved
                newChildComponents.push(child);
            }
        }

        this.scene.pushMatrix();
        this.scene.multMatrix(this.boardsetTransformationMatrix);
        for (let i = 0; i < numRows; ++i) {
            for (let j = 0; j < numCols; ++j) {
                const tile = board.board[i][j];
                const pickingId = i*numCols+j+1+PickingTypes.TileSelection;

                this.scene.registerForPick(pickingId, tile);
                if(tile.piece) {
                    const animation = animations != null ? animations.getAnimation(tile.piece.id) : null;
                    newChildComponents.push(this.createPickablePiece(tile.piece, pickingId, animation));
                }
                this.displayTile(tile);
            }
        }
        this.scene.clearPickRegistration();
        this.displayAuxiliarBoard(auxiliaryBoard, newChildComponents);
        this.scene.popMatrix();

        boardsetComponent.setChildren(newChildComponents, boardsetComponent.getChildPrimitives());
    }

    displayAuxiliarBoard(auxiliaryBoard, outputComponents) {
        for (const playerId of [0, 1]) {
            for (const tile of auxiliaryBoard.board[playerId]) {
                if(tile.piece) {
                    outputComponents.push(this.createPiece(tile.piece, null));
                }
            }
        }
    }

    getTileOffsets(tile) {
        const colOffset = (tile.col-4) * this.tileWidth + this.tileWidth/2;
        const rowOffset = (tile.row-4) * this.tileWidth + this.tileWidth/2;
        return [colOffset, rowOffset];
    }

    displayTile(tile) {
        this.scene.pushMatrix();
        const [colOffset, rowOffset] = this.getTileOffsets(tile);
        this.scene.translate(colOffset, this.boardHeight / 2, rowOffset);

        if(this.scene.pickMode) {
            this.scene.pushMatrix();
            this.scene.translate(0, 0.002, 0);
            this.scene.rotate(-90*DEGREE_TO_RAD, 1, 0, 0);
            this.tileModel.display();
            this.scene.popMatrix();
        }
        
        this.scene.popMatrix();
    }

    createPickablePiece(piece, pickingId, animation) {
        const pieceComponent = this.createPiece(piece, animation);
        return new PickableComponentNode("_piece"+pickingId, pieceComponent, pickingId, piece.tile);
    }

    createPiece(piece, animation=null) {
        const componentName = piece.isKing ? "kingpiece" : "piece";
        const component = this.scene.sceneData.components[componentName + piece.playerId];
        const [colOffset, rowOffset] = this.getTileOffsets(piece.tile);

        const transformation = mat4.create();
        mat4.translate(transformation, transformation, [colOffset, this.boardHeight / 2, rowOffset]);
        
        return new EditedComponentNode("_piece", component, transformation, animation);
    }

    getBoardsetTransformationMatrix(node=this.scene.sceneData.components[this.scene.sceneData.root], matrix=mat4.create()) {
        const nodeMatrix = node.getTransformation() != null ? node.getTransformation() : mat4.create();
        const newMatrix = mat4.create();
        mat4.multiply(newMatrix, matrix, nodeMatrix);
        
        if(node.id == "boardset") {
            return newMatrix;
        }
        for(const child of node.getChildComponents()) {
            let mx = this.getBoardsetTransformationMatrix(child, newMatrix);
            if(mx){
                return mx;
            }
        }
        return null;
    }
}