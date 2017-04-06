import * as types from '../actions/types'
import getLeanDirectionFor from './get-lean-direction-for'

const defaultState = {
  id: 'start',
  title: 'Hi!',
  text: 'Hello world!',
  image: 'portrait-1.jpg',
  animate: false,
  position: { x: 0, y: 0 },
  initialPosition: { x: 0, y: 0 },
  leanDirection: 'middle',
  size: { width: null, height: null }
}

export const cardProperties = Object.keys(defaultState)

function updateCurrentCard (state, card = {}) {
  const newCard = { ...state, ...card }
  newCard.leanDirection = getLeanDirectionFor(newCard.position, newCard.initialPosition)
  return newCard
}

export default function (state = defaultState, action = {}) {
  switch (action.type) {
    case types.UPDATE_CURRENT_CARD:
      return updateCurrentCard(state, action.card)
    case types.GET_NEXT_CARD:
      return { ...state, title: `${state.title}!` }
    default:
      return state
  }
}
