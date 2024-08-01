import { GameObjects, Scene } from "phaser";
import { ClickHandler, StartButton } from "./buttons/start-button";

export type StartAction = ClickHandler;

export class StartActionLayerManager {
  scene: Scene;

  layer!: GameObjects.Layer;

  startButton: StartButton;

  constructor(scene: Scene, options?: {
    startAction?: StartAction;
  }) {
    this.scene = scene;

    this.startButton = new StartButton(this.scene, {
      onClick: options?.startAction,
    });
  }

  init() {
    this.layer = this.scene.add.layer();

    this.startButton.init(this.layer);
  }

  setStartAction(startAction?: StartAction) {
    this.startButton.clickHandler = startAction;
  }
}
