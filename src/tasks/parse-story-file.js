const parseStory = require('./parse-story')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const data = chalk.gray
const info = chalk.bold.blue

console.log(info('Reading ./story.txt\n'))
const storyTxtPath = path.join(__dirname, 'story.txt')
const story = fs.readFileSync(storyTxtPath, 'utf8')

console.log(data(story))

console.log(info('\nParsing story.'))
const parsed = parseStory(story)

console.log(info('Stringifying JSON.\n'))
const jsonString = JSON.stringify(parsed, null, 2)
console.log(data(jsonString))

const storyJsPath = path.join(__dirname, '../story.json')
console.log(info(`Saving JSON to ${storyJsPath}.`))
fs.writeFileSync(storyJsPath, jsonString)
console.log(info('Done.'))
