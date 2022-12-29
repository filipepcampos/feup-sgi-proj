import { PickingTypes } from "../game/PickingTypes.js";
import {PickableComponentNode} from "../models/graph/PickableComponentNode.js";
import {EditedComponentNode} from "../models/graph/EditedComponentNode.js";
import { MyTile } from "../primitives/MyTile.js";
import { PrimitiveNode } from "../models/graph/PrimitiveNode.js";
import { BasicComponentNode } from "../models/graph/BasicComponentNode.js";

export class BoardRenderer {
    constructor(scene) {
        this.scene = scene;
        this.tileWidth = 1/8;
        this.tilePrimitive = new PrimitiveNode("_tile", new MyTile(scene));
        this.boardHeight = 0.2;
    }

    display(board, auxiliaryBoard, animations, selectedPiece) {
        const numRows = board.board.length;
        const numCols = board.board[0].length;

        const boardsetComponent = this.scene.sceneData.components["boardset"];
        const newChildComponents = [];
        for (const child of boardsetComponent.getChildComponents()) {
            if(!child.getId().startsWith("_")) { // TODO: Make sure names starting with _ are reserved
                newChildComponents.push(child);
            }
        }

        for (let i = 0; i < numRows; ++i) {
            for (let j = 0; j < numCols; ++j) {
                const tile = board.board[i][j];
                const pickingId = i*numCols+j+1+PickingTypes.TileSelection;

                if(tile.piece) {
                    const animation = animations != null ? animations.getAnimation(tile.piece.id) : null;
                    newChildComponents.push(this.createPickablePiece(tile.piece, pickingId, animation, selectedPiece));
                }
                newChildComponents.push(this.createPickableTile(tile, pickingId));
            }
        }
        this.displayAuxiliarBoard(auxiliaryBoard, newChildComponents, animations);

        boardsetComponent.setChildren(newChildComponents, boardsetComponent.getChildPrimitives());
    }

    displayAuxiliarBoard(auxiliaryBoard, outputComponents, animations) {
        for (const playerId of [0, 1]) {
            for (const tile of auxiliaryBoard.board[playerId]) {
                if(tile.piece) {
                    const animation = animations != null ? animations.getAnimation(tile.piece.id) : null;
                    outputComponents.push(this.createPiece(tile.piece, animation));
                }
            }
        }
    }

    getTileOffsets(tile) {
        const colOffset = (tile.col-4) * this.tileWidth + this.tileWidth/2;
        const rowOffset = (tile.row-4) * this.tileWidth + this.tileWidth/2;
        return [colOffset, rowOffset];
    }

    createPickableTile(tile, pickingId) {
        const [colOffset, rowOffset] = this.getTileOffsets(tile);

        const transformation = mat4.create();
        mat4.translate(transformation, transformation, [colOffset, this.boardHeight / 2, rowOffset]);

        const component = new BasicComponentNode("_tile"+pickingId, transformation, [this.tilePrimitive]);
        return new PickableComponentNode("_tile"+pickingId, component, pickingId, tile);
    }

    createPickablePiece(piece, pickingId, animation, selectedPiece) {
        const pieceComponent = this.createPiece(piece, animation, selectedPiece);
        return new PickableComponentNode("_piece" + piece.id, pieceComponent, pickingId, piece.tile);
    }

    createPiece(piece, animation=null, selectedPiece=null) {
        let componentName = piece.isKing ? "kingpiece" : "piece";
        if (piece == selectedPiece) {
            componentName = "selected_" + componentName;
        }
        const component = this.scene.sceneData.components[componentName + piece.playerId];
        const [colOffset, rowOffset] = this.getTileOffsets(piece.tile);

        const transformation = mat4.create();
        mat4.translate(transformation, transformation, [colOffset, this.boardHeight / 2, rowOffset]);
        
        return new EditedComponentNode("_piece" + piece.id, component, transformation, [this.tilePrimitive], animation);
    }
}