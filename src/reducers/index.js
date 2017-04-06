import { combineReducers } from 'redux'
import * as types from '../actions/types'
import currentCard from './current-card'
import screen from './screen'
import getLeanDirectionFor from './get-lean-direction-for'

const combined = combineReducers({ currentCard, screen })

function resetCurrentCardPosition (state) {
  const screenWidth = state.screen.size.width
  const screenHeight = state.screen.size.height
  const cardWidth = state.currentCard.size.width
  const cardHeight = state.currentCard.size.height

  if (screenWidth == null || screenHeight == null) {
    throw new Error('Screen dimensions must be defined.')
  }

  if (cardWidth == null || cardHeight == null) {
    throw new Error('Card dimensions must be defined.')
  }

  const position = {
    x: Math.round((screenWidth - cardWidth) / 2),
    y: Math.round((screenHeight - cardHeight) / 2)
  }

  const initialPosition = position
  const leanDirection = getLeanDirectionFor(position, initialPosition)
  const currentCard = {
    ...state.currentCard,
    position,
    initialPosition,
    leanDirection
  }
  return { ...state, currentCard }
}

export default function rootReducer (state, action = {}) {
  switch (action.type) {
    case types.RESET_CURRENT_CARD_POSITION:
      return resetCurrentCardPosition(state, action)
    default:
      return combined(state, action)
  }
}
