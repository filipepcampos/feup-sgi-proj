export class SceneScoreUpdater {
    static update(scene, playerScore0, playerScore1) {
        SceneScoreUpdater.updateScore(scene, playerScore0, playerScore1);
    }

    static updateScore(scene, player0Score, player1Score) {
        const counter = scene.sceneData.primitives["game_score"].object;

        let scoreString = String(player0Score).padStart(2, '0');
        counter.setDigit(0, scoreString[0]);
        counter.setDigit(1, scoreString[1]);
        scoreString = String(player1Score).padStart(2, '0');
        counter.setDigit(2, scoreString[0]);
        counter.setDigit(3, scoreString[1]);
    }
}