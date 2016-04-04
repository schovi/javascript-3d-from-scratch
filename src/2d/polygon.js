import Generic     from './generic'
import * as utils  from '../utils'
import Vector      from '../utils/vector'
import * as Matrix from '../utils/matrix'

export default class Polygon extends Generic {
  constructor(...vectors) {
    super()

    this.matrix = Matrix.fromColumns(vectors)

    // let xs = 0
    // let ys = 0
    //
    // this.vectors.forEach(({x, y}) => {
    //   xs += x
    //   ys += y
    // })
    //
    // this.center = Vector(
    //   xs / vectors.size,
    //   ys / vectors.size
    // )
  }

  get center() {
    if(!this._center) {
      console.error(`Missing center for class ${this.constructor.name}`)
      return new Vertex(0, 0)
    }

    return this._center
  }

  set center(center) {
    this._center = center
  }

  get matrix() {
    if(!this._matrix) {
      console.error(`Missing matrix for class ${this.constructor.name}`)
    }

    return this._matrix
  }

  set matrix(matrix) {
    this._matrix = matrix
  }

  mesh(color) {
    const vectors = Matrix.columns(this.matrix)

    return vectors.forEach((v1, i) => {
      let v2 = vectors[i + 1]
      if(!v2) { v2 = vectors[0] }

      this.scene.renderLine(Matrix.fromColumns(v1, v2), color)
    })
  }

  translate(vector) {
    this.matrix = Matrix.addVector(this.matrix, vector)
  }

  rotate(degree, center) {
    const rad = utils.toRadians(degree)

    const sin = Math.sin(rad)
    const cos = Math.cos(rad)

    const rotationMatrix = Matrix.create(
      [cos, -sin],
      [sin,  cos]
    )

    this.matrix = (
      Matrix.addVector(
        Matrix.multiply(
          rotationMatrix,
          Matrix.subtractVector(
            this.matrix,
            center
          )
        ),
        center
      )
    )
  }

  scale(size, center) {
    const scaleMatrix = Matrix.scalar(this.matrix.rows, size)

    this.matrix = (
      Matrix.addVector(
        Matrix.multiply(
          scaleMatrix,
          Matrix.subtractVector(
            this.matrix,
            center
          )
        ),
        center
      )
    )
  }
}
