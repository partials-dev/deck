const yaml = require('js-yaml')

module.exports = function parseStory (string) {
  const sections = string.split(/-+\n/g)
  const cards = []
  for (var i = 0; i < sections.length; i += 2) {
    const properties = sections[i].trim()
    const body = sections[i + 1].trim()
    const card = yaml.safeLoad(properties)
    cards.push(Object.assign({}, card, { body }))
  }
  return cards
}
