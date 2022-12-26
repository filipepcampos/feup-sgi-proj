export class MyGameMove {
    constructor(startTile, endTile, inMovementChain=false, becameKing=false) { // TODO: Maybe add playerId
        this.startTile = startTile;
        this.endTile = endTile;
        this.inMovementChain = inMovementChain;
        this.becameKing = becameKing;
    }
}