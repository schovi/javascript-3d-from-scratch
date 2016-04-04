import Model from './model'
import Vector from '../utils/vector'
import * as Matrix from '../utils/matrix'

export default class WavefrontModel extends Model {
  constructor(source) {
    super()

    const vectors = []
    const polygonReferences = []

    source.split("\n").forEach((line) => {
      const [type, ...rest] = line.split(/\s+/)
      switch(type) {
        case "v":
          vectors.push(Vector(...rest.map(parseFloat).map((val) => val)))
          break
        case "f":
          polygonReferences.push(rest.map((vertex) => parseInt(vertex.split("/")[0]) - 1))
          break
      }
    })

    this.matrix = Matrix.fromColumns(vectors)
    this.polygonReferences = polygonReferences
  }

  get polygons() {
    const vectors = Matrix.columns(this.projectedMatrix)

    return (
      this.polygonReferences.map((pRefs) => {
        return pRefs.map((pRef) => {
          return vectors[pRef]
        })
      })
    )
  }
}
