import Matrix from "../../surse/Matrix";
import Coordinate2D from "../setaps/vector-math/Coordinate2D";

class Board {
  public woll: IWoll;

  constructor(matrix: Matrix) {
    this.woll = {
      UP: -1,
      DOWN: matrix.rows,
      LEFT: -1,
      RIGHT: matrix.columns,
    };
  }

  isWoll(nextPosition: Coordinate2D): boolean {
    return (
      nextPosition.x <= this.woll.LEFT ||
      nextPosition.x >= this.woll.RIGHT ||
      nextPosition.y <= this.woll.UP ||
      nextPosition.y >= this.woll.DOWN
    )
  }
}

interface IWoll {
  UP: number,
  DOWN: number,
  LEFT: number,
  RIGHT: number,
};

export default Board;