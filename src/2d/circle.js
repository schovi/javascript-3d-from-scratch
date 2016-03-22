import Generic from './generic'
import * as utils from './utils'

export default class Circle extends Generic {
  constructor(center, diameter) {
    super()

    this.center   = center
    this.diameter = diameter
  }

  render(canvas, color) {
    const circumference = Math.PI * this.diameter
    const r = this.diameter / 2

    for(let i = 1; i < circumference; i++) {
      const d = 360 / circumference * i
      const x = this.center.x + r * Math.cos(utils.toRadians(d))
      const y = this.center.y + r * Math.sin(utils.toRadians(d))
      canvas.pixel(x, y, color)
    }
  }

  translate(x, y) {
    this.center.x += x
    this.center.y += y
  }
}
