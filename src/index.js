import './index.css'
import Canvas from './render/canvas.js'
import {white, red, green, blue, black} from './color'

// 2D
import Scene   from './2d/scene'
import Vertex  from './2d/vertex'
import Circle  from './2d/circle'
import Square  from './2d/square'
import Polygon from './2d/polygon'

// App
const canvas = new Canvas({
  canvas: document.getElementById("canvas"),
  width : window.innerWidth,
  height: window.innerHeight,
  ratio : 1
})

const scene = new Scene(canvas)

const polygon = new Polygon(new Vertex(17, 73), new Vertex(293, 130), new Vertex(33, 11))
const circle  = new Circle(new Vertex(200, 200), 80)
const square  = new Square(new Vertex(300, 200), 90)

// scene.add(square)
scene.add(polygon, circle, square)

const step = () => {
  scene.render(white)

  // polygon.translate(1, 0)
  circle.translate(1, 2)

  polygon.rotate(-1)
  square.rotate(1, new Vertex(200, 200))

  requestAnimationFrame(step)
}

step()
