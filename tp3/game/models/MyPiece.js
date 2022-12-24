export class MyPiece {
    constructor(scene, playerId, pieceId) {
        this.scene = scene;
        this.tile = null;
        this.playerId = playerId;
        this.isKing = false;
        this.id = pieceId;
    }

    upgrade() {
        this.isKing = true;
    }

    setTile(tile) {
        this.tile = tile;
    }

    clearTile() {
        this.tile = null;
    }
}