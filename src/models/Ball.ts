import { Vector } from "../types";
import { GameElement } from "./GameElement";
import { MobileElement } from "./MobileElement";

export class Ball extends GameElement implements MobileElement {
  private ballSpeed: Vector;

  constructor(speed: number, ballSize: number, position: Vector, image: string) {
    super(ballSize, ballSize, position, image);
    this.ballSpeed = {
      x: speed,
      y: -speed,
    };
  }

  changeYDirection(): void {
    this.ballSpeed.y = -this.ballSpeed.y;
  }

  changeXDirection(): void {
    this.ballSpeed.x = -this.ballSpeed.x;
  }

  move(): void {
    this.position.x += this.ballSpeed.x;
    this.position.y += this.ballSpeed.y;
  }
}
