import './index.css'
import Canvas from './render/canvas.js'
import {white, red, green, blue, black} from './color'

// 3D
import Scene   from './3d/scene'
import Cube    from './3d/cube'
import Polygon from './3d/polygon'
import WavefrontModel from './3d/wavefront_model'
import Vector  from './utils/vector'
import {add as addVectors} from './utils/vector'
import * as Matrix from './utils/matrix'
// import headSource from 'raw!./african_head_part_2.obj'
// import headSource from 'raw!./african_head_part.obj'
import headSource from 'raw!./african_head.obj'

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

const convert2dTo3d = Matrix.create(
  [1, 0, 0],
  [0, 1, 0]
)

const orthographicProjection = (matrix) => {
  // Add scene offset (mostly center)
  return Matrix.addVector(
    // Remove y axis
    Matrix.multiply(
      convert2dTo3d,
      matrix
    ),
    scene.offset
  )
}

let camera = Vector(100, 0, 0)

let d = 300

const perspectiveProjection = (matrix) => {
  const [cX, cY, cZ] = camera

  return (
    Matrix.addVector(
      Matrix.fromColumns(
        Matrix
        .columns(matrix)
        .map(([x, y, z]) => {
          const t = (cX - x) / d

          // Původně mi vyšlo mínus v: camera.y - (...)
          // Ale tím se osy posouvaly opačně, takže jsem to otočil na plus :)
          return [
            (cY - y) / t,
            (cZ - z) / t
          ]
        })
      ),
      addVectors(
        scene.offset,
        Vector(cY, cZ)
      )
    )
  )
}

// Initialize scene
const scene = new Scene(canvas, {
  offset:     Vector(winWidth / 2, winHeight / 2),
  // projection: orthographicProjection
  projection: perspectiveProjection
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

  scene.offset = Vector(winWidth / 2, winHeight / 2)

  scene.mesh(white)
})

// WavefronModel
let   headCenter = Vector(0, 0, 0)
const head       = new WavefrontModel(headSource)

// Zoom in
head.scale(50, headCenter)
// Rotate corectly
// TODO why is head rotated upside down?
head.rotate(Math.PI / 2, Math.PI / 2, headCenter)

scene.add(head)

const render = () => {
  scene.mesh(white)
}

const step = () => {
  render()

  head.rotate(
    Math.PI / 200,
    Math.PI / 100,
    headCenter
  )

  requestAnimationFrame(step)
}

// step()

render()

let isMousedown = false
let lastMouseX
let lastMouseY
let pendingMouseX
let pendingMouseY

document.addEventListener('mousedown', (event) => {
  isMousedown = true
  lastMouseX  = event.clientX
  lastMouseY  = event.clientY
})

document.addEventListener('mouseup', () => isMousedown = false )

let pendingFrame

const mousemoveStep = () => {
  const targetMouseX = pendingMouseX
  const targetMouseY = pendingMouseY

  var theta = (targetMouseX - lastMouseX) * Math.PI / -360
  var phi = (targetMouseY - lastMouseY) * Math.PI / 180

  head.rotate(
    theta,
    phi,
    headCenter
  )

  lastMouseX = targetMouseX
  lastMouseY = targetMouseY

  render()

  pendingFrame = undefined
}

document.addEventListener('mousemove', (event) => {
  pendingMouseX = event.clientX
  pendingMouseY = event.clientY

  if(isMousedown && !pendingFrame) {
    pendingFrame = requestAnimationFrame(mousemoveStep)
  }
})


document.addEventListener('mousewheel', (event) => {
  const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

  camera = addVectors(camera, Vector(delta, 0, 0))

  render()

  event.preventDefault()
})
