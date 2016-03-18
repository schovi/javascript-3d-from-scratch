import './index.css'
import Canvas from './render/canvas.js'
import line from './render/line'

// Colors
const white = [255, 255, 255, 255]
const red   = [255,   0,   0, 255]
const green = [  0, 255,   0, 255]
const blue  = [  0,   0, 255, 255]

// App
const canvas = new Canvas({
  canvas: document.getElementById("canvas"),
  width : window.innerWidth,
  height: window.innerHeight,
  ratio : 1
})

line(canvas, 13, 20, 80, 40, white)
line(canvas, 20, 13, 40, 80, red)
line(canvas, 90, 50, 23, 30, green)
