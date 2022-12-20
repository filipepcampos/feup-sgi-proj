export class MyPiece {
    constructor(scene, playerId) {
        this.scene = scene;
        this.tile = null;
        this.playerId = playerId;
    }

    setTile(tile) {
        this.tile = tile;
    }

    clearTile() {
        this.tile = null;
    }
}