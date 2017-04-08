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
      cardToRemove.id = 'remove card test id'
      expect(cardToRemove).toEqual(expect.anything())

      const removeCard = actions.removeCard({ id: cardToRemove.id, side: SIDES.LEFT })
      const next = gameDeck(first, removeCard)
      const nextIds = next.cards.map(card => card.id)
      expect(nextIds).not.toContain(cardToRemove.id)
    })
  })

  describe('appendCard()', () => {
    it('should append the card to the end of the deck', () => {
      const cardToAppend = { id: 'card to append', title: 'hi' }
      const appendCard = actions.appendCard(cardToAppend)
      const next = gameDeck(undefined, appendCard)
      const lastCard = next.cards[next.cards.length - 1]
      expect(lastCard).toEqual(cardToAppend)
    })
    it('should throw an error if you try to append multiple cards with the same id', () => {
      const cardToAppend = { id: 'card to append', title: 'hi' }
      const appendCard = actions.appendCard(cardToAppend)
      const first = gameDeck(undefined, appendCard)
      const invalidAction = () => gameDeck(first, appendCard)
      expect(invalidAction).toThrow('Ids must be unique.')
    })
  })
})
