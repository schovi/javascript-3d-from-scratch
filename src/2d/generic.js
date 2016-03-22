export default class Generic {
  addToScene(scene) {
    scene.add(this)
  }

  removeFromScene() {
    this.scene.remove(this)
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
