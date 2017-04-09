import * as types from '../actions/types'
import * as actions from '../actions'
import defaultCard from './default-card'
import cardReducer from './card'
import story from '../story.json'

const defaultState = {
  cards: [
    // defaultCard
  ],
  replacements: {

  }
}

const matches = card => otherCard => card.id === otherCard.id
const tryGetReplacement = (card, replacements) => {
  const replacementId = replacements[card.id]
  if (replacementId) {
    const replacement = story.find(card => card.id === replacementId)
    return {
      ...defaultCard,
      ...replacement
    }
  } else {
    return card
  }
}

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
      const cardToAppend = tryGetReplacement(action.card, state.replacements)
      state.cards.forEach(card => {
        if (card.id === cardToAppend.id) {
          throw new Error('Ids must be unique.')
        }
      })
      const cards = [...state.cards, cardToAppend]
      return { ...state, cards }
    }
    default:
      return state
  }
}
