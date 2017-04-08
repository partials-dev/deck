const parseDirectory = require('parse-dir')
const frontMatter = require('front-matter')

function validate () {

}

parseDirectory('./cards/**/*.md', (err, files) => {
  if (err) {
    throw err
  }

  const cards = files.map(file => frontMatter(file.contents))
  validate(cards)
  console.log(JSON.stringify(cards))
})
