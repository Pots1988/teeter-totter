import { randomInteger } from '@/utils'

export const randomPosition = (boardWidth, shapeWidth, isAi) => {
  const leftSide = isAi ? boardWidth / 2 : 0
  const rightSide = (isAi ? boardWidth : boardWidth / 2) - shapeWidth
  const left = randomInteger(leftSide, rightSide)

  return left
}
