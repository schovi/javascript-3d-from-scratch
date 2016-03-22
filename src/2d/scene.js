export default class Scene {
  constructor(canvas) {
    this.canvas  = canvas
    this.objects = []
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

  render(color) {
    this.canvas.beforeRender()

    this.objects.forEach((object) => {
      object.render(this.canvas, color)
    })

    this.canvas.afterRender()
  }
}
