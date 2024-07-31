import { Scene } from "phaser";

export class MainScene extends Scene {
  constructor() {
    super("MainScene");
  }

  create() {
    this.add.text(0, 0, "Hello");
  }
}
