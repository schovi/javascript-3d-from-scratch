import * as Matrix from './utils/matrix'

const matrix = Matrix.fromColumns([[1,2,3], [4,20,30]])
const identityMatrix = Matrix.identity(5,5)
const zeroMatrix = Matrix.zero(5,5)

const m1 = Matrix.create([[1,2],[3,4]])
const m2 = Matrix.create([[5,6], [7,8]])
const multipliedMatrix = Matrix.multiply(m1, m2)

const empty1 = Matrix.empty(3,0)
const empty2 = Matrix.empty(0,3)
const multipliedEmptyMatrices = Matrix.multiply(empty1, empty2)

// Matrix.prettyPrint(
//   Matrix.multiply(
//     Matrix.create([2,4],[6,8]),
//     Matrix.identity(2)
//   )
// )

Matrix.prettyPrint(
  Matrix.multiply(
    Matrix.create([1, -1, 2], [0, -3, 1]),
    Matrix.fromColumns([2, 1, 0])
  )
)
