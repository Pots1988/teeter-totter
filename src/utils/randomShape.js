import { randomInteger } from './randomInteger'
import { randomColor } from './randomColor'
import { getShapeFromSquare } from './getShapeFromSquare'

import {
  TYPES,
  MIN_WEIGHT,
  MAX_WEIGHT,
  MIN_SQUARE
} from '@/constants'

let zIndex = 1

export const randomShape = () => {
  const color = randomColor()
  const weight = randomInteger(MIN_WEIGHT, MAX_WEIGHT)
  const type = TYPES[randomInteger(0, TYPES.length - 1)]
  const shapeSquare = weight * MIN_SQUARE
  const randomShape = getShapeFromSquare(type, shapeSquare)

  return {
    weight,
    id: Date.now(),
    type,
    shapeSquare,
    randomShape,
    style: {
      backgroundColor: color,
      color,
      zIndex: zIndex++,
      ...randomShape.style
    },
    width: randomShape.width,
    top: 0
  }
}
