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
            this.capturePieceBetweenTiles(piece.tile, targetTile);
            this.board.movePiece(piece, targetTile);
            return true;
        }
        return false;
    }

    capturePieceBetweenTiles(startTile, endTile) {
        const deltaRow = Math.sign(endTile.row - startTile.row);
        const deltaCol = Math.sign(endTile.col - startTile.col);
        const tile = this.board.getTile(startTile.row + deltaRow, startTile.col + deltaCol);
        console.log("Can capture tile " + tile.row + "/" + tile.col + "?");
        if(tile != endTile) {
            tile.piece = null;
        }
    }

    update(currTime) {
        this.state.update(currTime);
    }

    changeScene(filename) {
        new MySceneGraph(filename, this.scene);
    }

    getPossibleCaptures(piece) {
        let rowDirection = piece.playerId == 0 ? 1 : -1;
        const pieceRow = piece.tile.row;
        const pieceCol = piece.tile.col;
        
        // Check if diagonal is occupied, and the following space is empty
        let possibleDestinationTiles = [];
        for (let offset of [-1 , 1]) {
            let capturedTile = this.board.getTile(pieceRow+rowDirection, pieceCol+offset);
            if (capturedTile && capturedTile.piece != null && capturedTile.piece.playerId != piece.playerId) { // There's an enemy piece in the diagonal
                let destinationTile = this.board.getTile(pieceRow+rowDirection*2, pieceCol+offset*2);
                if (destinationTile.piece == null) { // Tile is currently empty
                    possibleDestinationTiles.push(destinationTile);
                }
            }
        }
        return possibleDestinationTiles;
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

        const possibleCaptures = this.getPossibleCaptures(piece);
        if(possibleCaptures.length > 0) {
            return possibleCaptures.includes(targetTile);
        } else {
            // Verify it moved diagonally
            if (Math.abs(deltaRow) !== Math.abs(deltaCol)) return false;

            // Verify if it moved the correct distance
            if (Math.abs(deltaRow) + Math.abs(deltaCol) !== 2) return false;
        }

        return true;
    }
}