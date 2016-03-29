import './index.css'
import Canvas from './render/canvas.js'
import {white, red, green, blue, black} from './color'

// 2D
import Scene   from './2d/scene'
import Square  from './2d/square'
import Polygon from './2d/polygon'
import Vector  from './utils/vector'
import {add as addVectors} from './utils/vector'

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
  offset: Vector(winWidth / 2, winHeight / 2)
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

  scene.offset =  Vector(winWidth / 2, winHeight / 2)

  scene.mesh(white)
})

const polygon = new Polygon(Vector(17, 73), Vector(293, 130), Vector(33, 11))

// Square
let squareCenter      = Vector(-100, -100)
const squareTranslate = Vector(0.25, 0.25)
const square          = new Square(squareCenter, 90)

scene.add(
  polygon,
  square
)

const step = () => {
  scene.mesh(white)

  polygon.rotate(-0.5, Vector(293, 130))
  square.scale(1.001, squareCenter)
  square.rotate(1, squareCenter)
  squareCenter = addVectors(squareCenter, squareTranslate)
  square.translate(squareTranslate)

  requestAnimationFrame(step)
}

step()
