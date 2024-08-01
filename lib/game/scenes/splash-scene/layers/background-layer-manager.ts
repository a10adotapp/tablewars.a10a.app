import { characterImages } from "@/lib/game/files";
import { GameObjects, Scene } from "phaser";

export class BackgroundLayerManager {
  scene: Scene;

  layer!: GameObjects.Layer;

  constructor(scene: Scene) {
    this.scene = scene;
  }

  init() {
    this.layer = this.scene.add.layer();

    this.initCells();

    this.initBlur();
  }

  initCells() {
    const camera = this.scene.cameras.main;

    const cellSize = 64;

    const xAnchors = Array.from({
      length: Math.ceil(camera.displayWidth / cellSize,
    )}).map((_, i) => {
      return (i * cellSize) + (cellSize / 2);
    });

    const yAnchors = Array.from({
      length: Math.ceil(camera.displayHeight / cellSize,
    )}).map((_, i) => {
      return (i * cellSize) + (cellSize / 2);
    });

    for (const yi in yAnchors) {
      const yAnchor = yAnchors[yi];

      for (const xi in xAnchors) {
        const xAnchor = xAnchors[xi];

        const characterImageKey = characterImages.at(
          ((Number(yi) * xAnchors.length) + Number(xi)) % characterImages.length
        )?.key;

        if (characterImageKey) {
          const container = this.scene.make.container({
            x: xAnchor,
            y: yAnchor,
          });

          this.layer.add(container);

          container.add(this.scene.make.image({
            key: characterImageKey,
          }));
        }
      }
    }
  }

  initBlur() {
    const camera = this.scene.cameras.main;

    const container = this.scene.make.container({});

    container.setSize(camera.displayWidth, camera.displayHeight);

    this.layer.add(container);

    const graphics = this.scene.make.graphics();

    graphics.fillGradientStyle(
      0xffffff, 0xffffff, 0xffffff, 0xffffff,
      0, 0, 1, 1,
    );

    graphics.fillRect(0, 0, container.width, container.height);

    container.add(graphics);
  }
}
