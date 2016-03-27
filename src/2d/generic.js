export default class Generic {
  addToScene(scene) {
    scene.add(this)
  }

  removeFromScene() {
    this.scene.remove(this)
  }

  mesh() {
    this._missingFunction('mesh')
  }

  render() {
    this._missingFunction('render')
  }

  translate() {
    this._missingFunction('translate')
  }

  rotate() {
    this._missingFunction('rotate')
  }

  _missingFunction(fun) {
    console.error(`Implement '${fun}' on '${this.constructor.name}'`)
  }
}
