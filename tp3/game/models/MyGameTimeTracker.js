export class MyGameTimeTracker {
    constructor() {
        this.gametime = [0, 0];
        this.roundtime = [0, 0];
    }

    resetRoundtime() {
        this.roundtime = [0, 0];
    }

    incrementTime(playerId, timeIncrement) {
        this.gametime[playerId] += timeIncrement;
        this.roundtime[playerId] += timeIncrement; 
    }

    getRoundTime(playerId) {
        return [Math.floor(this.roundtime[playerId] / (1000 * 60)), Math.floor(this.roundtime[playerId] / 1000) % 60];
    }

    getGameTime(playerId) {
        return [Math.floor(this.gametime[playerId] / (1000 * 60)), Math.floor(this.gametime[playerId] / 1000) % 60];
    }
}