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

for(let i = 0; i < window.innerWidth; i++) {
  for(let j = 0; j < window.innerHeight; j += 50) {
    canvas.pixel(i, j, white)
  }
}
