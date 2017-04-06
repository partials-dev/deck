import * as types from './types'
import { cardProperties } from '../reducers/current-card'

export function getNextCard (direction) {
  return {
    type: types.GET_NEXT_CARD,
    direction
  }
}

const isInvalidCardProperty = prop => cardProperties.indexOf(prop) < 0
const throwIfInvalidCardProperties = card => {
  const invalidProperties = Object.keys(card).filter(isInvalidCardProperty)
  if (invalidProperties.length > 0) {
    const message = `These properties aren't permitted on cards: ${invalidProperties.join(', ')}.`
    throw new Error(message)
  }
}

export function updateCurrentCard (card = {}) {
  throwIfInvalidCardProperties(card)
  return {
    type: types.UPDATE_CURRENT_CARD,
    card
  }
}
