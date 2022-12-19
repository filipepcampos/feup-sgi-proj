import { MyPiece } from "./MyPiece.js";
import { MyTile } from "./MyTile.js";

const NUM_ROWS = 8;
const NUM_COLS = 8;
const DEGREE_TO_RAD = Math.PI / 180;

export class MyGameBoard {
    constructor(scene) {
        this.scene = scene;
        this.setupBoard();
        this.setupPieces();
        this.boardHeight = 0.2;
        this.tileWidth = 1/8;
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
        for (let i = 0; i < NUM_COLS/2; i++){
            this.addPiece(new MyPiece(this.scene), this.board[0][2*i+1]);
            this.addPiece(new MyPiece(this.scene), this.board[1][2*i]);
            this.addPiece(new MyPiece(this.scene), this.board[2][2*i+1]);
            this.addPiece(new MyPiece(this.scene), this.board[7][2*i]);
            this.addPiece(new MyPiece(this.scene), this.board[6][2*i+1]);
            this.addPiece(new MyPiece(this.scene), this.board[5][2*i]);
        }
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

    movePiece(piece, destinationTile) {
        const startingTile = piece.tile;
        this.removePiece(startingTile);
        this.addPiece(piece, destinationTile);
    }

    display() {
        for (let i = 0; i < NUM_ROWS; ++i) {
            for (let j = 0; j < NUM_COLS; ++j) {
                this.displayTile(this.board[i][j]);
            }
        }
    }

    displayTile(tile) {
        this.scene.pushMatrix();
        let colOffset = (tile.col-4) * this.tileWidth + this.tileWidth/2;
        let rowOffset = (tile.row-4) * this.tileWidth + this.tileWidth/2;
        this.scene.translate(colOffset, this.boardHeight / 2, rowOffset);
        this.scene.rotate(90 * DEGREE_TO_RAD, 1, 0, 0);  // TODO: ROTATION IN XML
        tile.display();
        this.scene.popMatrix();
    }
    
}

// TODO: Possible methods:
// • Get piece on a given tile
// • Get tile given a piece

// • Get tile by board coordinate system (A..H;1..8 on chess or 0..7;0..7)
// • Move piece (piece, starting tile, destination tile)
// • Display the gameboard (render). Calls display on each tile (which by its own turn calls
// display of the piece in the tile, if any)