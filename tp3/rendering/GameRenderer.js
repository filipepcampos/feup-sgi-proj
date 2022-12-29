import { BoardRenderer } from "./BoardRenderer.js";
import { SceneRenderer } from "./SceneRenderer.js";

/**
 * Class responsible for rendering a Game
 */
export class GameRenderer {
    /**
     * @param {XMLScene} scene - Reference to the XMLScene
     */
    constructor(scene) {
        this.scene = scene;
        this.sceneRenderer = new SceneRenderer(scene.sceneData);
        this.boardRenderer = new BoardRenderer(scene);
    }

    /**
     * Updates the spotlight position
     * @param {ComponentNode} node - Reference to the ComponentNode
     * @param {String} targetId - Id of the target node
     */
    updateSpotlightPosition(node, targetId) {
        const matrix = node.getTransformation() != null ? node.getTransformation() : mat4.create();

        this.scene.pushMatrix();
        this.scene.multMatrix(matrix);
        if(node.getAnimation() != null) {
            node.getAnimation().apply(this.scene);
        }

        if(node.getId() == targetId) {
            this.scene.translate(0, 1, 0);
            let vertex = vec4.fromValues(0,0,0,1);
            vec4.transformMat4(vertex, vertex, this.scene.getMatrix());
            this.scene.lights[3].setPosition(vertex[0], vertex[1], vertex[2], vertex[3]);
            this.scene.popMatrix();
            return;
        }
        for(const component of node.getChildComponents()) {
            this.updateSpotlightPosition(component, targetId);
        }
        this.scene.popMatrix();
    }

    /**
     * Displays the Game
     * @param {GameCTO} gameCTO - Reference to the GameCTO
     * @param {Number} timeFactor - Time factor
     * @param {Array} animations - Array of animations
     */
    display(gameCTO, timeFactor, animations) {
        this.boardRenderer.display(gameCTO.board, gameCTO.auxiliaryBoard, animations, gameCTO.selectedPiece);

        const warning_node = gameCTO.warningActive ? this.scene.sceneData.components["warning_message"] : null;
        this.sceneRenderer.display(timeFactor, warning_node);

        if(gameCTO.selectedPiece){
            this.scene.pushMatrix();
            this.scene.loadIdentity();
            this.scene.lights[3].enable();
            this.updateSpotlightPosition(this.scene.sceneData.components["root"], "_piece" + gameCTO.selectedPiece.id);
            this.scene.popMatrix();
        } else {
            this.scene.lights[3].disable();
        }
    }
}