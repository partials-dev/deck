import * as types from '../actions/types'
import * as actions from '../actions'
import defaultCard from './default-card'
import cardReducer from './card'

const defaultState = {
  cards: [
    defaultCard
  ]
}

const matches = card => otherCard => card.id === otherCard.id

export default function gameDeck (state = defaultState, action = {}) {
  switch (action.type) {
    case types.UPDATE_CURRENT_CARD: {
      const newUpdates = { ...action.updates, id: state.cards[0].id }
      const updateCard = actions.updateCard(newUpdates)
      return gameDeck(state, updateCard)
    }
    case types.UPDATE_CARD: {
      const index = state.cards.findIndex(matches(action.updates))
      const card = state.cards[index]
      const updatedCard = cardReducer(card, action)

      const newCards = state.cards.slice()
      newCards[index] = updatedCard
      const newState = { ...state, cards: newCards }
      return newState
    }
    case types.REMOVE_CARD: {
      const isCardToRemove = ({ id }) => id === action.id
      const indexToRemove = state.cards.findIndex(isCardToRemove)
      const isIndexToKeep = (_, index) => index !== indexToRemove
      const cards = state.cards.filter(isIndexToKeep)

      return { ...state, cards }
    }
    case types.APPEND_CARD: {
      const cards = [...state.cards, action.card]
      return { ...state, cards }
    }
    default:
      return state
  }
}
