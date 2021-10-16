// Types
import { Brick, Paddle, Ball } from ".";
import { Canvas } from "../views/Canvas";

export class Collision {
  checkBallCollision(ball: Ball, paddle: Paddle, view: Canvas): void {
    // 1. Check ball collision with paddle
    if (
      ball.position.x + ball.width > paddle.position.x &&
      ball.position.x < paddle.position.x + paddle.width &&
      ball.position.y + ball.width === paddle.position.y
    ) {
      ball.changeYDirection();
    }

    // 2. Check ball collision with walls
    // Ball movement X constraints
    if (ball.position.x > view.canvas.width - ball.width || ball.position.x < 0) {
      ball.changeXDirection();
    }

    // Ball movement Y constraints
    if (ball.position.y < 0) {
      ball.changeYDirection();
    }
  }

  isCollidingBricks(ball: Ball, bricks: Brick[]): boolean {
    let colliding = false;

    bricks.forEach((brick, index) => {
      if (this.isCollidingBrick(ball, brick)) {
        ball.changeYDirection();

        if (brick.energy === 1) {
          bricks.splice(index, 1);
        } else {
          brick.energy -= 1;
        }

        colliding = true;
      }
    });

    return colliding;
  }

  private isCollidingBrick(ball: Ball, brick: Brick): boolean {
    if (
      ball.position.x < brick.position.x + brick.width &&
      ball.position.x + ball.width > brick.position.x &&
      ball.position.y < brick.position.y + brick.height &&
      ball.position.y + ball.height > brick.position.y
    ) {
      return true;
    }

    return false;
  }
}
