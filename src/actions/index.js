import * as types from './types'
import { cardProperties } from '../reducers/card'
import { screenProperties, defaultScreen } from '../reducers/screen'
import defaultCard from '../reducers/default-card'
import { SIDES } from '../reducers/get-lean-direction-for'
import { isInvalid, throwIfInvalidProperties } from './invalid-properties'

const validSides = Object.keys(SIDES).map(key => SIDES[key])

export function getNextCard (direction) {
  if (isInvalid(validSides)(direction)) {
    throw new Error(`Side must be one of ${validSides.join(', ')}, but got ${direction}.`)
  }
  return {
    type: types.GET_NEXT_CARD,
    direction
  }
}
getNextCard._validArgumentsExample = validSides[0]

export function updateCard (updates = {}) {
  throwIfInvalidProperties('card', updates, cardProperties)
  if (updates.id == null) throw new Error('Must specify an id when updating a card.')
  return {
    type: types.UPDATE_CARD,
    updates
  }
}
updateCard._validArgumentsExample = defaultCard

export function updateCurrentCard (updates = {}) {
  if (updates.id != null) {
    throw new Error('Can\'t set an id when updating the current card')
  }

  throwIfInvalidProperties('card', updates, cardProperties)
  return {
    type: types.UPDATE_CURRENT_CARD,
    updates
  }
}
updateCurrentCard._validArgumentsExample = {
  ...defaultCard,
  id: undefined
}

export function updateScreen (screen = {}) {
  throwIfInvalidProperties('screen', screen, screenProperties)
  return {
    type: types.UPDATE_SCREEN,
    screen
  }
}
updateScreen._validArgumentsExample = defaultScreen

export function resetCurrentCardPosition () {
  return {
    type: types.RESET_CURRENT_CARD_POSITION
  }
}
resetCurrentCardPosition._validArgumentsExample = undefined

export function removeCard ({ id, side }) {
  if (id == null) {
    throw new Error('Must specify an id when removing a card.')
  }
  if (isInvalid(validSides)(side)) {
    throw new Error(`Side must be one of ${validSides.join(', ')}, but got ${side}.`)
  }
  return {
    type: types.REMOVE_CARD,
    side,
    id
  }
}
removeCard._validArgumentsExample = { id: 'remove card example', side: validSides[0] }
