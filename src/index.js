import './index.css'
import Canvas from './render/canvas.js'
import {white, red, green, blue, black} from './color'

// 2D
import Scene from './2d/scene'
import Vertex from './2d/vertex'
import Line from './2d/line'

// App
const canvas = new Canvas({
  canvas: document.getElementById("canvas"),
  width : window.innerWidth,
  height: window.innerHeight,
  ratio : 1
})

const scene = new Scene(canvas)
const line1 = new Line(new Vertex(17, 29), new Vertex(293, 130))
const line2 = new Line(new Vertex(293, 130), new Vertex(33, 11))
const line3 = new Line(new Vertex(56, 12), new Vertex(99, 111))
line1.addToScene(scene)
line2.addToScene(scene)
line3.addToScene(scene)

scene.render(white)
