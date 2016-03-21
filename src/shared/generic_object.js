export default class GenericObject {
  addToScene(scene) {
    scene.objects.push(this)
    this.scene = scene
  }

  removeFromScene() {
    const sceneObjects = this.scene.objects
    const index = sceneObjects.findIndex(self)
    sceneObjects.slice(index, 1)
    delete this.scene
  }

  render() {
    throw `Implement 'render' on '${this.constructor.name}'`
  }
}
