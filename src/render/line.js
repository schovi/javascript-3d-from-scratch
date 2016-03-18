// Naive rendering of line with few steps
const simpleLine = (canvas, x0, y0, x1, y1, color) => {
  // Fix steep lines
  var swap = false
  if(Math.abs(x0 - x1) < Math.abs(y0 - y1)) {
    [x0, y0, x1, y1] = [y0, x0, y1, x1]
    swap = true
  }

  // Fix right to left lines
  if (x0 > x1) {
    [x0, x1, y0, y1] = [x1, x0, y1, y0]
  }

  for(let x = x0; x < x1; x++) {
    const t = (x - x0) / (x1 - x0)
    const y = y0 * (1 - t) + y1 * t

    if(swap) {
      canvas.pixel(y, x, color)
    } else {
      canvas.pixel(x, y, color)
    }
  }
}

export default simpleLine
