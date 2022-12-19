import { State } from './State.js';
import { MyPiece } from '../models/MyPiece.js';

export class NextTurnState extends State {
    constructor(gameCTO) {
        super(gameCTO);
    }

    update(current) {
        
    }

    display() {
        this.gameCTO.scene.pushMatrix();
        let testPiece = new MyPiece(this.gameCTO.scene, 0.2);
        for(let i=0; i < 8; ++i){
            this.gameCTO.scene.registerForPick(i, testPiece);
            testPiece.display(i, 0);
            testPiece.display(i, 1);
            testPiece.display(i, 6);
            testPiece.display(i, 7);
        }
        this.gameCTO.scene.clearPickRegistration();
        this.gameCTO.scene.popMatrix();
    }
}