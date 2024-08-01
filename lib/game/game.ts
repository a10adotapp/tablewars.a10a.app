import { Game, Scale } from "phaser";
import { PlayScene } from "./scenes/play-scene";
import { SplashScene } from "./scenes/splash-scene";

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
    backgroundColor: "#ffffff",
    scene: [
      SplashScene,
      PlayScene,
    ],
    input: {
      activePointers: 2,
    },
  });
}
