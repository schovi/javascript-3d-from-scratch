import Polygon from './polygon'
import Vertex  from './vertex'
import Line    from './line'

export default class Square extends Polygon {
  constructor(center, length) {
    super()

    this.center = center
    this.length = length

    const d = length / 2

    this.vertexes = [
      new Vertex(center.x - d, center.y - d),
      new Vertex(center.x + d, center.y - d),
      new Vertex(center.x + d, center.y + d),
      new Vertex(center.x - d, center.y + d)
    ]
  }
}
