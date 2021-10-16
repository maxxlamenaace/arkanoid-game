import { Vector } from "../types";
import { GameElement } from "./GameElement";
import { MobileElement } from "./MobileElement";

export class Paddle extends GameElement implements MobileElement {
  private leftMove: boolean;
  private rightMove: boolean;
  private speed: number;

  constructor(speed: number, paddleWidth: number, paddleHeight: number, paddlePosition: Vector, paddleImage: string) {
    super(paddleWidth, paddleHeight, paddlePosition, paddleImage);
    this.speed = speed;
    this.leftMove = false;
    this.rightMove = false;

    // Event listeners
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  // Getters
  get isMovingLeft(): boolean {
    return this.leftMove;
  }

  get isMovingRight(): boolean {
    return this.rightMove;
  }

  move(): void {
    if (this.leftMove) {
      this.position.x -= this.speed;
    }

    if (this.rightMove) {
      this.position.x += this.speed;
    }
  }

  handleKeyUp = (e: KeyboardEvent): void => {
    if (e.code === "ArrowLeft" || e.key === "ArrowLeft") {
      this.leftMove = false;
    }

    if (e.code === "ArrowRight" || e.key === "ArrowRight") {
      this.rightMove = false;
    }
  };

  handleKeyDown = (e: KeyboardEvent): void => {
    if (e.code === "ArrowLeft" || e.key === "ArrowLeft") {
      this.leftMove = true;
    }

    if (e.code === "ArrowRight" || e.key === "ArrowRight") {
      this.rightMove = true;
    }
  };
}
