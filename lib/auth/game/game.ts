import { Game, Scale } from "phaser";
import { MainScene } from "./scenes/main-scene";

export function newGame(parent: string, {
  aspectRatio,
}: {
  aspectRatio: number;
}) {
  return new Game({
    parent,
    width: 320,
    height: 320 / aspectRatio,
    scale: {
      mode: Scale.ScaleModes.FIT,
    },
    backgroundColor: "#3333cc",
    scene: [
      MainScene,
    ],
    input: {
      activePointers: 2,
    },
  });
}
