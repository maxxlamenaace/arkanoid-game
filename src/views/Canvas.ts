// Models
import { Brick, Ball, Paddle } from "../models";

export class Canvas {
  canvas: HTMLCanvasElement;

  private context: CanvasRenderingContext2D | null;
  private scoreDisplay: HTMLObjectElement | null;
  private start: HTMLObjectElement | null;
  private info: HTMLObjectElement | null;

  constructor(canvasName: string) {
    this.canvas = document.querySelector(canvasName) as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d");
    this.scoreDisplay = document.querySelector("#score");
    this.start = document.querySelector("#start");
    this.info = document.querySelector("#info");
  }

  clear(): void {
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  initGame(startFunction: (view: Canvas) => void): void {
    this.start?.addEventListener("click", () => startFunction(this));
  }

  displayScore(score: number): void {
    if (this.scoreDisplay) {
      this.scoreDisplay.innerHTML = score.toString();
    }
  }

  displayInfo(text: string) {
    if (this.info) {
      this.info.innerHTML = text;
    }
  }

  displayElement(element: Brick | Paddle | Ball): void {
    if (!element) {
      return;
    }

    this.context?.drawImage(element.image, element.position.x, element.position.y, element.width, element.height);
  }

  displayBricks(bricks: Brick[]) {
    bricks.forEach((brick) => this.displayElement(brick));
  }
}
