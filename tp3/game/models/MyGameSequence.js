export class MyGameSequence {
    constructor() {
        this.moves = [];
    }

    addMove(move) {
        this.moves.push(move);
    }

    popLastMove() {
        return this.moves.pop();
    }

    popFirstMove() {
        return this.moves.shift();
    }

    clone() {
        const newSequence = new MyGameSequence();
        for (const move of this.moves) {
            newSequence.addMove(move.clone());
        }
        return newSequence;
    }
}