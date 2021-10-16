import { Vector } from "~/types";

export class GameElement {
  private elementImage: HTMLImageElement = new Image();

  constructor(
    private elementWidth: number,
    private elementHeight: number,
    private elementPosition: Vector,
    imagePath: string
  ) {
    this.elementWidth = elementWidth;
    this.elementHeight = elementHeight;
    this.elementPosition = elementPosition;
    this.elementImage.src = imagePath;
  }

  // Getters
  get width(): number {
    return this.elementWidth;
  }

  get height(): number {
    return this.elementHeight;
  }

  get position(): Vector {
    return this.elementPosition;
  }

  get image(): HTMLImageElement {
    return this.elementImage;
  }
}
