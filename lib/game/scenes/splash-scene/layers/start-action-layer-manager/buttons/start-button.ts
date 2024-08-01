import { GameObjects, Geom, Scene } from "phaser";

export type ClickHandler = () => void;

export class StartButton {
  static State = {
    NEUTRAL: "neutral",
    PRESSED: "pressed",
  } as const;

  scene: Scene;

  clickHandler?: ClickHandler;

  width: number = 0;
  height: number = 64;

  state: string = StartButton.State.NEUTRAL;

  container!: GameObjects.Container;

  graphics!: GameObjects.Graphics;

  constructor(scene: Scene, options?: {
    onClick?: ClickHandler;
  }) {
    this.scene = scene;
    this.clickHandler = options?.onClick;
  }

  init(layer: GameObjects.Layer) {
    this.width = (this.scene.cameras.main.displayWidth / 3) * 2;

    this.initContainer();

    layer.add(this.container);

    this.initGraphics();

    this.initText();
  }

  initContainer() {
    const camera = this.scene.cameras.main;

    this.container = this.scene.make.container({
      x: (camera.displayWidth / 2) - (this.width / 2),
      y: ((camera.displayHeight / 4) * 3) - (this.height / 2),
    });

    this.container.setSize(this.width, this.height).setInteractive(
      new Geom.Rectangle(this.width / 2, this.height / 2, this.width, this.height),
      Geom.Rectangle.Contains,
    );

    this.container.on("pointerdown", this.onPointerDown, this);
    this.container.on("pointerup", this.onPointerUp, this);
    this.container.on("pointerout", this.onPointerOut, this);
  }

  initGraphics() {
    this.graphics = this.scene.make.graphics();

    this.container.add(this.graphics);
  }

  initText() {
    const text = this.scene.make.text({
      style: {
        fontSize: 32,
        fontFamily: "DotGothic16",
      },
    });

    text.setFill("#000000");

    text.setText("Game Start");

    text.setX((this.width / 2) - (text.width / 2));
    text.setY((this.height / 2) - (text.height / 2));

    this.container.add(text);
  }

  onPointerDown() {
    this.state = StartButton.State.PRESSED;

    this.update();
  }

  onPointerUp() {
    if (this.state = StartButton.State.PRESSED) {
      this.state = StartButton.State.NEUTRAL;

      this.update();

      this.clickHandler?.();
    }
  }

  onPointerOut() {
    if (this.state = StartButton.State.PRESSED) {
      this.state = StartButton.State.NEUTRAL;

      this.update();
    }
  }

  update() {
    this.graphics.clear();

    if (this.state === StartButton.State.PRESSED) {
      this.graphics.fillStyle(0x6666cc, 0.5);
      this.graphics.fillRoundedRect(0, 0, this.width, this.height, 8);
    }
  }
}
