import { Scene } from "phaser";
import { PointerSparcleLayerManager } from "../common-layers/pointer-sparcle-layer-manager";
import { FieldTilesLayerManager } from "./layers/field-tiles-layer-manager";

export class PlayScene extends Scene {
  pointerSparcleLayerManager: PointerSparcleLayerManager;

  fieldTilesLayerManager: FieldTilesLayerManager;

  constructor() {
    super("PlayScene");

    this.pointerSparcleLayerManager = new PointerSparcleLayerManager(this);

    this.fieldTilesLayerManager = new FieldTilesLayerManager(this);
  }

  preload() {
    this.load.image("tiles", "field-objects/tiles.1.png");
  }

  async create() {
    await this.fieldTilesLayerManager.init();

    this.pointerSparcleLayerManager.init();
  }
}
