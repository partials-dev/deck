import * as types from '../actions/types'

const defaultState = {
  id: 'start',
  title: 'Hi!',
  text: 'Hello world!',
  image: 'portrait-1.jpg'
}

export default function (state = defaultState, action = {}) {
  switch (action.type) {
    case types.GET_NEXT_CARD:
      const newCurrentCard = { ...state, title: `${state.title}!` }
      return newCurrentCard
  }
  return state
}
