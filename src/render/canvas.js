import { getPixelRation, applyHiDPICanvas } from './canvas_hdpi'

export default class Canvas {
  constructor({canvas, ...dimensions}) {
    this.canvas  = canvas
    this.context = canvas.getContext('2d')

    this.setDimensions(dimensions)

    this.setup && this.setup()
  }

  setDimensions({width, height, ratio}) {
    ratio = ratio || getPixelRation(this.context)

    applyHiDPICanvas(this.canvas, width, height, ratio)

    this.width   = canvas.width
    this.height  = canvas.height
    this.ratio   = ratio
  }

  //////////////////////////
  // Render pixel variants

  // // Render pixel with usage 1x1 putImageData
  // // Pros: supports subpixel (kind of antialiasing)
  // // Cons: is slow
  // setup() {
  //   this.imageData = this.context.createImageData(1,1)
  //   this.buffer    = this.imageData.data
  // }
  //
  // pixel(x, y, color) {
  //   const [r, g, b, a] = color
  //
  //   this.buffer[0] = r
  //   this.buffer[1] = g
  //   this.buffer[2] = b
  //   this.buffer[3] = a
  //
  //   this.context.putImageData(this.imageData, x, y)
  // }
  //
  // beforeRender() {
  //   // Clear canvas before each render
  //   this.context.clearRect(0, 0, this.width, this.height)
  // }

  // // Render pixel with usage fillRect
  // // Pros: faster then putImageData
  // // Cons: 6x faster than 1x1 putImageData
  // pixel(x, y, color) {
  //   const [r, g, b, a] = color
  //
  //   this.context.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
  //   this.context.fillRect( x, y, 1, 1 );
  // }
  //
  // beforeRender() {
  //   // Clear canvas before each render
  //   this.context.clearRect(0, 0, this.width, this.height)
  // }

  // Render pixel with usage one putImageData
  // Pros:
  // Cons: 2x slower than fillRect for smaller scenes
  pixel(x, y, [r, g, b, a]) {
    x = Math.round(x)
    y = Math.round(y)

    // Check for pixels outside of viewport
    if(x < 0 || x >= this.width || y < 0 || y > this.height) {
      return
    }

    const index = (this.width * y + x) * 4

    // Fill color
    this.buffer[index + 0] = r;
    this.buffer[index + 1] = g;
    this.buffer[index + 2] = b;
    this.buffer[index + 3] = a;
  }

  beforeRender() {
    this.imageData = this.context.createImageData(this.width, this.height)
    this.buffer    = this.imageData.data
  }

  afterRender() {
    this.context.putImageData(this.imageData, 0, 0)
  }
}
