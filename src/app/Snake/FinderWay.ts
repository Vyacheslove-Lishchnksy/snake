import Vector2D from "../setaps/vector-math/Vector2D";
import Apple from "./Apple";
import Board from "./Board";
import Mover from "./Mover";
import Snake from "./Snake";


class FinderWay {
  private snake: Snake;
  private board: Board;
  private apples: Apple[];

  constructor(snake: Snake, apples: Apple[], board: Board) {
    this.snake = snake;
    this.apples = apples;
    this.board = board;
  }

  private directions = [
    Mover.directions.UP,
    Mover.directions.RIGHT,
    Mover.directions.DOWN,
    Mover.directions.LEFT,
  ]

  public go() {
    let direction = this.findWayToTheApple();

    if (!this.canMove(direction)) {
      for (let i = 0; i < this.directions.length + 1; i++) {
        if (i > 3) {
          this.snake.killSnake();
        } else if (this.canMove(this.directions[i])) {
          direction = this.directions[i];
          break;
        }
      };
    }
    this.snake.chengeDirection(direction);
  }

  private findWayToTheApple() {
    const aim = this.apples[0].position;
    let direction;
    const lenght = this.snake.positionHead()
      .toSub(aim.toObject());
    if (Math.abs(lenght.x) >= Math.abs(lenght.y)) {
      if (aim.x >= this.snake.positionHead().x) {
        direction = Mover.directions.RIGHT;
      } else {
        direction = Mover.directions.LEFT;
      }
    } else {
      if (aim.y >= this.snake.positionHead().y) {
        direction = Mover.directions.DOWN;
      } else {
        direction = Mover.directions.UP;
      }
    }
    return direction
  }

  private canMove(direction: Vector2D): boolean {
    const newPosition = this.snake.positionHead().toAdd(direction);
    return !this.snake.isSnakeBody(newPosition) && !this.board.isWoll(newPosition);
  }

}

export default FinderWay;