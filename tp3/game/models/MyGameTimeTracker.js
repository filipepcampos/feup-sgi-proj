export class MyGameTimeTracker {
    constructor(maxGametime, maxRoundtime) {
        this.gametime = [0, 0];
        this.roundtime = [0, 0];
        this.maxGametime = maxGametime;
        this.maxRoundtime = maxRoundtime;
    }

    resetRoundtime() {
        this.roundtime = [0, 0];
    }

    incrementTime(playerId, timeIncrement) {
        this.gametime[playerId] += timeIncrement;
        this.roundtime[playerId] += timeIncrement;
    }

    isGameover() {
        return this.gametime[0] >= this.maxGametime || this.gametime[1] >= this.maxGametime ||
            this.roundtime[0] >= this.maxRoundtime || this.roundtime[1] >= this.maxRoundtime;
    }

    getRoundTime(playerId) {
        return [Math.floor(this.roundtime[playerId] / (1000 * 60)), Math.floor(this.roundtime[playerId] / 1000) % 60];
    }

    getGameTime(playerId) {
        return [Math.floor(this.gametime[playerId] / (1000 * 60)), Math.floor(this.gametime[playerId] / 1000) % 60];
    }
}