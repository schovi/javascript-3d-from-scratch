import Polygon from './polygon'
import * as Matrix from '../utils/matrix'

export default class Model extends Polygon {
  get polygons() {
    throw `Missing getter polygons for class ${this.constructor.name}`
  }

  get projectedMatrix() {
    return this.scene.projection(this.matrix)
  }

  mesh(color) {
    const polygons = this.polygons

    polygons.forEach((vectors) => {
      vectors.forEach((v1, i) => {
        let v2 = vectors[i + 1]
        if(!v2) { v2 = vectors[0] }

        this.scene.renderLine(Matrix.fromColumns(v1, v2), color)
      })
    })
  }
}
