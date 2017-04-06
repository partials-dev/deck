import * as types from '../actions/types'

const defaultState = {
  id: 'start',
  title: 'Hi!',
  text: 'Hello world!',
  image: 'portrait-1.jpg',
  animate: false,
  position: { x: 0, y: 0 },
  initialPosition: { x: 0, y: 0 }
}

export const cardProperties = Object.keys(defaultState)

export default function (state = defaultState, action = {}) {
  switch (action.type) {
    case types.UPDATE_CURRENT_CARD:
      const card = action.card || {}
      return { ...state, ...card }
    case types.GET_NEXT_CARD:
      const newCurrentCard = { ...state, title: `${state.title}!` }
      return newCurrentCard
    default:
      return state
  }
}
