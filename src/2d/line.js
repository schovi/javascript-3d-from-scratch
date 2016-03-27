export default class Line {
  constructor(v1, v2) {
    this.v1 = v1
    this.v2 = v2
  }

  render(scene, color) {
    scene.renderLine(this.v1.x, this.v1.y, this.v2.x, this.v2.y, color)
  }
}
