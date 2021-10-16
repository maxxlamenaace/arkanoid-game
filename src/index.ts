import { Canvas } from "./views/Canvas";
import { Ball, Brick, Paddle, Collision } from "./models";

// Images
import PADDLE_IMAGE from "./images/paddle.png";
import BALL_IMAGE from "./images/ball.png";

// Level and colors
import {
  PADDLE_SPEED,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_STARTX,
  BALL_SPEED,
  BALL_SIZE,
  BALL_STARTX,
  BALL_STARTY,
} from "./setup";

// Helpers
import { createBricks } from "./helpers";

// Game variables
let gameOver = false;
let score = 0;

function setGameOver(view: Canvas) {
  view.displayInfo("Game Over!");
  gameOver = false;
}

function setGameWin(view: Canvas) {
  view.displayInfo("Game Won!");
  gameOver = false;
}

function gameLoop(view: Canvas, bricks: Brick[], paddle: Paddle, ball: Ball, collision: Collision) {
  view.clear();
  view.displayBricks(bricks);
  view.displayElement(paddle);
  view.displayElement(ball);

  // Move paddle and check so it won't exit the playfields
  if (
    (paddle.isMovingLeft && paddle.position.x > 0) ||
    (paddle.isMovingRight && paddle.position.x < view.canvas.width - paddle.width)
  ) {
    paddle.move();
  }

  // Move ball
  ball.move();

  collision.checkBallCollision(ball, paddle, view);

  const isCollidingBrick = collision.isCollidingBricks(ball, bricks);
  if (isCollidingBrick) {
    score += 1;
    view.displayScore(score);
  }

  // Game over when ball leaves playfield
  if (ball.position.y > view.canvas.height) {
    gameOver = true;
  }

  // If game won set gameOver and display it to the user
  if (bricks.length === 0) {
    return setGameWin(view);
  }

  // Return if gameover and don't run the requestAnimationFrame
  if (gameOver) {
    return setGameOver(view);
  }

  requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball, collision));
}

function startGame(view: Canvas) {
  // Reset the game
  score = 0;
  view.displayInfo("");
  view.displayScore(score);

  // Create a collision instance
  const collision = new Collision();

  // Create all the bricks
  const bricks = createBricks();

  // Create a paddle
  const paddle = new Paddle(
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    {
      x: PADDLE_STARTX,
      y: view.canvas.height - PADDLE_HEIGHT - 5,
    },
    PADDLE_IMAGE
  );

  // Create a ball
  const ball = new Ball(BALL_SPEED, BALL_SIZE, { x: BALL_STARTX, y: BALL_STARTY }, BALL_IMAGE);

  gameLoop(view, bricks, paddle, ball, collision);
}

// Create a new view
const view = new Canvas("#playField");
view.initGame(startGame);
