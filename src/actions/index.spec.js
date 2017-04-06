/* eslint-env jest */
import * as actions from './index'

describe('updateCurrentCard()', () => {
  it('throws an error if you try to update an invalid property', () => {
    const createInvalidAction = () => actions.updateCurrentCard({ derp: 'derp' })
    expect(createInvalidAction).toThrow()
  })
})
