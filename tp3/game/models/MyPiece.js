export class MyPiece {
    constructor(scene, playerId) {
        this.scene = scene;
        this.tile = null;
        this.playerId = playerId;
        this.isKing = false;
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