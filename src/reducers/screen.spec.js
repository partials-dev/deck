/* eslint-env jest */

import screenReducer from './screen'
import * as actions from '../actions'

describe('updateScreenSize()', () => {
  it('updates the screen size', () => {
    const first = screenReducer()
    const action = actions.updateScreen({ size: { width: 42, height: 24 } })
    const next = screenReducer(first, action)
    expect(first.size).not.toEqual(next.size)
    expect(next.size).toEqual({ width: 42, height: 24 })
  })
})
