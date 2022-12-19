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

    display() {
        if (this.piece) {
            this.displayPiece();
        } else {
            this.displayTile();
        }
    }

    displayPiece() {
        // TODO: 4 IN VARIABLE
        // TODO: TRANSALTE FOR HEIGHT
        this.piece.display();
    }

    displayTile() {
        // TODO
    }
}