export class SceneTimerUpdater {
    static update(scene, timetracker, playerId) {
        SceneTimerUpdater.updateTimer(scene, timetracker.getRoundTime(playerId), "time_round_digit");
        SceneTimerUpdater.updateTimer(scene, timetracker.getGameTime(playerId), "time_game_digit");
    }

    static updateTimer(scene, values, idPrefix) {
        const minutes = String(values[0]).padStart(2, '0');
        const seconds = String(values[1]).padStart(2, '0');
        scene.sceneData.primitives[idPrefix + "0"].object.setCharacter(minutes[0]);
        scene.sceneData.primitives[idPrefix + "1"].object.setCharacter(minutes[1]);
        scene.sceneData.primitives[idPrefix + "2"].object.setCharacter(seconds[0]);
        scene.sceneData.primitives[idPrefix + "3"].object.setCharacter(seconds[1]);
    }
}