import { characterImages } from "@/lib/game/files";
import { Scene } from "phaser";
import { BackgroundLayerManager } from "./layers/background-layer-manager";
import { StartActionLayerManager } from "./layers/start-action-layer-manager";
import { TitleLayerManager } from "./layers/title-layer-manager";

export class SplashScene extends Scene {
  backgroundLayerManager: BackgroundLayerManager;

  titleLayerManager: TitleLayerManager;

  startActionLayerManager: StartActionLayerManager;

  constructor() {
    super("SplashScene");

    this.backgroundLayerManager = new BackgroundLayerManager(this);

    this.titleLayerManager = new TitleLayerManager(this);

    this.startActionLayerManager = new StartActionLayerManager(this, {
      startAction: this.startAction.bind(this),
    });
  }

  preload() {
    for (const characterImage of characterImages) {
      this.load.image(characterImage);
    }
  }

  create() {
    this.backgroundLayerManager.init();

    this.titleLayerManager.init();

    this.startActionLayerManager.init();
  }

  startAction() {
    debugger;
    this.scene.start("SecondScene");
  }
}
