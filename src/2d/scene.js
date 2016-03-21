export default class Scene {
  constructor(canvas) {
    this.canvas  = canvas
    this.objects = []
  }

  render(color) {
    this.canvas.beforeRender()

    this.objects.forEach((object) => {
      object.render(this.canvas, color)
    })

    this.canvas.afterRender()
  }
}
