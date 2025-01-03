import { drawFunctionArgumants } from "../components/AppBody";
import { green, red } from "./setaps/colorama/colors";
import { isDeepEqual } from "./setaps/deepEqual";
import { getRandom } from "./setaps/ramdom/getRandom";
import Coordinate2D from "./setaps/vector-math/Coordinate2D";
import Vector2D from "./setaps/vector-math/Vector2D";
import Apple from "./Snake/Apple";
import Board from "./Snake/Board";
import FinderWay from "./Snake/FinderWay";
import Snake from "./Snake/Snake";
import UserMover from "./Snake/UserMover";

let snake: Snake;
let head: Coordinate2D;
let directionHead: Vector2D;
let aplles: Apple[] = [];
let board: Board;
let finderWay: FinderWay;
let userMover: UserMover;
let isUserMover = false;

export const before = ({ matrix }: drawFunctionArgumants) => {
  head = new Coordinate2D({
    x: getRandom(0, matrix.columns),
    y: getRandom(0, matrix.rows),
  });

  snake = new Snake(head);
  directionHead = new Vector2D(new Coordinate2D({ x: -1, y: 0 }));
  snake.chengeDirection(directionHead);
  board = new Board(matrix);
  finderWay = new FinderWay(snake, aplles, board);
  userMover = new UserMover(snake, board);
};

export const draw = ({ matrix, pressNow }: drawFunctionArgumants) => {
  matrix.off();
  if (aplles.length === 0) {
    aplles.push(Apple.generte(snake, matrix));
  }

  snake.body.forEach((point) => {
    matrix.drawer.drawPixel({ ...point.toObject() }, green);
  });

  aplles.forEach((aplle) => {
    matrix.drawer.drawPixel(aplle.position.toObject(), red);
  });

  if (pressNow === "Space") {
    isUserMover = !isUserMover;
  }

  if (isUserMover) {
    userMover.go(pressNow);
  } else {
    finderWay.go();
  }

  snake.move();

  if (
    isDeepEqual(snake.positionHead().toObject(), aplles[0].position.toObject())
  ) {
    snake.eatApple(aplles[0]);
    aplles.pop();
  }
};
