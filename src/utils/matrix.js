// Sources
// https://legends2k.github.io/2d-transforms-101/#/

// Internal storage is array per row
//
// Matrix indexing
// 0,0|0,1|0,2
// 1,0|1,1|1,2
//
// get 2nd row and 3rd column
// matrix[1][2]
//
// get 1rd row and 2st column
// matrix[0][2]

//////////////////
// Matrix creators
export const fromRows = (rows, ...rest) => {
  if(!Array.isArray(rows[0])) {
    rows = [rows].concat(rest)
  }

  const rowsLen = rows.length
  const colsLen = rows[0].length

  return build(rowsLen, colsLen, (row, col) => rows[row][col])
}

export const create = fromRows

export default fromRows

// Create matrix from given columns
export const fromColumns = (columns, ...rest) => {
  if(!Array.isArray(columns[0])) {
    columns = [columns].concat(rest)
  }

  const colsLen = columns.length
  const rowsLen = columns[0].length

  // TODO validate same column length
  return build(rowsLen, colsLen, (row, col) => columns[col][row])
}

// Zero matrix
// |0 0|
// |0 0|
export const zero = (rows, cols = rows) => {
  return build(rows, cols, () => 0)
}

// Identity (Unit) matrix
// |1 0|
// |0 1|
export const identity = (n) => {
  return build(n, n, (row, col) => row == col ? 1 : 0)
}

export const unit = identity

// Diagonal matrix from given values
// diagonal(10,20)
// |10  0|
// | 0 20|
export const diagonal = (...values) => {
  values = [].concat(values)

  return build(values.length, values.length, (row, col) => row === col ? values[row] : 0)
}

// Empty matrix (rows or columns)
// TODO: It is not 100%
export const empty = (rows, cols) => {
  if(rows !== 0 && cols !== 0) {
    throw("Can't create empty matrix. At least rows or columns must be 0")
  }

  return build(rows, cols, (row, col) => 0)
}

// Scalar matrix
// scalar(2, 42)
// |42  0|
// | 0 42|
export const scalar = (n, value) => {
  return build(n, n, (row, col) => row === col ? value : 0)
}

// For given number of rows and columns callback for each item in matrix
// Example: create matrix 2x2 with random numbers
// build(2,2, (row, col) => Math.random())
export const build = (rows, cols, filler) => {
  const matrix = []

  for(let row = 0; row < rows; row++) {
    matrix[row] = []

    for(let col = 0; col < cols; col++) {
      matrix[row][col] = filler && filler(row, col)
    }

    Object.freeze(matrix[row])
  }

  matrix.matrix = true
  matrix.rows = rows
  matrix.cols = matrix.columns = cols
  matrix.toString = () => pretty(matrix)

  Object.freeze(matrix)

  return matrix
}

export const clone = (matrix) => {
  return map(matrix, (value) => value)
}
//////////////////
// Matrix operations

// Transpose matrix over diagonal
// |1 2| > |1 3|
// |3 4| > |2 4|
export const transpose = (matrix) => {
  return build(matrix.cols, matrix.rows, (row, col) => matrix[col][row])
}

// Inverse matrix
export const invert = (matrix) => {
  if (matrix.rows !== matrix.cols) {
    throw("Only square matrix can be inverted")
  }

  // TODO
}

// Add
// Version supports 2 matrices
export const add = (m1, m2) => {
  if(m1.rows !== m2.rows || m1.cols !== m2.cols) {
    throw("Can't add matrices with different number of rows or columns")
  }

  return map(m1, (m1Value, i, j) => m1Value + m2[i][j])
}

// // Add
// // Experimental version supports 2 and more matrices
// export const add = (...matrices) => {
//   matrices.reduce((m1, m2) => {
//     if(m1.rows === m2.rows && m1.cols === m2.cols) { return m1 }
//     throw("Can't add matrices with different number of rows or columns")
//   })
//
//   return build(matrices[0].rows, matrices[0].cols, (row, col) => {
//     return sum(matrices.map((matrix) => matrix[row][col]))
//   })
// }

export const addVector = (matrix, vector) => {
  // if(matrix.rows !== vector.size) {
  //   throw("Matrix and Vector can be added only when matrix has same number of rows as vector size")
  // }

  return map(matrix, (value, i) => value + vector[i])
}

export const addNumber = (matrix, number) => {
  return map(matrix, (value) => value + number)
}

// Subtract
export const subtract = (m1, m2) => {
  if(m1.rows !== m2.rows || m1.cols !== m2.cols) {
    throw("Can't subtract matrices with different number of rows or columns")
  }

  return map(m1, (m1Value, i, j) => m1Value - m2[i][j])
}

export const subtractVector = (matrix, vector) => {
  if(matrix.rows !== vector.size) {
    throw("Matrix and Vector can be subtracted only when matrix has same number of rows as vector size")
  }

  return map(matrix, (value, i) => value - vector[i])
}

export const subtractNumber = (matrix, number) => {
  return map(matrix, (value) => value - number)
}

// Multiply
export const multiply = (m1, m2) => {
  if(m1.cols !== m2.rows) {
    throw("First matrix has different number of cols than second number of rows")
  }

  return build(m1.rows, m2.cols, (row, col) => {
    return sum(m1[row].map((m1Value, i) => m1Value * m2[i][col]))
  })
}

export const multiplyVector = multiply

export const multiplyNumber = (matrix, number) => {
  return map(matrix, (value) => value * number)
}

export const divide = (m1, m2) => {
  if(m1.cols !== m2.rows) {
    throw("First matrix has different number of cols than second number of rows")
  }
}

//////////////////
// Matrix helpers
export const columns = (matrix) => {
  const columns = []

  for(let col = 0; col < matrix.cols; col++) {
    columns[col] = []

    for(let row = 0; row < matrix.rows; row++) {
      columns[col][row] = matrix[row][col]
    }
  }

  return columns
}

export const forEach = (matrix, withEach) => {
  for(let i = 0; i < matrix.rows; i++) {
    for(let j = 0; j < matrix.cols; j++) {
      withEach(matrix[i][j], i, j)
    }
  }
}

export const map = (matrix, mapper) => {
  return build(matrix.rows, matrix.cols, (i, j) => {
    return mapper(matrix[i][j], i, j)
  })
}

export const mapColumns = (matrix, mapper) => {
  return fromColumns(
    columns(matrix).map(mapper)
  )
}

export const pretty = (matrix) => {
  const columnsLengths = transpose(matrix).map((column) => {
    return Math.max(...column.map((val) => `${val}`.length))
  })

  return matrix.map((row) => {
    return `|${row.map((val, col) => leftPad(val, columnsLengths[col])).join(" ")}|`
  }).join("\n")
}

export const prettyPrint = (matrix) => {
  console.log(pretty(matrix))
}

//////////////////
// Helpers
const sum = (...values) => {
  values = [].concat(...values)

  return values.reduce((acc, val) => acc + val, 0)
}

const leftPad = (content, len, str = " ") => {
  return Array(len - String(content).length + 1).join(str) + content
}
