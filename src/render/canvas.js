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
    this.canvas = canvas
    this.width  = width
    this.height = height
    this.ratio  = ratio

    applyHiDPICanvas(canvas, width, height, ratio || getPixelRation(context))
  }
}
