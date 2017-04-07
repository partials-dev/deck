/* eslint-env jest */

import gameDeck from './game-deck'
import * as actions from '../actions'
import { SIDES } from './get-lean-direction-for'

describe('gameDeck', () => {
  describe('updateCurrentCard()', () => {
    it('updates the fields of the current card', () => {
      const first = gameDeck()
      const firstCard = first.cards[0]
      const newTitle = firstCard.title + '!'
      const action = actions.updateCurrentCard({ title: newTitle })

      const next = gameDeck(first, action)
      expect(first.cards[0].title).not.toEqual(next.cards[0].title)
      expect(next.cards[0].title).toEqual(newTitle)
    })
  })
  it('should include cards in the default state', () => {
    const first = gameDeck()
    expect(first.cards.length).toBeGreaterThan(0)
    first.cards.forEach(card => expect(card).toEqual(expect.anything()))
  })
  describe('removeCard()', () => {
    it('should remove the card with the specified id', () => {
      const first = gameDeck()
      const cardToRemove = first.cards[0]
      expect(cardToRemove).toEqual(expect.anything())

      const removeCard = actions.removeCard({ id: cardToRemove.id, side: SIDES.LEFT })
      const next = gameDeck(first, removeCard)
      const nextIds = next.cards.map(card => card.id)
      expect(nextIds).not.toContain(cardToRemove.id)
    })
  })
  describe('getNextCard()', () => {
    it.skip('generates a different card', () => {
      const firstCard = cardReducer()
      const nextCard = cardReducer(firstCard, actions.getNextCard())
      expect(nextCard).not.toBe(firstCard)
    })
    it.skip('generates a card', () => {
      const firstCard = cardReducer()
      const nextCard = cardReducer(firstCard, actions.getNextCard())
      expectToBeACard(nextCard)
    })
  })
})
