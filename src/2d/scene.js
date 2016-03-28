import renderLine from '../render/line'
import {addVector} from '../utils/matrix'

export default class Scene {
  constructor(canvas, {offset} = {}) {
    this.canvas  = canvas
    this.objects = []
    this.offset = offset
  }

  // Add objects to scene
  add(...objects) {
    objects = objects.concat(...objects)

    objects.forEach((object) => {
      if(!~this.objects.indexOf(object)) {
        this.objects.push(object)
        object.scene = this
      }
    })
  }

  // Remove objects from scene
  remove(...object) {
    objects = objects.concat(...objects)

    objects.forEach((object) => {
      const index = this.objects.indexOf(object)

      if(~index) {
        this.objects.splice(index, 1)
        delete object.scene
      }
    })
  }

  mesh(color) {
    this.canvas.beforeRender && this.canvas.beforeRender()

    this.objects.forEach((object) => {
      object.mesh(color)
    })

    this.canvas.afterRender && this.canvas.afterRender()
  }

  renderLine(matrix, color) {
    matrix = addVector(matrix, this.offset)

    renderLine(
      this.canvas,
      matrix[0][0], matrix[1][0],
      matrix[0][1], matrix[1][1],
      color
    )
  }
}
