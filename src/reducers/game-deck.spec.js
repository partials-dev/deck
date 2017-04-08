/* eslint-env jest */

import gameDeck from './game-deck'
import { updateCurrentCard, appendCard, removeCard } from '../actions'
import { SIDES } from './get-lean-direction-for'
import defaultCard from './default-card'

describe('gameDeck', () => {
  it('should have a cards property that\'s an array', () => {
    const state = gameDeck()
    expect(state).toHaveProperty('cards')
    const cardsIsArray = Array.isArray(state.cards)
    expect(cardsIsArray).toBe(true)
  })
  describe('updateCurrentCard()', () => {
    it('updates the fields of the current card', () => {
      const card = { ...defaultCard, id: 0, title: 'hi' }
      const append = appendCard(card)
      const first = gameDeck(undefined, append)
      const newTitle = card.title + '!'
      const update = updateCurrentCard({ title: newTitle })

      const next = gameDeck(first, update)
      expect(first.cards[0].title).not.toEqual(next.cards[0].title)
      expect(next.cards[0].title).toEqual(newTitle)
    })
  })
  describe('removeCard()', () => {
    it('should remove the card with the specified id', () => {
      const ids = [0, 1, 2, 3, 4]
      const appends = ids.map(id => appendCard({ ...defaultCard, id, title: 'hi' }))
      const first = appends.reduce(gameDeck, undefined) // apply all appends
      const cardToRemove = first.cards[2]
      expect(cardToRemove).toEqual(expect.anything())

      const remove = removeCard({ id: cardToRemove.id, side: SIDES.LEFT })
      const next = gameDeck(first, remove)
      const nextIds = next.cards.map(card => card.id)
      expect(nextIds).toEqual([0, 1, 3, 4])
      expect(nextIds).toHaveProperty('length', appends.length - 1)
    })
  })

  describe('appendCard()', () => {
    it('should append the card to the end of the deck', () => {
      const cardToAppend = { id: 'card to append', title: 'hi' }
      const append = appendCard(cardToAppend)
      const next = gameDeck(undefined, append)
      const lastCard = next.cards[next.cards.length - 1]
      expect(lastCard).toEqual(cardToAppend)
    })
    it('should throw an error if you try to append multiple cards with the same id', () => {
      const cardToAppend = { ...defaultCard, id: 0, title: 'hi' }
      const append = appendCard(cardToAppend)
      const first = gameDeck(undefined, append)
      const invalidAction = () => gameDeck(first, append)
      expect(invalidAction).toThrow('Ids must be unique.')
    })
  })
})
