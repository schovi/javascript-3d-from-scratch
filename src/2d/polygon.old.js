import Generic from './generic'
import Line    from './line'
import * as utils from './utils'
import Vertex from './vertex'

export default class Polygon extends Generic {
  constructor(...vertexes) {
    super()

    this.vertexes = [].concat(...vertexes)

    let xs = 0
    let ys = 0

    this.vertexes.forEach(({x, y}) => {
      xs += x
      ys += y
    })

    this.center = new Vertex(
      xs / this.vertexes.length,
      ys / this.vertexes.length
    )
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

  get vertexes() {
    if(!this._vertexes) {
      console.error(`Missing vertexes for class ${this.constructor.name}`)
      return []
    }

    return this._vertexes
  }

  set vertexes(...vertexes) {
    this._vertexes = [].concat(...vertexes)
  }

  get lines() {
    const vertexes = this.vertexes

    return vertexes.map((v1, i) => {
      let v2 = vertexes[i + 1]
      if(!v2) { v2 = vertexes[0] }

      return new Line(v1, v2)
    })
  }

  mesh(color) {
    this.lines.forEach((line) => {
      line.render(this.scene, color)
    })
  }

  translate(x, y) {
    this.vertexes.forEach((vertex) => {
      vertex.x += x
      vertex.y += y
    })
  }

  rotate(degree, center) {
    center = center || this.center

    const rad = utils.toRadians(degree)

    const rotationMatrix = [
      [Math.cos(rad), Math.sin(rad)],
      [Math.sin(rad), Math.cos(rad)]
    ]

    this.vertexes.forEach((vertex) => {
      const x = vertex.x - center.x
      const y = vertex.y - center.y

      vertex.x = center.x + x * rotationMatrix[0][0] - y * rotationMatrix[0][1]
      vertex.y = center.y + x * rotationMatrix[1][0] + y * rotationMatrix[1][1]
    })
  }
}
