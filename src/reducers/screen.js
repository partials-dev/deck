import * as types from '../actions/types'

const defaultState = {
  size: {
    width: null,
    height: null
  }
}

export const screenProperties = Object.keys(defaultState)

export default function (state = defaultState, action = {}) {
  switch (action.type) {
    case types.UPDATE_SCREEN:
      const screen = action.screen || {}
      return { ...state, ...screen }
    default:
      return state
  }
}
