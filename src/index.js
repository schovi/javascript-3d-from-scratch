import './index.css'
import Canvas from './render/canvas.js'
import {white, red, green, blue, black} from './color'

// 2D
import Scene   from './2d/scene'
import Vertex  from './2d/vertex'
import Circle  from './2d/circle'
import Square  from './2d/square'
import Polygon from './2d/polygon'
import * as Matrix from './utils/matrix'
// App
const winWidth  = window.innerWidth
const winHeight = window.innerHeight

// Initialize wrapper around canvas
const canvas = new Canvas({
  canvas: document.getElementById("canvas"),
  width : winWidth,
  height: winHeight,
  ratio : 1
})

// Initialize scene
const scene = new Scene(canvas, {
  dx: winWidth / 2,
  dy: winHeight / 2
})

// Handle window resizing
window.addEventListener('resize', () => {
  const winWidth  = window.innerWidth
  const winHeight = window.innerHeight

  canvas.setDimensions({
    width : winWidth,
    height: winHeight,
    ratio : 1
  })

  scene.dx = winWidth / 2
  scene.dy = winHeight / 2
})

const polygon = new Polygon(new Vertex(17, 73), new Vertex(293, 130), new Vertex(33, 11))
const square  = new Square(new Vertex(-100, -100), 90)

scene.add(polygon, square)

const step = () => {
  scene.mesh(white)

  // polygon.translate(1, 0)

  polygon.rotate(-0.5, new Vertex(293, 130))
  square.rotate(1)

  // requestAnimationFrame(step)
}

step()
