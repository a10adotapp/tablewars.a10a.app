import { GameObjects, Input, Scene } from "phaser";

export class PointerSparcleLayerManager {
  scene: Scene;

  layer!: GameObjects.Layer;

  particleEmitter!: GameObjects.Particles.ParticleEmitter;

  constructor(scene: Scene) {
    this.scene = scene;
  }

  init() {
    this.layer = this.scene.add.layer();

    this.particleEmitter = this.scene.make.particles({
      key: "pointer",
      config: {
        lifespan: 200,
        speed: {
          min: 100,
          max: 400,
        },
        scale: 0.1,
      },
    });

    this.scene.input.on(Input.Events.POINTER_UP, this.onPointerUp, this);
    this.scene.input.on(Input.Events.POINTER_MOVE, this.onPointerMove, this);
  }

  onPointerMove(pointer: Input.Pointer) {
    this.particleEmitter.setAlpha(0.5);
    this.particleEmitter.explode(2, pointer.x, pointer.y);
  }

  onPointerUp(pointer: Input.Pointer) {
    this.particleEmitter.setAlpha(1);
    this.particleEmitter.explode(8, pointer.x, pointer.y);
  }
}
