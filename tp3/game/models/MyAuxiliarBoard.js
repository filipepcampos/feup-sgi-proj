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
        return this.getScore(playerId) == 12;
    }
    
    getScore(playerId) {
        return this.board[1-playerId].filter(tile => tile.piece != null).length;
    }

    getAvailableTile(piece) {
        for (const tile of this.board[piece.playerId]) {
            if (!tile.isOccupied()) {
                return tile;
            }
        }
    }

    popPiece(playerId) {
        for (let i = this.board[0].length-1; i >= 0; --i) {
            const piece = this.board[playerId][i].piece;
            if(piece) {
                this.board[playerId][i].piece = null;
                return piece;
            }
        }
        return null;
    }
}