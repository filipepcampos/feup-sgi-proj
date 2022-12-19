const DEGREE_TO_RAD = Math.PI / 180;

export class MyTile {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
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
        this.scene.pushMatrix();
        let xOffset = (x-4) * this.tileWidth + this.tileWidth/2;
        let yOffset = (y-4) * this.tileWidth + this.tileWidth/2;
        this.scene.translate(xOffset, this.boardHeight / 2 + this.height, yOffset);
        this.scene.rotate(90 * DEGREE_TO_RAD, 1, 0, 0);
        this.piece.display();
        this.scene.popMatrix();
    }

    displayTile() {
        // TODO
    }
}