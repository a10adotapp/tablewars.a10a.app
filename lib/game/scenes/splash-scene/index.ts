import { characterImages, effectImages } from "@/lib/game/files";
import { Scene } from "phaser";
import { PointerSparcleLayerManager } from "../common-layers/pointer-sparcle-layer-manager";
import { BackgroundLayerManager } from "./layers/background-layer-manager";
import { StartActionLayerManager } from "./layers/start-action-layer-manager";
import { TitleLayerManager } from "./layers/title-layer-manager";

export class SplashScene extends Scene {
  backgroundLayerManager: BackgroundLayerManager;

  titleLayerManager: TitleLayerManager;

  startActionLayerManager: StartActionLayerManager;

  pointerSparcleLayerManager: PointerSparcleLayerManager;

  constructor() {
    super("SplashScene");

    this.backgroundLayerManager = new BackgroundLayerManager(this);

    this.titleLayerManager = new TitleLayerManager(this);

    this.startActionLayerManager = new StartActionLayerManager(this, {
      startAction: this.startAction.bind(this),
    });

    this.pointerSparcleLayerManager = new PointerSparcleLayerManager(this);
  }

  preload() {
    for (const characterImage of characterImages) {
      this.load.image(characterImage);
    }

    for (const effectImage of effectImages) {
      this.load.image(effectImage);
    }
  }

  create() {
    this.backgroundLayerManager.init();

    this.titleLayerManager.init();

    this.startActionLayerManager.init();

    this.pointerSparcleLayerManager.init();
  }

  startAction() {
    this.scene.start("PlayScene");
  }
}
