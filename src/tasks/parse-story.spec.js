/* eslint-env jest */

import parseStory from './parse-story'

const rooms =`
title: title
id: id
left:
  link: link-left
  text: text-left
right:
  link: link-right
  text: text-right
---
This is the body.
---
title: title
id: id
left:
  link: link-left
  text: text-left
right:
  link: link-right
  text: text-right
---
This is the body.
`
const jsonExample = {
  title: 'title',
  id: 'id',
  body: 'This is the body.',
  left: {
    link: 'link-left',
    text: 'text-left'
  },
  right: {
    link: 'link-right',
    text: 'text-right'
  }
}

describe('parseStory', () => {
  it('returns an array', () => {
    const parsed = parseStory(rooms)
    expect(Array.isArray(parsed)).toEqual(true)
  })
  it('parses the right number of objects from the story example', () => {
    const parsed = parseStory(rooms)
    expect(parsed.length).toEqual(2)
  })
  it('each parsed card has the right properties and values', () => {
    const parsed = parseStory(rooms)
    parsed.forEach(card => {
      expect(card).toEqual(jsonExample)
    })
  })
})
