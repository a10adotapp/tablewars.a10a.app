import { Scene } from "phaser";

export class SecondScene extends Scene {
  constructor() {
    super("SecondScene");
  }

  create() {
    this.add.text(0, 0, "Second Scene", {
      color: "#000000",
      fontSize: 20,
    });
  }
}
