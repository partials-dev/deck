/* eslint-env jest */

import rootReducer from './index'
import * as actions from '../actions'

function applyActions (reducer, actions) {
  const startingState = reducer()
  return actions.reduce(reducer, startingState)
}

const screenSize = { width: 8, height: 4 }
const cardSize = { width: 4, height: 2 }
const updateScreen = actions.updateScreen({ size: screenSize })
const updateCurrentCard = actions.updateCurrentCard({ size: cardSize })
const resetCurrentCardPosition = actions.resetCurrentCardPosition()

describe('resetCurrentCardPosition()', () => {
  it('resets the current card position', () => {
    const actionList = [updateScreen, updateCurrentCard, resetCurrentCardPosition]
    const finalState = applyActions(rootReducer, actionList)
    const currentCard = finalState.gameDeck.cards[0]

    const expectedPosition = { x: 2, y: 1 }
    expect(currentCard.position).toEqual(expectedPosition)
    expect(currentCard.initialPosition).toEqual(expectedPosition)
  })
  it("throws an error if the card size hasn't been sent", () => {
    // don't set card size before trying to reset card position
    const actionList = [updateScreen, resetCurrentCardPosition]
    const applyInvalidActions = () => applyActions(rootReducer, actionList)
    expect(applyInvalidActions).toThrow()
  })
  it("throws an error if the screen size hasn't been sent", () => {
    // don't set card size before trying to reset card position
    const actionList = [updateCurrentCard, resetCurrentCardPosition]
    const applyInvalidActions = () => applyActions(rootReducer, actionList)
    expect(applyInvalidActions).toThrow()
  })
})
