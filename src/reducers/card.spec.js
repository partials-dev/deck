/* eslint-env jest */

import cardReducer, { cardProperties } from './card'
import * as actions from '../actions'
import { MIDDLE_RADIUS } from './get-lean-direction-for'

const expectToBeACard = thing => {
  // should have all card properties
  cardProperties.forEach(prop => {
    expect(thing).toHaveProperty(prop)
  })
  // should have only card properties
  Object.keys(thing).forEach(thingProp => {
    expect(cardProperties).toContain(thingProp)
  })
}

test('the starting value is a card', () => {
  const card = cardReducer()
  expectToBeACard(card)
})

describe('updateCard()', () => {
  fit('updates the fields of a card', () => {
    const firstCard = cardReducer()
    const newTitle = firstCard.title + '!'
    const action = actions.updateCard({ id: 'start', title: newTitle })
    const nextCard = cardReducer(undefined, action)

    expect(firstCard.title).not.toEqual(nextCard.title)
    expect(nextCard.title).toEqual(newTitle)
  })
  it('should compute right lean properly', () => {
    const firstCard = cardReducer()
    const position = { x: MIDDLE_RADIUS + 1, y: 0 }
    const initialPosition = { x: 0, y: 0 }
    const action = actions.updateCurrentCard({ position, initialPosition })
    const nextCard = cardReducer(firstCard, action)
    expect(nextCard.leanDirection).toEqual('right')
  })
  it('should compute left lean properly', () => {
    const firstCard = cardReducer()
    const position = { x: -MIDDLE_RADIUS - 1, y: 0 }
    const initialPosition = { x: 0, y: 0 }
    const action = actions.updateCurrentCard({ position, initialPosition })
    const nextCard = cardReducer(firstCard, action)
    expect(nextCard.leanDirection).toEqual('left')
  })
  it('should compute middle lean properly', () => {
    const firstCard = cardReducer()
    const position = { x: MIDDLE_RADIUS - 1, y: 0 }
    const initialPosition = { x: 0, y: 0 }
    const action = actions.updateCurrentCard({ position, initialPosition })
    const nextCard = cardReducer(firstCard, action)
    expect(nextCard.leanDirection).toEqual('middle')
  })
})
