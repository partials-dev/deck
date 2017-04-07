import { combineReducers } from 'redux'
import * as types from '../actions/types'
import * as actions from '../actions'
import screen from './screen'
import gameDeck from './game-deck'
// import getLeanDirectionFor from './get-lean-direction-for'

const combined = combineReducers({ gameDeck, screen })

function resetCardPosition (state) {
  const currentCard = state.gameDeck.cards[0]
  const screenWidth = state.screen.size.width
  const screenHeight = state.screen.size.height
  const cardWidth = currentCard.size.width
  const cardHeight = currentCard.size.height

  if (screenWidth == null || screenHeight == null) {
    throw new Error('Screen dimensions must have already been set.')
  }

  if (cardWidth == null || cardHeight == null) {
    throw new Error('Card dimensions must have already been set.')
  }

  const position = {
    x: Math.round((screenWidth - cardWidth) / 2),
    y: Math.round((screenHeight - cardHeight) / 2)
  }

  const initialPosition = position
  const updateCurrentCard = actions.updateCurrentCard({ position, initialPosition })
  const deck = gameDeck(state.gameDeck, updateCurrentCard)
  return { ...state, gameDeck: deck }
}

export default function rootReducer (state, action = {}) {
  switch (action.type) {
    case types.RESET_CURRENT_CARD_POSITION:
      return resetCardPosition(state, action)
    case types.RESET_CARD_POSITION:
      return resetCardPosition(state, action)
    default:
      return combined(state, action)
  }
}
