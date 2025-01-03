import deepEqual from "../setaps/deepEqual/deepEqual";
import Vector2D from "../setaps/vector-math/Vector2D";
import Board from "./Board";
import Mover from "./Mover";
import Snake from "./Snake";

class UserMover {
  private snake: Snake;
  private board: Board;

  constructor(snake: Snake, board: Board) {
    this.snake = snake;
    this.board = board;
  }
  public go(key: string) {
    const newDirection = this.getDirctionByKey(key);
    if (this.canIMove(newDirection)) {
      this.snake.chengeDirection(newDirection);
    }
    if (this.isDeadZone()) {
      this.snake.killSnake();
    }
  }

  private getDirctionByKey(key: string): Vector2D {
    let result: Vector2D = this.snake.directionHead;
    switch (key) {
      case "ArrowUp":
        result = Mover.directions.UP;
        break;
      case "ArrowDown":
        result = Mover.directions.DOWN;
        break;
      case "ArrowLeft":
        result = Mover.directions.LEFT;
        break;
      case "ArrowRight":
        result = Mover.directions.RIGHT;
        break;
    }
    return result;
  }

  private isDeadZone(): boolean {
    return (
      this.snake.isSnakeBody(
        this.snake.positionHead().toAdd(this.snake.directionHead)
      ) || this.board.isWoll(this.snake.positionHead())
    );
  }

  private canIMove(direction: Vector2D): boolean {
    let result = true;
    if (
      deepEqual(
        direction.toObject(),
        this.snake.directionHead.toMult(-1).toObject()
      )
    ) {
      result = false;
    }
    return result;
  }
}

export default UserMover;
