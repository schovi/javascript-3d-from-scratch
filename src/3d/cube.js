import Model from './model'
import Vector from '../utils/vector'
import * as Matrix from '../utils/matrix'

export default class Cube extends Model {
  constructor(center, length) {
    super()

    this.center = center

    const d = length / 2

    this.matrix = Matrix.addVector(
      Matrix.fromColumns(
        // x, y, z
        // top
        [ d,  d,  d],
        [ d, -d,  d],
        [-d, -d,  d],
        [-d,  d,  d],
        // Bottom
        [-d,  d, -d],
        [-d, -d, -d],
        [ d, -d, -d],
        [ d,  d, -d]
      ),
      this.center
    )
  }

  get polygons() {
    const vectors = Matrix.columns(this.projectedMatrix)

    return [
      [vectors[0], vectors[1], vectors[2], vectors[3]],
      [vectors[3], vectors[2], vectors[5], vectors[4]],
      [vectors[4], vectors[5], vectors[6], vectors[7]],
      [vectors[7], vectors[6], vectors[1], vectors[0]],
      [vectors[7], vectors[0], vectors[3], vectors[4]],
      [vectors[1], vectors[6], vectors[5], vectors[2]]
    ]
  }
}
