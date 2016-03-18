import './index.css'
import Canvas from './render/canvas.js'

// Colors
const white = [255,255,255,255]

// App
const canvas = new Canvas({
  canvas: document.getElementById("canvas"),
  width : window.innerWidth,
  height: window.innerHeight,
  ratio : 1
})

// Naive rendering of line with few steps
const line = (x0, y0, x1, y1, color) => {
  for(let x = x0; x < x1; x++) {
    const t = (x - x0) / (x1 - x0)
    const y = y0 * (1 - t) + y1 * t
    canvas.pixel(x, y, color)
  }
}

line(13, 20, 80, 40, white)
