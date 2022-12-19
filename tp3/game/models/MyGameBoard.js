import { MyTile } from "./MyTile.js";

const NUM_ROWS = 8;
const NUM_COLS = 8;

export class MyGameBoard {
    constructor(scene) {
        this.scene = scene;
        this.board = this.setupBoard();
    }

    setupBoard() {
        let board = [];
        for (let i = 0; i < NUM_COLS; ++i) {
            let row = [];
            for (let j = 0; j < NUM_ROWS; ++j) {
                row.push(new MyTile(this.scene, i, j));
            }
            board.push(row);
        }
        return board;
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
        for (let i = 0; i < NUM_COLS; ++i) {
            for (let j = 0; j < NUM_ROWS; ++j) {
                this.board[i][j].display();
            }
        }
    }
    
}

// TODO: Possible methods:
// • Get piece on a given tile
// • Get tile given a piece

// • Get tile by board coordinate system (A..H;1..8 on chess or 0..7;0..7)
// • Move piece (piece, starting tile, destination tile)
// • Display the gameboard (render). Calls display on each tile (which by its own turn calls
// display of the piece in the tile, if any)