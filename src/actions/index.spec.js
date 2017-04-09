/* eslint-env jest */
import * as actions from './index'
import { SIDES } from '../reducers/get-lean-direction-for'
import decamelize from 'decamelize'

describe('actions', () => {
  test('action creators should return the right action type', () => {
    Object.keys(actions).forEach(actionName => {
      const actionCreator = actions[actionName]
      const action = actionCreator(actionCreator._validArgumentsExample)
      const expectedType = decamelize(actionName, '_').toUpperCase()
      expect(action.type).toEqual(expectedType)
    })
  })
  describe('setScoreLength()', () => {
    it('should throw an error if it\'s passed anything but a number', () => {
      const passNull = () => actions.setScoreLength(null)
      const passString = () => actions.setScoreLength('derp')
      const passObject = () => actions.setScoreLength({})
      expect(passNull).toThrow('Score length must be a number.')
      expect(passString).toThrow('Score length must be a number.')
      expect(passObject).toThrow('Score length must be a number.')
    })
  })
  describe('playNote()', () => {
    it('should throw an error if it\'s passed anything but a number', () => {
      const passNull = () => actions.playNote(null)
      const passString = () => actions.playNote('derp')
      const passObject = () => actions.playNote({})
      expect(passNull).toThrow('Note must be a number.')
      expect(passString).toThrow('Note must be a number.')
      expect(passObject).toThrow('Note must be a number.')
    })
    it('should not throw an error if it\'s passed an array', () => {
      const passArray = () => actions.playNote([])
      expect(passArray).not.toThrow('Score must be an array.')
    })
  })
  describe('setScore()', () => {
    it('should throw an error if it\'s passed anything but an array', () => {
      const passNull = () => actions.setScore(null)
      const passString = () => actions.setScore('derp')
      const passObject = () => actions.setScore({})
      expect(passNull).toThrow('Score must be an array.')
      expect(passString).toThrow('Score must be an array.')
      expect(passObject).toThrow('Score must be an array.')
    })
    it('should not throw an error if it\'s passed an array', () => {
      const passArray = () => actions.setScore([])
      expect(passArray).not.toThrow('Score must be an array.')
    })
  })
  describe('updateCurrentCard()', () => {
    it('throws an error if you try to update an invalid property', () => {
      const createInvalidAction = () => actions.updateCurrentCard({ derp: 'derp' })
      expect(createInvalidAction).toThrow('These properties aren\'t permitted on a card')
    })
    it('throws an error if you pass it null', () => {
      const createInvalidAction = () => actions.updateCurrentCard(null)
      expect(createInvalidAction).toThrow('Updates must be defined.')
    })
    it('throws an error if you pass it undefined', () => {
      const createInvalidAction = () => actions.updateCurrentCard(undefined)
      expect(createInvalidAction).toThrow('Updates must be defined.')
    })
  })

  describe('updateCard()', () => {
    it('throws an error if you try to update an invalid property', () => {
      const createInvalidAction = () => actions.updateCard({ id: 'hi', derp: 'derp' })
      expect(createInvalidAction).toThrow('These properties aren\'t permitted on a card')
    })
    it('throws an error if you don\'t include an id', () => {
      const createInvalidAction = () => actions.updateCard({})
      expect(createInvalidAction).toThrow('Must specify an id when updating a card')
    })
    it('throws an error if you pass it null', () => {
      const createInvalidAction = () => actions.updateCard(null)
      expect(createInvalidAction).toThrow('Updates must be defined.')
    })
    it('throws an error if you pass it undefined', () => {
      const createInvalidAction = () => actions.updateCard(undefined)
      expect(createInvalidAction).toThrow('Updates must be defined.')
    })
  })

  describe('updateScreen()', () => {
    it('throws an error if you try to update an invalid property', () => {
      const createInvalidAction = () => actions.updateScreen({ derp: 'derp' })
      expect(createInvalidAction).toThrow('These properties aren\'t permitted on a screen')
    })
    it('throws an error if you pass it null', () => {
      const createInvalidAction = () => actions.updateScreen(null)
      expect(createInvalidAction).toThrow('Screen must be defined.')
    })
    it('throws an error if you pass it undefined', () => {
      const createInvalidAction = () => actions.updateScreen(undefined)
      expect(createInvalidAction).toThrow('Screen must be defined.')
    })
  })

  describe('removeCard()', () => {
    it('throws an error if you don\'t pass a card id', () => {
      const createInvalidAction = () => actions.removeCard({ id: null, side: SIDES.LEFT })
      expect(createInvalidAction).toThrow('Must specify an id when removing a card.')
    })
    it('throws an error if you pass an invalid side', () => {
      const createInvalidAction = () => actions.removeCard({ id: 'a-card-id', side: 'not-a-valid-side' })
      expect(createInvalidAction).toThrow('Side must be one of')
    })
  })

  describe('resetCardPosition()', () => {
    it('throws an error if you don\'t pass a card id', () => {
      const createInvalidAction = () => actions.resetCardPosition(null)
      expect(createInvalidAction).toThrow('Must specify an id when resetting card position.')
    })
    it('throws an error if you pass an invalid side', () => {
      const createInvalidAction = () => actions.removeCard({ id: 'a-card-id', side: 'not-a-valid-side' })
      expect(createInvalidAction).toThrow('Side must be one of')
    })
  })

  describe('appendCard()', () => {
    it('throws an error if the card doesn\'t have an id', () => {
      const createInvalidAction = () => actions.appendCard({ title: 'hi' })
      expect(createInvalidAction).toThrow('Must specify an id when appending a card.')
    })
    it('throws an error if you pass it null', () => {
      const createInvalidAction = () => actions.appendCard(null)
      expect(createInvalidAction).toThrow('Can\'t append an undefined card.')
    })
    it('throws an error if you pass it undefined', () => {
      const createInvalidAction = () => actions.appendCard(undefined)
      expect(createInvalidAction).toThrow('Can\'t append an undefined card.')
    })
  })
  describe('swipeDown()', () => {
    it('throws an error if its argument is undefined', () => {
      const createInvalidAction = () => actions.swipeDown()
      expect(createInvalidAction).toThrow('Previous card must be defined.')
    })
  })
})
