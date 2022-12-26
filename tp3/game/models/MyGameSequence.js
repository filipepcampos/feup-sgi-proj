export class MyGameSequence {
    constructor() {
        this.moves = [];
    }

    addMove(move) {
        this.moves.push(move);
    }

    popMove() {
        return this.moves.pop();
    }
}