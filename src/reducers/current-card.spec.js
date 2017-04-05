/* eslint-env jest */

import currentCard from './current-card'
import * as actions from '../actions'

const cardProperties = [
  'id',
  'title',
  'text'
]

const expectToBeACard = object => {
  cardProperties.forEach(prop => {
    expect(object).toHaveProperty(prop)
  })
}

test('the starting value is a card', () => {
  const card = currentCard()
  expectToBeACard(card)
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
