import Polygon2d   from '../2d/polygon'
import * as utils  from '../utils'
import Vector      from '../utils/vector'
import * as Matrix from '../utils/matrix'

export default class Polygon extends Polygon2d {
  // 3d rotation
  // https://en.m.wikipedia.org/wiki/Rotation_matrix
  // http://inside.mines.edu/fs_home/gmurray/ArbitraryAxisRotation/
  // https://stackoverflow.com/questions/14607640/rotating-a-vector-in-3d-space
  rotate(theta, phi, center) {
    center = center || this.center

    // Rotation matrix coefficients
    const ct = Math.cos(theta)
    const st = Math.sin(theta)
    const cp = Math.cos(phi)
    const sp = Math.sin(phi)

    const [centerX, centerY, centerZ] = center

    this.matrix = Matrix.mapColumns(this.matrix, ([x, y, z]) => {
      x = x - centerX
      y = y - centerY
      z = z - centerZ

      return [
        ct * x - st * cp * y + st * sp * z + centerX,
        st * x + ct * cp * y - ct * sp * z + centerY,
        sp * y + cp * z + centerZ
      ]
    })
  }
}
