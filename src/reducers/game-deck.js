import * as types from '../actions/types'
import * as actions from '../actions'
import defaultCard from './default-card'
import cardReducer from './card'

const defaultState = {
  cards: [
    defaultCard
  ]
}

function updateCurrentCard (currentCard, updates) {
  // transform an updateCurrentCard action into an updateCard action
  const newUpdates = { ...updates, id: currentCard.id }
  const updateCard = actions.updateCard(newUpdates)
  const updated = cardReducer(currentCard, updateCard)
  return updated
}
export default function (state = defaultState, action = {}) {
  switch (action.type) {
    case types.UPDATE_CURRENT_CARD: {
      const updatedCard = updateCurrentCard(state.cards[0], action.updates)
      const cards = [updatedCard, ...state.cards.slice(1)]
      const newState = { ...state, cards }
      return newState
    }
    case types.REMOVE_CARD: {
      const cards = state.cards.filter(card => card.id !== action.id)
      return { ...state, cards }
    }
    case types.GET_NEXT_CARD: {
      throw new Error('not implemented yet')
    }
    default:
      return state
  }
}
