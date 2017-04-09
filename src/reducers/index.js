import { combineReducers } from 'redux'
import * as types from '../actions/types'
import * as actions from '../actions'
import screen from './screen'
import gameDeck from './game-deck'
import music from './music'
// import getLeanDirectionFor from './get-lean-direction-for'

const combined = combineReducers({ gameDeck, screen, music })

function resetCardPosition (state, card) {
  const screen = state.screen
  const screenWidth = screen.size.width
  const screenHeight = screen.size.height
  const cardWidth = card.size.width
  const cardHeight = card.size.height

  if (screenWidth == null || screenHeight == null) {
    throw new Error('Screen dimensions must have already been set.')
  }

  if (cardWidth == null || cardHeight == null) {
    throw new Error('Card dimensions must have already been set.')
  }

  // const position = {
  //   x: Math.round((screenWidth - cardWidth) / 2),
  //   y: Math.round((screenHeight - cardHeight) / 2)
  // }
  const position = {
    x: -cardWidth / 2,
    // x: 0,
    y: -cardHeight / 2
  }

  const initialPosition = position
  const updateCard = actions.updateCard({ id: card.id, position, initialPosition })
  const deck = gameDeck(state.gameDeck, updateCard)
  return { ...state, gameDeck: deck }
}

export default function rootReducer (state, action = {}) {
  switch (action.type) {
    case types.RESET_CURRENT_CARD_POSITION:
      return resetCardPosition(state, state.gameDeck.cards[0])
    case types.RESET_CARD_POSITION:
      const card = state.gameDeck.cards.find(card => card.id === action.id)
      return resetCardPosition(state, card)
    case types.SWIPE_DOWN:
      if (!state.music.showInstrument) {
        const newState = {
          ...state,
          gameDeck: {
            ...state.gameDeck,
            cards: [action.previousCard]
          }
        }
        return combined(newState, action)
      } else {
        return combined(state, action)
      }
    case types.PLAY_NOTE:
      let newState = combined(state, action)
      if (newState.music.songIsScore) {
        let replacements = newState.gameDeck.replacements
        const song = state.gameDeck.cards[0].song
        replacements = {
          ...replacements,
          [song.replaceRoom]: song.with
        }
        const newGameDeck = {
          ...newState.gameDeck,
          replacements
        }
        newState = {
          ...newState,
          gameDeck: newGameDeck
        }
      }
      return newState
    default:
      return combined(state, action)
  }
}
