import { deepEqualIsIn } from "../setaps/deepEqual/deepEqual";
import Coordinate2D from "../setaps/vector-math/Coordinate2D";
import Vector2D from "../setaps/vector-math/Vector2D";
import Apple from "./Apple";

class Snake {
  public body: Coordinate2D[];
  private startLenght: number = 3;
  private length: number;
  public directionHead: Vector2D;
  private startPosition;
  public positionHead() {
    return this.body[0];
  }

  constructor(head: Coordinate2D) {
    this.startPosition = head;
    this.body = [];
    this.body.push(head);
    this.length = this.startLenght;
    this.directionHead = new Vector2D(new Coordinate2D({ x: 0, y: 0 }));
  }

  public eatApple(aplle: Apple): void {
    this.body.unshift(aplle.position);
    this.length++;
  }

  public move() {
    this.body.unshift(
      new Coordinate2D({
        x: this.body[0].x + this.directionHead.x,
        y: this.body[0].y + this.directionHead.y,
      })
    );
    this.splitBody();
  }

  public chengeDirection(direction: Vector2D) {
    this.directionHead = direction;
  }

  public getArrayObject() {
    return this.body.map((coordinate) => {
      return coordinate.toObject();
    });
  }

  public isSnakeBody(coordinate: Coordinate2D) {
    return deepEqualIsIn(this.getArrayObject(), coordinate.toObject());
  }

  public splitBody() {
    this.body = this.body.slice(0, this.length);
  }

  public killSnake() {
    this.length = 0;
    this.splitBody();
    this.length = this.startLenght;
    this.body.push(this.startPosition);
    this.directionHead = new Vector2D(new Coordinate2D({ x: 0, y: 0 }));
  }
}

export default Snake;
