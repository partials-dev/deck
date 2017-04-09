import { APPEND_CARD, SET_SCORE, PLAY_NOTE, SET_SCORE_LENGTH, SWIPE_UP, SWIPE_DOWN } from '../actions/types'
import { playNote, setBackgroundTo, playOnce } from './play'

export const defaultMusic = {
  score: [0, 1, 2],
  song: [],
  scoreLength: 3,
  showInstrument: false,
  songIsScore: false
}

export const screenProperties = Object.keys(defaultMusic)

const handleSound = sound => {
  if (sound.playOnceOnEnter) {
    playOnce(sound.playOnceOnEnter)
  }
  if (sound.setBackgroundTo) {
    setBackgroundTo(sound.setBackgroundTo)
  }
}

const getSongIsScore = (song, score) => {
  // console.log('getting song is score')
  // console.log('song ' + JSON.stringify(song))
  // console.log('score ' + JSON.stringify(score))
  if (song.length !== score.length) {
    return false
  }
  return song.every((note, index) => note === score[index])
}

export default function (state = defaultMusic, action = {}) {
  switch (action.type) {
    case SWIPE_UP:
      return { ...state, showInstrument: true }
    case SWIPE_DOWN:
      if (!state.showInstrument) {
        handleSound(action.previousCard.sound)
      }
      return { ...state, showInstrument: false }
    case SET_SCORE: {
      const score = action.score
      if (score.length !== state.scoreLength) {
        const message = `Expected a score with length ${state.scoreLength} but got one with length ${score.length}.`
        throw new Error(message)
      }
      const songIsScore = getSongIsScore(state.song, score)
      let showInstrument = songIsScore ? false : state.showInstrument
      return { ...state, score, songIsScore, showInstrument }
    }
    case SET_SCORE_LENGTH:
      return { ...state, scoreLength: action.scoreLength }
    case PLAY_NOTE:
      let song
      if (state.song.length < state.scoreLength) {
        song = [...state.song, action.note]
      } else {
        song = [...state.song.slice(1), action.note]
      }
      playNote(action.note)
      const songIsScore = getSongIsScore(song, state.score)
      let showInstrument = songIsScore ? false : state.showInstrument
      return { ...state, song, songIsScore, showInstrument }
    case APPEND_CARD:
      handleSound(action.card.sound)
      return state
    default:
      return state
  }
}
