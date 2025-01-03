import Matrix from "../../surse/Matrix";
import { getRandom } from "../setaps/ramdom/getRandom";
import Coordinate2D from "../setaps/vector-math/Coordinate2D";
import Snake from "./Snake";

class Apple {
  public position: Coordinate2D;

  constructor(position: Coordinate2D) {
    this.position = position;
  }

  public static generte(snake: Snake, matrix: Matrix): Apple {
    let coordinate: Coordinate2D;
    do {
      coordinate = new Coordinate2D({
        x: getRandom(0, matrix.columns),
        y: getRandom(0, matrix.rows),
      });
    } while (snake.isSnakeBody(coordinate));
    return new Apple(coordinate);
  }
}

export default Apple;
