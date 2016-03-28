import Polygon from './polygon'
import Vertex  from './vertex'
import Line    from './line'
import Vector from '../utils/vector'
import * as Matrix from '../utils/matrix'

export default class Square extends Polygon {
  constructor(center, length) {
    super()

    this.center = center

    const d = length / 2

    this.matrix = Matrix.fromColumns(
      Vector(center[0] - d, center[1] - d),
      Vector(center[0] + d, center[1] - d),
      Vector(center[0] + d, center[1] + d),
      Vector(center[0] - d, center[1] + d)
    )
  }
}
