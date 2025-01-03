import Vector2D from "../setaps/vector-math/Vector2D"

class Mover {
  public static directions = {
    UP: new Vector2D({ x: 0, y: -1 }),
    DOWN: new Vector2D({ x: 0, y: 1 }),
    LEFT: new Vector2D({ x: -1, y: 0 }),
    RIGHT: new Vector2D({ x: 1, y: 0 }),
  }
}

export default Mover;