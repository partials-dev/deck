/* eslint-env jest */

import musicReducer from './music'
import { setScore, playNote, setScoreLength, swipeUp, swipeDown } from '../actions'

describe('musicReducer', () => {
  it('defaults to an empty score', () => {
    const state = musicReducer(undefined)
    expect(state.score).toEqual([])
  })
  it('defaults to an empty song', () => {
    const state = musicReducer(undefined)
    expect(state.song).toEqual([])
  })
  describe('setScoreLength()', () => {
    it('updates the score length', () => {
      const scoreLength = 4
      const setScoreLengthAction = setScoreLength(scoreLength)
      const state = musicReducer(undefined, setScoreLengthAction)
      expect(state.scoreLength).toEqual(scoreLength)
    })
  })
  describe('setScore()', () => {
    it('updates the score', () => {
      const score = [0, 1, 2, 3]
      const actions = [setScoreLength(score.length), setScore(score)]
      const state = actions.reduce(musicReducer, undefined)
      expect(state.score).toEqual(score)
    })
    it('throws an error if the score doesn\'t match the score length', () => {
      const score = [0, 1, 2, 3]
      const scoreLength = 1
      const actions = [setScoreLength(scoreLength), setScore(score)]

      const applyInvalidActions = () => actions.reduce(musicReducer, undefined)
      const error = `Expected a score with length ${scoreLength} but got one with length ${score.length}.`
      expect(applyInvalidActions).toThrow(error)
    })
  })
  describe('playNote()', () => {
    it('appends a note to the song', () => {
      const play = playNote(0)
      const state = musicReducer(undefined, play)
      expect(state.song).toEqual([0])
    })
    it('gets rid of the oldest note if you try to play beyond the score length', () => {
      const actions = [setScoreLength(2), playNote(0), playNote(1), playNote(2)]
      const state = actions.reduce(musicReducer, undefined)
      expect(state.song).toEqual([1, 2])
    })
    it('doesn\'t clear the song if you play up to the score length', () => {
      const play = playNote(0)
      const actions = [setScoreLength(3), play, play, play]
      const state = actions.reduce(musicReducer, undefined)
      expect(state.song).toEqual([0, 0, 0])
    })
  })
  describe('swipeUp()', () => {
    it('should set showInstrument to true', () => {
      const first = musicReducer(undefined, swipeUp())
      expect(first.showInstrument).toEqual(true)

      const next = musicReducer(first, swipeUp())
      expect(next.showInstrument).toEqual(true)
    })
  })
  describe('swipeDown()', () => {
    it('should set showInstrument to false', () => {
      const first = musicReducer(undefined, swipeUp())
      expect(first.showInstrument).toEqual(true)

      const next = musicReducer(first, swipeDown())
      expect(next.showInstrument).toEqual(false)

      const nextNext = musicReducer(first, swipeDown())
      expect(nextNext.showInstrument).toEqual(false)
    })
  })
})
