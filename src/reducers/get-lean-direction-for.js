const getLeanDirectionFor = (position, initialPosition) => {
  const relativeX = position.x - initialPosition.x
  if (relativeX < 0) return 'left'
  if (relativeX > 0) return 'right'
  return 'middle'
}

export default getLeanDirectionFor
