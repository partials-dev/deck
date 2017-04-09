/* eslint-env jest */

import rootReducer from './index'
import * as actions from '../actions'
import defaultCard from './default-card'

function applyActions (reducer, actions, startingState) {
  return actions.reduce(reducer, startingState)
}

const screenSize = { width: 8, height: 4 }
const cardSize = { width: 4, height: 2 }

const updateScreen = actions.updateScreen({ size: screenSize })
const updateCurrentCard = actions.updateCurrentCard({ size: cardSize })
const resetCurrentCardPosition = actions.resetCurrentCardPosition()

const appends = [0, 1, 2].map(id => actions.appendCard({ ...defaultCard, id }))
const idToUpdate = 1
const updateCard = actions.updateCard({ id: idToUpdate, size: cardSize })
const resetCardPosition = actions.resetCardPosition(idToUpdate)

describe('root reducer', () => {
  describe('resetCurrentCardPosition()', () => {
    it('resets the current card position', () => {
      const actionList = [...appends, updateScreen, updateCurrentCard, resetCurrentCardPosition]
      const finalState = applyActions(rootReducer, actionList)
      const currentCard = finalState.gameDeck.cards[0]

      const expectedPosition = { x: -2, y: -1 }
      expect(currentCard.position).toEqual(expectedPosition)
      expect(currentCard.initialPosition).toEqual(expectedPosition)
    })
    it("throws an error if the card size hasn't been sent", () => {
      // don't set card size before trying to reset card position
      const actionList = [...appends, updateScreen, resetCurrentCardPosition]
      const applyInvalidActions = () => applyActions(rootReducer, actionList)
      expect(applyInvalidActions).toThrow('Card dimensions must have already been set.')
    })
    it("throws an error if the screen size hasn't been sent", () => {
      // don't set card size before trying to reset card position
      const actionList = [...appends, updateCurrentCard, resetCurrentCardPosition]
      const applyInvalidActions = () => applyActions(rootReducer, actionList)
      expect(applyInvalidActions).toThrow('Screen dimensions must have already been set.')
    })
  })
  describe('resetCardPosition()', () => {
    it('resets the specified card position', () => {
      const actionList = [...appends, updateScreen, updateCard, resetCardPosition]
      const finalState = applyActions(rootReducer, actionList)
      const isCardToUpdate = ({ id }) => id === idToUpdate
      const updated = finalState.gameDeck.cards.find(isCardToUpdate)
      const expectedPosition = { x: -2, y: -1 }

      expect(updated.position).toEqual(expectedPosition)
      expect(updated.initialPosition).toEqual(expectedPosition)
    })
    it("throws an error if the card size hasn't been sent", () => {
      // don't set card size before trying to reset card position
      const actionList = [...appends, updateScreen, resetCardPosition]
      const applyInvalidActions = () => applyActions(rootReducer, actionList)
      expect(applyInvalidActions).toThrow('Card dimensions must have already been set.')
    })
    it("throws an error if the screen size hasn't been sent", () => {
      // don't set card size before trying to reset card position
      const actionList = [...appends, updateCard, resetCardPosition]
      const applyInvalidActions = () => applyActions(rootReducer, actionList)
      expect(applyInvalidActions).toThrow('Screen dimensions must have already been set.')
    })
  })
  describe('swipeDown()', () => {
    it('should go to the previous card if showInstrument is false', () => {
      const card = { id: 'a-card-id' }
      const first = rootReducer()
      expect(first.music.showInstrument).toEqual(false)
      const next = rootReducer(first, actions.swipeDown(card))
      expect(next.gameDeck.cards[0]).toEqual(card)
    })
  })
})
