import * as types from './types'
import { cardProperties } from '../reducers/card'
import { screenProperties, defaultScreen } from '../reducers/screen'
import defaultCard from '../reducers/default-card'
import { SIDES } from '../reducers/get-lean-direction-for'
import { isInvalid, throwIfInvalidProperties } from './invalid-properties'

const validSides = Object.keys(SIDES).map(key => SIDES[key])

export function swipeUp () {
  return {
    type: types.SWIPE_UP
  }
}
swipeUp._validArgumentsExample = undefined

export function swipeDown () {
  return {
    type: types.SWIPE_DOWN
  }
}
swipeDown._validArgumentsExample = undefined

export function setScoreLength (scoreLength) {
  if (scoreLength == null || isNaN(scoreLength)) {
    throw new Error('Score length must be a number.')
  }
  return {
    type: types.SET_SCORE_LENGTH,
    scoreLength
  }
}
setScoreLength._validArgumentsExample = 1

export function playNote (note) {
  if (note == null || isNaN(note)) {
    throw new Error('Note must be a number.')
  }
  return {
    type: types.PLAY_NOTE,
    note
  }
}
playNote._validArgumentsExample = 1

export function setScore (score) {
  if (!Array.isArray(score)) {
    throw new Error('Score must be an array.')
  }
  return {
    type: types.SET_SCORE,
    score
  }
}
setScore._validArgumentsExample = []

export function updateCard (updates) {
  if (updates == null) {
    throw new Error('Updates must be defined.')
  }
  throwIfInvalidProperties('card', updates, cardProperties)
  if (updates.id == null) throw new Error('Must specify an id when updating a card.')
  return {
    type: types.UPDATE_CARD,
    updates
  }
}
updateCard._validArgumentsExample = defaultCard

export function updateCurrentCard (updates) {
  if (updates == null) {
    throw new Error('Updates must be defined.')
  }
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

export function updateScreen (screen) {
  if (screen == null) {
    throw new Error('Screen must be defined.')
  }
  throwIfInvalidProperties('screen', screen, screenProperties)
  return {
    type: types.UPDATE_SCREEN,
    screen
  }
}
updateScreen._validArgumentsExample = defaultScreen

export function resetCardPosition (id) {
  if (id == null) {
    throw new Error('Must specify an id when resetting card position.')
  }
  return {
    type: types.RESET_CARD_POSITION,
    id
  }
}
resetCardPosition._validArgumentsExample = defaultCard.id

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

export function appendCard (card) {
  if (card == null) {
    throw new Error('Can\'t append an undefined card.')
  }

  throwIfInvalidProperties('card', card, cardProperties)

  if (card.id == null) {
    throw new Error('Must specify an id when appending a card.')
  }
  return {
    type: types.APPEND_CARD,
    card
  }
}
appendCard._validArgumentsExample = defaultCard
