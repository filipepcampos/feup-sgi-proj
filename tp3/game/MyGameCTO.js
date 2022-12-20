import { MySceneGraph } from "../MySceneGraph.js";
import { MyGameBoard } from "./models/MyGameBoard.js";

export class MyGameCTO {
    constructor(scene) {
        this.scene = scene;
        this.board = new MyGameBoard(scene);
        this.currentPlayer = 0;
        this.selectedPiece = null;
    }

    switchPlayer() {
        this.currentPlayer = 1 - this.currentPlayer;
    }

    canPickPiece(piece) {
        return piece.playerId == this.currentPlayer;
    }

    pickPiece(piece) {
        this.selectedPiece = piece;
    }
    
    unpickPiece() {
        this.selectedPiece = null;
    }

    movePiece(piece, targetTile) {
        if (this._canMovePiece(piece, targetTile)) {
            this.board.movePiece(piece, targetTile);
            return true;
        }
        return false;
    }

    update(currTime) {
        this.state.update(currTime);
    }

    changeScene(filename) {
        new MySceneGraph(filename, this.scene);
    }

    _canMovePiece(piece, targetTile) {
        // Verify if the target tile is occupied
        if (targetTile.piece != null) return false;
        
        const startTile = piece.tile;
        const deltaRow = targetTile.row - startTile.row;
        const deltaCol = targetTile.col - startTile.col;
        
        // Verify movement direction
        // TODO: KING CAN MOVE BACKWARD.
        if (piece.playerId == 0 && deltaRow <= 0) return false;
        if (piece.playerId == 1 && deltaRow >= 0) return false;

        // Verify it moved diagonally
        if (Math.abs(deltaRow) !== Math.abs(deltaCol)) return false;

        // Verify if it moved the correct distance
        if (Math.abs(deltaRow) + Math.abs(deltaCol) !== 2) return false;

        return true;
    }
}