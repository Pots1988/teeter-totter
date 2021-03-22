import {
  MIN_RECTANLGE_RATIO,
  MAX_RECTANGLE_RATIO,
  MIN_TRIANGLE_BOTTOM_SIZE,
  MAX_TRIANGLE_BOTTOM_SIZE
} from '@/constants'
import { randomInteger } from '@/utils'

const getCircle = (square) => {
  const width = 2 * Math.ceil(Math.sqrt(square / Math.PI))

  return {
    width,
    style: {
      width: `${width}px`,
      height: `${width}px`
    }
  }
}

const getRectangle = (square) => {
  const ratio = randomInteger(MIN_RECTANLGE_RATIO, MAX_RECTANGLE_RATIO)
  const long = ratio * Math.ceil(Math.sqrt(square / ratio))
  const short = Math.ceil(square / long)
  const isWidthLonger = randomInteger(0, 1)
  const width = isWidthLonger ? long : short
  const height = !isWidthLonger ? long : short

  return {
    width,
    style: {
      width: `${width}px`,
      height: `${height}px`
    }
  }
}

const getTriangle = (square) => {
  const width = randomInteger(MIN_TRIANGLE_BOTTOM_SIZE, MAX_TRIANGLE_BOTTOM_SIZE)
  const height = square / (0.5 * width)

  return {
    width,
    style: {
      borderBottom: `${height}px solid currentColor`,
      borderLeft: `${width / 2}px solid transparent`,
      borderRight: `${width / 2}px solid transparent`,
      backgroundColor: 'transparent'
    }
  }
}

export const getShapeFromSquare = (type = 'circle', square) => {
  switch (type) {
    case 'rectangle': return getRectangle(square)
    case 'triangle': return getTriangle(square)
    default: return getCircle(square)
  }
}
