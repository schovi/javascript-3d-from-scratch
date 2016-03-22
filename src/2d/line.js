import Generic from './generic'

export default class Line extends Generic {
  constructor(v1, v2) {
    super()

    this.v1 = v1
    this.v2 = v2
  }

  render(canvas, color) {
    canvas.renderLine(this.v1.x, this.v1.y, this.v2.x, this.v2.y, color)
  }

  translate() {

  }
}
