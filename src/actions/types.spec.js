/* eslint-env jest */
import * as types from './types'

describe('action types', () => {
  test('variable names should be the same as their values', () => {
    Object.keys(types).forEach(key => {
      // Action types are declared like this:
      // export const DRINK_TEA = 'DRINK_TEA'
      // export const DRINK_COFFEE = 'DRINK_COFFEE'

      // Sometimes when creating a new action,
      // you might accidentally do something like this:
      // export const DRINK_TEA = 'DRINK_TEA'
      // export const DRINK_COFFEE = 'DRINK_TEA'

      // It's especially common when you copy/paste an
      // existing action to create a new action.
      // You're left wondering why dispatching a DRINK_COFFEE
      // action isn't working right.

      // This test catches mistakes like that.
      expect(types[key]).toEqual(key)
    })
  })
})
