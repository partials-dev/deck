/* eslint-env jest */

import currentCard, { cardProperties } from './current-card'
import * as actions from '../actions'

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
  const card = currentCard()
  expectToBeACard(card)
})

Object.keys(actions).map(key => actions[key]).forEach(actionCreator => {
  test(`${actionCreator.name}() doesn't mutate the current card`, () => {
    const action = actionCreator()
    const firstCard = currentCard()
    const nextCard = currentCard(firstCard, action)
    if (firstCard === nextCard) {
      // State hasn't changed. All fields should be the same.
      expect(firstCard).toEqual(nextCard)
    } else {
      expect(firstCard).not.toBe(nextCard)
    }
  })
})

describe('getNextCard()', () => {
  it('generates a different card', () => {
    const firstCard = currentCard()
    const nextCard = currentCard(firstCard, actions.getNextCard())
    expect(nextCard).not.toBe(firstCard)
  })
  it('generates a card', () => {
    const firstCard = currentCard()
    const nextCard = currentCard(firstCard, actions.getNextCard())
    expectToBeACard(nextCard)
  })
})

describe('updateCurrentCard()', () => {
  it('updates the fields of the current card', () => {
    const firstCard = currentCard()
    const action = actions.updateCurrentCard({ id: 'test' })
    const nextCard = currentCard(firstCard, action)
    expect(firstCard.id).not.toEqual(nextCard.id)
    expect(nextCard.id).toEqual('test')
  })
})
