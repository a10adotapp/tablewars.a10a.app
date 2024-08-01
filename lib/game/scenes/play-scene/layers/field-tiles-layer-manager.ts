import { Scene, Tilemaps } from "phaser";
import { getTilemapData } from "./_actions/get-tilemap-data";

export class FieldTilesLayerManager {
  scene: Scene;

  layer: Tilemaps.TilemapLayer | null = null;

  tilemap!: Tilemaps.Tilemap;

  constructor(scene: Scene) {
    this.scene = scene;
  }

  async init() {
    await this.initTilemap();
  }

  async initTilemap() {
    const tilemapData = await getTilemapData();

    this.tilemap = this.scene.make.tilemap({
      data: tilemapData,
      tileWidth: 32,
      tileHeight: 32,
    });

    const tiles = this.tilemap.addTilesetImage("tiles")

    if (tiles) {
      this.layer = this.tilemap.createLayer(0, tiles);
    }
  }
}
