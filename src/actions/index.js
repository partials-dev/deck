import * as types from './types'
import { cardProperties } from '../reducers/current-card'
import { screenProperties } from '../reducers/screen'

export function getNextCard (direction) {
  return {
    type: types.GET_NEXT_CARD,
    direction
  }
}

const throwIfInvalidProperties = (type, obj, validProperties) => {
  const isInvalidProperty = prop => validProperties.indexOf(prop) < 0
  const invalidProperties = Object.keys(obj).filter(isInvalidProperty)
  if (invalidProperties.length > 0) {
    const message = `These properties aren't permitted on a ${type}: ${invalidProperties.join(', ')}.`
    throw new Error(message)
  }
}

export function updateCurrentCard (card = {}) {
  throwIfInvalidProperties('card', card, cardProperties)
  return {
    type: types.UPDATE_CURRENT_CARD,
    card
  }
}

export function updateScreen (screen = {}) {
  throwIfInvalidProperties('screen', screen, screenProperties)
  return {
    type: types.UPDATE_SCREEN,
    screen
  }
}

export function resetCurrentCardPosition () {
  return {
    type: types.RESET_CURRENT_CARD_POSITION
  }
}
