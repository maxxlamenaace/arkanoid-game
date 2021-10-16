import { Vector } from "../types";
import { GameElement } from "./GameElement";

export class Brick extends GameElement {
  private brickEnergy: number;

  constructor(width: number, height: number, position: Vector, brickEnergy: number, imagePath: string) {
    super(width, height, position, imagePath);
    this.brickEnergy = brickEnergy;
  }

  // Getters
  get energy(): number {
    return this.brickEnergy;
  }

  // Setters
  set energy(energy: number) {
    this.brickEnergy = energy;
  }
}
