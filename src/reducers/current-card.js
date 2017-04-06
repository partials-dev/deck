import * as types from '../actions/types'

const defaultState = {
  id: 'start',
  title: 'Hi!',
  text: 'Hello world!',
  image: 'portrait-1.jpg',
  animate: false,
  position: { x: 0, y: 0 },
  initialPosition: { x: 0, y: 0 },
  leanDirection: 'middle'
}

export const cardProperties = Object.keys(defaultState)
const getLeanDirectionFor = (position, initialPosition) => {
  const relativeX = position.x - initialPosition.x
  if (relativeX < 0) return 'left'
  if (relativeX > 0) return 'right'
  return 'middle'
}

export default function (state = defaultState, action = {}) {
  switch (action.type) {
    case types.UPDATE_CURRENT_CARD:
      const card = action.card || {}
      const newCard = { ...state, ...card }
      newCard.leanDirection = getLeanDirectionFor(newCard.position, newCard.initialPosition)
      return newCard
    case types.GET_NEXT_CARD:
      const newCurrentCard = { ...state, title: `${state.title}!` }
      return newCurrentCard
    default:
      return state
  }
}
