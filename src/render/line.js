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

// Bresenham's line algorithm
// https://en.m.wikipedia.org/wiki/Bresenham%27s_line_algorithm
const bresenhamsLine = (canvas, x0, y0, x1, y1, color) => {
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

  const dx = x1 - x0
  const dy = y1 - y0
  const dError = Math.abs(dy / dx)
  let error = 0
  let y = y0

  // const t = (x - x0) / (x1 - x0)
  // const y = y0 * (1 - t) + y1 * t
  for(let x = x0; x < x1; x++) {
    if(swap) {
      canvas.pixel(y, x, color)
    } else {
      canvas.pixel(x, y, color)
    }

    error += dError

    if(error > 0.5) {
      y += y1 > y0 ? 1 : -1
      error -= 1
    }
  }
}

// export default simpleLine
export default bresenhamsLine
