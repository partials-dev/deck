import * as types from './types'

export const GET_NEXT_CARD = 'GET_NEXT_CARD'

export const getNextCard = direction => {
  return {
    type: types.GET_NEXT_CARD,
    direction
  }
}
