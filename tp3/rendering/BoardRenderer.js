import { PickingTypes } from "../game/PickingTypes.js";
import { ComponentRenderer } from "./ComponentRenderer.js";
import { MyRectangle } from "../primitives/MyRectangle.js";

const DEGREE_TO_RAD = Math.PI / 180;

export class BoardRenderer {
    constructor(scene) {
        this.scene = scene;
        this.componentRenderer = new ComponentRenderer(scene.sceneData);
        this.tileWidth = 1/8;
        this.tileModel = new MyRectangle(scene, -0.5*this.tileWidth, 0.5*this.tileWidth, -0.5*this.tileWidth, 0.5*this.tileWidth);
        this.boardHeight = 0.2;
        this.boardsetTransformationMatrix = this.getBoardsetTransformationMatrix();
        console.log(this.boardsetTransformationMatrix);
    }

    display(board, selectedPiece) {
        const numRows = board.board.length;
        const numCols = board.board[0].length;

        this.scene.pushMatrix();
        this.scene.multMatrix(this.boardsetTransformationMatrix);
        for (let i = 0; i < numRows; ++i) {
            for (let j = 0; j < numCols; ++j) {
                const tile = board.board[i][j];
                this.scene.registerForPick(i*numCols+j+1+PickingTypes.TileSelection, tile);
                this.displayTile(tile, selectedPiece);
            }
        }
        this.scene.clearPickRegistration();
        this.scene.popMatrix();
    }

    displayTile(tile, selectedPiece) {
        this.scene.pushMatrix();
        let colOffset = (tile.col-4) * this.tileWidth + this.tileWidth/2;
        let rowOffset = (tile.row-4) * this.tileWidth + this.tileWidth/2;
        this.scene.translate(colOffset, this.boardHeight / 2, rowOffset);

        if(tile.piece) {
            if(selectedPiece == tile.piece) {
                this.scene.translate(0, 0.05, 0);
            }
            this.displayPiece(tile.piece);
        }

        if(this.scene.pickMode) {
            this.scene.pushMatrix();
            this.scene.translate(0, 0.002, 0);
            this.scene.rotate(-90*DEGREE_TO_RAD, 1, 0, 0);
            this.tileModel.display();
            this.scene.popMatrix();
        }
        
        this.scene.popMatrix();
    }

    displayPiece(piece) {
        if(piece.playerId == 0) {
            this.componentRenderer.display(0, this.scene.sceneData.components["piece0"]);
        } else {
            this.scene.rotate(180*DEGREE_TO_RAD, 0, 1, 0);
            this.componentRenderer.display(0, this.scene.sceneData.components["piece1"]);
        }
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