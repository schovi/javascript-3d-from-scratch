import renderLine from '../render/line'

export default class Scene {
  constructor(canvas, {dx = 0, dy = 0} = {}) {
    this.canvas  = canvas
    this.objects = []
    this.dx = dx
    this.dy = dy
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

  renderLine(x0, y0, x1, y1, color) {
    renderLine(this.canvas, x0 + this.dx, y0 + this.dy, x1 + this.dx, y1 + this.dy, color)
  }
}
