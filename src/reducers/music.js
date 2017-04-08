import { SET_SCORE, PLAY_NOTE, SET_SCORE_LENGTH, SWIPE_UP, SWIPE_DOWN } from '../actions/types'
import play from './play'

export const defaultMusic = {
  score: [],
  song: [],
  scoreLength: 6
}

export const screenProperties = Object.keys(defaultMusic)

export default function (state = defaultMusic, action = {}) {
  switch (action.type) {
    case SWIPE_UP:
      return { ...state, showInstrument: true }
    case SWIPE_DOWN:
      return { ...state, showInstrument: false }
    case SET_SCORE:
      const score = action.score
      if (score.length !== state.scoreLength) {
        const message = `Expected a score with length ${state.scoreLength} but got one with length ${score.length}.`
        throw new Error(message)
      }
      return { ...state, score }
    case SET_SCORE_LENGTH:
      return { ...state, scoreLength: action.scoreLength }
    case PLAY_NOTE:
      let song
      if (state.song.length < state.scoreLength) {
        song = [...state.song, action.note]
      } else {
        song = [...state.song.slice(1), action.note]
      }
      play(action.note)
      return { ...state, song }
    default:
      return state
  }
}
