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

    getRoundtime(playerId) {
        
    }
}