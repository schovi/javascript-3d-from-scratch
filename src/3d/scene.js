import renderLine from '../render/line'
import * as Matrix from '../utils/matrix'
import Scene2D from '../2d/scene'

export default class Scene extends Scene2D {
  constructor(canvas, params) {
    super(canvas, params)

    this.projection = params.projection
  }

  mesh(color) {
    this.canvas.beforeRender && this.canvas.beforeRender()

    this.objects.forEach((object) => object.mesh(color))

    this.canvas.afterRender && this.canvas.afterRender()
  }

  renderLine(lineMatrix, color) {
    // lineMatrix = this.projection(lineMatrix)

    renderLine(
      this.canvas,
      lineMatrix[0][0], lineMatrix[1][0],
      lineMatrix[0][1], lineMatrix[1][1],
      color
    )
  }
}
