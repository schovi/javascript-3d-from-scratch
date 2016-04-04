//////////////////
// Creating of vectors
export const fromLine = (line) => {
  // Subtract end coord from start coord
  return build(line[0].map((coord, i) => coord - line[1][i]))
}

export const build = (...coords) => {
  coords = [].concat(...coords)

  coords.vector = true
  coords.size   = coords.length

  Object.freeze(coords)

  return coords
}

export const create = build

export default build
//////////////////
// Operations
export const add = (vectors, ...rest) => {
  if(!Array.isArray(vectors[0])) {
    vectors = [vectors].concat(rest)
  }

  // Validate same size
  vectors.reduce((v1, v2) => {
    if(v1.size === v2.size) { return v1 }
    throw("Can't add vectors with different size")
  })

  const vectorCoords = []
  const vectorsCount = vectors.length
  const size         = vectors[0].size

  for(let i = 0; i < size; i++) {
    let sum = 0

    for(let vectorIndex = 0; vectorIndex < vectorsCount; vectorIndex++) {
      sum += vectors[vectorIndex][i]
    }

    vectorCoords[i] = sum
  }

  return build(vectorCoords)
}

export const addNumber = (vector, ...numbers) => {
  const numbersSum = numbers.reduce((a, b) => a+b, 0)

  return map(vector, (coord) => coord + numbersSum)
}

export const subtract = (vectors, ...rest) => {
  if(!Array.isArray(vectors[0])) {
    vectors = [vectors].concat(rest)
  }

  // Validate same size
  vectors.reduce((v1, v2) => {
    if(v1.size === v2.size) { return v1 }
    throw("Can't subtract vectors with different size")
  })

  const vectorCoords = []
  const vectorsCount = vectors.length
  const size         = vectors[0].size

  for(let i = 0; i < size; i++) {
    let sum = 0

    for(let vectorIndex = 0; vectorIndex < vectorsCount; vectorIndex++) {
      sum -= vectors[vectorIndex][i]
    }

    vectorCoords[i] = sum
  }

  return build(vectorCoords)
}

export const subtractNumber = (vector, ...numbers) => {
  const numbersSum = numbers.reduce((a, b) => a - b, 0)

  return map(vector, (coord) => coord - numbersSum)
}


export const map = (vector, mapper) => {
  return build(vector.map(mapper))
}
