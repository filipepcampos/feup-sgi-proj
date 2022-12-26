import { MyTile } from "./MyTile.js";

export class MyAuxiliarBoard {
    constructor(scene) {
        this.scene = scene;
        this.board = [];
        for (const playerId of [0, 1]) {
            let playerBoard = [];
            for (let i = 0; i < 12; ++i) {
                playerBoard.push(new MyTile(this.scene, -2 + playerId * 11, i - 2));
            }
            this.board.push(playerBoard);
        }
    }

    isFull(playerId) {
        return this.board[playerId].filter(tile => tile.piece == null).length == 0;
    }

    getAvailableTile(piece) {
        for (const tile of this.board[piece.playerId]) {
            if (!tile.isOccupied()) {
                return tile;
            }
        }
    }
}