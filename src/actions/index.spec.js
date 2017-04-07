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
})
