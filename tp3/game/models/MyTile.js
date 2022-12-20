export class MyTile {
    constructor(scene, col, row) {
        this.scene = scene;
        this.row = row;
        this.col = col;
        this.piece = null;
    }

    setPiece(piece) {
        this.piece = piece;
    }

    clearPiece() {
        this.piece = null;
    }
}