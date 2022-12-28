import { MyGameBoard } from "./models/MyGameBoard.js";
import { MyAuxiliarBoard } from "./models/MyAuxiliarBoard.js";
import { MyGameMove } from "./models/MyGameMove.js";
import { MyGameSequence } from "./models/MyGameSequence.js";
import { MyGameTimeTracker } from "./models/MyGameTimeTracker.js";

export class MyGameCTO {
    constructor(scene) {
        this.scene = scene;
        this.board = new MyGameBoard(scene);
        this.auxiliaryBoard = new MyAuxiliarBoard(scene);
        this.currentPlayer = 0;
        this.selectedPiece = null;
        this.gameSequence = new MyGameSequence();
        this.timetracker = new MyGameTimeTracker(15*60*1000, 60*1000);
        this.warningActive = false;
    }

    switchPlayer() {
        this.timetracker.resetRoundtime();
        this.currentPlayer = 1 - this.currentPlayer;
    }

    displayWarning() {
        this.warningActive = true;
    }

    removeWarning() {
        this.warningActive = false;
    }

    canPickPiece(piece) {
        if (piece.playerId != this.currentPlayer) return false;

        const possibleCaptures = this.getPossibleCaptures();
        if (Object.keys(possibleCaptures).length > 0) {
            return possibleCaptures[this.getTileIdentifier(piece.tile)] != null;
        }
        return true;
    }

    pickPiece(piece) {
        this.selectedPiece = piece;
    }
    
    unpickPiece() {
        this.selectedPiece = null;
    }

    movePiece(piece, targetTile, inMovementChain) {
        if (this._canMovePiece(piece, targetTile)) {
            const startTile = piece.tile;
            const capturedPiece = this.capturePieceBetweenTiles(startTile, targetTile);
            this.board.movePiece(piece, targetTile);

            let becameKing = false;
            if(!piece.isKing && (targetTile.row == 0 || targetTile.row == 7)) {
                becameKing = true;
                piece.upgrade();
            }
        
            const switchPlayer = !(this.pieceHasCaptureAvailable(piece) && capturedPiece);
            this.gameSequence.addMove(new MyGameMove(startTile, targetTile, inMovementChain, switchPlayer, becameKing));
            return true;
        }
        return false;
    }

    undoMove() {
        const move = this.gameSequence.popLastMove();
        if (move) {
            // Undo becomeKing
            if(move.becameKing) {
                move.endTile.piece.isKing = false;
            }

            // Move piece from endTile to startTile
            this.board.movePiece(move.endTile.piece, move.startTile);

            // Change current player
            if (move.switchedPlayer) {
                this.timetracker.resetRoundtime();
                this.switchPlayer();
            }

            // Replace captured tiles
            if(Math.abs(move.endTile.col - move.startTile.col) > 1) {
                console.log("The current player is ", this.currentPlayer);
                console.log("Getting a piece from ", 1 -this.currentPlayer, this.auxiliaryBoard);
                const capturedPiece = this.auxiliaryBoard.popPiece(1 - this.currentPlayer); // Recover piece from opponent
                const deltaRow = Math.sign(move.endTile.row - move.startTile.row);
                const deltaCol = Math.sign(move.endTile.col - move.startTile.col);
                const tile = this.board.getTile(move.startTile.row + deltaRow, move.startTile.col + deltaCol);
                capturedPiece.tile = tile;
                tile.piece = capturedPiece;
                
                this.board.movePiece(capturedPiece, tile);
                move.capturedPiece = capturedPiece; // TODO: Pls check this
            }
            return move;   
        }
        return null;
    }

    capturePieceBetweenTiles(startTile, endTile) {
        const piece = this.getPieceBetweenTiles(startTile, endTile);

        if(piece != null) {
            const auxiliaryTile = this.auxiliaryBoard.getAvailableTile(piece);
            this.board.removeFromPlay(piece);
            this.board.movePiece(piece, auxiliaryTile);
            return true;
        }
        return false;
    }

    getPieceBetweenTiles(startTile, endTile) {
        const deltaRow = Math.sign(endTile.row - startTile.row);
        const deltaCol = Math.sign(endTile.col - startTile.col);
        const tile = this.board.getTile(startTile.row + deltaRow, startTile.col + deltaCol);
        if(tile != endTile && tile.piece != null) {
            return tile.piece;
        }
        return null;
    }

    update(currTime) {
        this.state.update(currTime);
    }

    updatePlaytime(elapsedTime) {
        this.timetracker.incrementTime(this.currentPlayer, elapsedTime);
    }

    getPossibleCapturesByPiece(piece) {
        let rowDirections = piece.isKing ? [-1, 1] : (piece.playerId == 0 ? [1] : [-1]);
        const pieceRow = piece.tile.row;
        const pieceCol = piece.tile.col;
        
        // Check if diagonal is occupied, and the following space is empty
        let possibleDestinationTiles = [];
        for (const direction of rowDirections) {
            for (const offset of [-1 , 1]) {
                let capturedTile = this.board.getTile(pieceRow+direction, pieceCol+offset);
                if (capturedTile && capturedTile.piece != null && capturedTile.piece.playerId != piece.playerId) { // There's an enemy piece in the diagonal
                    let destinationTile = this.board.getTile(pieceRow+direction*2, pieceCol+offset*2);
                    if (destinationTile && destinationTile.piece == null) { // Tile is currently empty
                        possibleDestinationTiles.push(destinationTile);
                    }
                }
            }
        }

        return possibleDestinationTiles;
    }

    pieceHasCaptureAvailable(piece) {
        return this.getPossibleCapturesByPiece(piece).length > 0;
    }

    getTileIdentifier(tile) {
        return "tile" + tile.row + "-" + tile.col;
    }

    getPossibleCaptures() {
        let possibleCaptures = {};
        
        const availablePieces = this.board.getPiecesByPlayer(this.currentPlayer);
        for (const piece of availablePieces) {
            const possiblePieceCaptures = this.getPossibleCapturesByPiece(piece);
            if (possiblePieceCaptures.length > 0) {
                possibleCaptures[this.getTileIdentifier(piece.tile)] = possiblePieceCaptures;
            }
        }
        return possibleCaptures;
    }

    isGameover() {
        return this.auxiliaryBoard.isFull(0) || this.auxiliaryBoard.isFull(1) || this.timetracker.isGameover();
    }

    migrateGameSequence(gameSequence) {
        for(const move of gameSequence.moves) {
            move.startTile = this.board.getTile(move.startTile.row, move.startTile.col);
            move.endTile = this.board.getTile(move.endTile.row, move.endTile.col);
        }
        return gameSequence;
    }

    _canMovePiece(piece, targetTile) {
        // Verify if the target tile is occupied
        if (targetTile.piece != null) return false;
        
        const startTile = piece.tile;
        const deltaRow = targetTile.row - startTile.row;
        const deltaCol = targetTile.col - startTile.col;
        
        // Verify movement direction, if the piece is not king
        if (!piece.isKing){
            if (piece.playerId == 0 && deltaRow <= 0) return false;
            if (piece.playerId == 1 && deltaRow >= 0) return false;
        }
        

        const possibleCaptures = this.getPossibleCapturesByPiece(piece);
        if(possibleCaptures.length > 0) {
            return possibleCaptures.includes(targetTile);
        } else {
            // Verify it moved diagonally
            if (Math.abs(deltaRow) !== Math.abs(deltaCol)) return false;

            // Verify if it moved the correct distance
            if (Math.abs(deltaRow) + Math.abs(deltaCol) !== 2) return false;
        }

        return true;
    }
}