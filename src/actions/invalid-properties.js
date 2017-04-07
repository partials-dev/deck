export const isInvalid = validValues => value => validValues.indexOf(value) < 0
export const throwIfInvalidProperties = (type, obj, validProperties) => {
  const invalidProperties = Object.keys(obj).filter(isInvalid(validProperties))
  if (invalidProperties.length > 0) {
    const message = `These properties aren't permitted on a ${type}: ${invalidProperties.join(', ')}.`
    throw new Error(message)
  }
}
