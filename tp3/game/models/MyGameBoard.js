import { MyPiece } from "./MyPiece.js";
import { MyTile } from "./MyTile.js";

const NUM_ROWS = 8;
const NUM_COLS = 8;

export class MyGameBoard {
    constructor(scene) {
        this.scene = scene;
        this.setupBoard();
        this.setupPieces();
    }

    setupBoard() {
        this.board = [];
        for (let i = 0; i < NUM_ROWS; ++i) {
            let row = [];
            for (let j = 0; j < NUM_COLS; ++j) {
                row.push(new MyTile(this.scene, j, i));
            }
            this.board.push(row);
        }
    }

    setupPieces() {
        this.pieces = [];
        for (let i = 0; i < NUM_COLS/2; i++){
            this.addPiece(new MyPiece(this.scene, 0, i*6), this.board[0][2*i+1]);
            this.addPiece(new MyPiece(this.scene, 0, i*6+1), this.board[1][2*i]);
            this.addPiece(new MyPiece(this.scene, 0, i*6+2), this.board[2][2*i+1]);
            this.addPiece(new MyPiece(this.scene, 1, i*6+3), this.board[7][2*i]);
            this.addPiece(new MyPiece(this.scene, 1, i*6+4), this.board[6][2*i+1]);
            this.addPiece(new MyPiece(this.scene, 1, i*6+5), this.board[5][2*i]);
        }

        for (let i = 0; i < NUM_ROWS; ++i) {
            for (let j = 0; j < NUM_COLS; ++j) {
                const tile = this.board[i][j];
                if(tile.piece) {
                    this.pieces.push(tile.piece);
                }
            }
        }        
    }

    getPiecesByPlayer(playerId) {
        return this.pieces.filter(piece => piece.playerId == playerId);
    }

    addPiece(piece, tile) {
        tile.setPiece(piece);
        piece.setTile(tile);
    }
    
    removePiece(tile) {
        const piece = tile.piece;
        if (piece) {
            piece.clearTile();   
        }
        tile.clearPiece();
    }

    removeFromPlay(piece) {
        this.pieces = this.pieces.filter(p => p != piece);
    }

    movePiece(piece, destinationTile) {
        const startingTile = piece.tile;
        this.removePiece(startingTile);
        this.addPiece(piece, destinationTile);
    }

    getTile(row, col){
        if(this.board[row]) {
            return this.board[row][col];
        }
        return null;
    }
}
