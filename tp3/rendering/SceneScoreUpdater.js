export class SceneScoreUpdater {
    static update(scene, playerScore0, playerScore1) {
        SceneScoreUpdater.updateTimer(scene, playerScore0, "score_player0_digit");
        SceneScoreUpdater.updateTimer(scene, playerScore1, "score_player1_digit");
    }

    static updateTimer(scene, score, idPrefix) {
        const scoreString = String(score).padStart(2, '0');
        scene.sceneData.primitives[idPrefix + "0"].object.setCharacter(scoreString[0]);
        scene.sceneData.primitives[idPrefix + "1"].object.setCharacter(scoreString[1]);
    }
}