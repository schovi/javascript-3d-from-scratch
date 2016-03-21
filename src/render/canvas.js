import renderLine from './line'
import { getPixelRation, applyHiDPICanvas } from './canvas_hdpi'

export default class Canvas {
  constructor({canvas, width, height, ratio}) {
    this.canvas  = canvas
    this.context = canvas.getContext('2d')

    applyHiDPICanvas(canvas, width, height, ratio || getPixelRation(this.context))

    this.width   = canvas.width
    this.height  = canvas.height
    this.ratio   = ratio

    this.setup && this.setup()
  }

  // Render pixel with usage 1x1 putImageData
  // Pros: supports subpixel (kind of antialiasing)
  // Cons: is slow
  setup() {
    this.imageData = this.context.createImageData(1,1)
    this.buffer    = this.imageData.data
  }

  pixel(x, y, color) {
    const [r, g, b, a] = color

    this.buffer[0] = r
    this.buffer[1] = g
    this.buffer[2] = b
    this.buffer[3] = a

    this.context.putImageData(this.imageData, x, y)
  }

  beforeRender() {
    // Clear canvas before each render
    this.context.clearRect(0, 0, this.width, this.height)
  }

  afterRender() {

  }

  renderLine(x0, y0, x1, y1, color) {
    renderLine(this, x0, y0, x1, y1, color)
  }
}
