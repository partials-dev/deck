import * as types from '../actions/types'

export const defaultScreen = {
  size: {
    width: null,
    height: null
  }
}

export const screenProperties = Object.keys(defaultScreen)

export default function (state = defaultScreen, action = {}) {
  switch (action.type) {
    case types.UPDATE_SCREEN:
      const screen = action.screen || {}
      return { ...state, ...screen }
    default:
      return state
  }
}
