import { GameObjects, Scene } from "phaser";

export class TitleLayerManager {
  scene: Scene;

  layer!: GameObjects.Layer;

  constructor(scene: Scene) {
    this.scene = scene;
  }

  init() {
    this.layer = this.scene.add.layer();

    const container = this.initContainer();

    const text = this.initText();

    container.add(text);

    container.setY(container.y - (text.height / 2));
  }

  initContainer(): GameObjects.Container {
    const camera = this.scene.cameras.main;

    const container = this.scene.make.container({
      y: camera.displayHeight / 3,
    });

    this.layer.add(container);

    return container;
  }

  initText(): GameObjects.Text {
    const camera = this.scene.cameras.main;

    const text = this.scene.make.text({
      style: {
        fixedWidth: camera.displayWidth,
        fontSize: 50,
        fontFamily: "DotGothic16",
        align: "center",
      },
    });

    text.setFill("#ffffff");
    text.setStroke("#000000", 10);

    text.setText([
      "T a b l e",
      "W a r s",
    ]);

    return text;
  }
}
