const MIDDLE_RADIUS = 200 / 2

const getLeanDirectionFor = (position, initialPosition) => {
  const relativeX = position.x - initialPosition.x
  if (relativeX < -MIDDLE_RADIUS) return 'left'
  if (relativeX > MIDDLE_RADIUS) return 'right'
  return 'middle'
}

export default getLeanDirectionFor
