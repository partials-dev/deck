export const MIDDLE_RADIUS = 150 / 2

export const SIDES = {
  LEFT: 'left',
  RIGHT: 'right',
  MIDDLE: 'middle',
  UP: 'up',
  DOWN: 'down'
}

const getLeanDirectionFor = (position, initialPosition) => {
  const relativeX = position.x - initialPosition.x
  const relativeY = position.y - initialPosition.y
  if (relativeY < -MIDDLE_RADIUS) return SIDES.UP
  if (relativeY > MIDDLE_RADIUS) return SIDES.DOWN
  if (relativeX < -MIDDLE_RADIUS) return SIDES.LEFT
  if (relativeX > MIDDLE_RADIUS) return SIDES.RIGHT
  return SIDES.MIDDLE
}

export default getLeanDirectionFor
