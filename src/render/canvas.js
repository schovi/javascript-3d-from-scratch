const getPixelRation = (ctx) => {
  const dpr = window.devicePixelRatio || 1
  const bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1

  return dpr / bsr
}

const applyHiDPICanvas = (canvas, width, height, ratio) => {
  canvas.width = width * ratio
  canvas.height = height * ratio
  canvas.style.width = width + "px"
  canvas.style.height = height + "px"
  canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0)
}

export default class Canvas {
  constructor({canvas, width, height, ratio}) {
    this.canvas  = canvas
    this.context = canvas.getContext('2d')
    this.width   = width
    this.height  = height
    this.ratio   = ratio

    applyHiDPICanvas(canvas, width, height, ratio || getPixelRation(context))

    this.preparePixelBuffer()
  }

  // Render pixel with usage 1x1 putImageData
  // Pros: supports subpixel (kind of antialiasing)
  // Cons: is slow
  preparePixelBuffer() {
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
}
