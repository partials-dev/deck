import * as types from '../actions/types'
import getLeanDirectionFor from './get-lean-direction-for'
import defaultState from './default-card'

export const cardProperties = Object.keys(defaultState)

function updateCard (card, updates = {}) {
  const updated = { ...card, ...updates }
  updated.leanDirection = getLeanDirectionFor(updated.position, updated.initialPosition)
  return updated
}

export default function (state = defaultState, action = {}) {
  switch (action.type) {
    case types.UPDATE_CARD:
      return updateCard(state, action.updates)
    default:
      return state
  }
}
