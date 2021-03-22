import { SWING_LENGTH, G } from '@/constants'

const convertPxToMeters = (itemPosition, boardWidth) => {
  return itemPosition * SWING_LENGTH / boardWidth
}

const distanceFromCenterInMeters = (itemPosition, boardWidth) => Math.abs(
  convertPxToMeters(itemPosition, boardWidth) - SWING_LENGTH / 2
)

export const calculateForce = (items, boardWidth) => Math.floor(
  items.reduce((prev, item) => {
    const { width, weight, left } = item
    const itemCenter = width / 2 + left
    const itemWeight = weight * G

    const itemForce = distanceFromCenterInMeters(itemCenter, boardWidth) * itemWeight

    return prev + itemForce
  }, 0)
)
