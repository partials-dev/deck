export const MIDDLE_RADIUS = 200 / 2

export const SIDES = {
  LEFT: 'left',
  RIGHT: 'right',
  MIDDLE: 'middle'
}

const getLeanDirectionFor = (position, initialPosition) => {
  const relativeX = position.x - initialPosition.x
  if (relativeX < -MIDDLE_RADIUS) return SIDES.LEFT
  if (relativeX > MIDDLE_RADIUS) return SIDES.RIGHT
  return SIDES.MIDDLE
}

export default getLeanDirectionFor
