const parseDirectory = require('parse-dir')
const frontMatter = require('front-matter')

function validate () {

}

const currentDirectory = __dirname
parseDirectory(currentDirectory + '/cards/**/*.md', (err, files) => {
  if (err) {
    throw err
  }

  console.log(JSON.stringify(files))

  const cards = files.map(file => frontMatter(file.contents))
  cards.forEach(card => {
    card.body = card.body.trim()
  })

  validate(cards)
  console.log(JSON.stringify(cards, undefined, 2))
})
