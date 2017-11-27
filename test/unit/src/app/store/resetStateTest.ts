import { codeUtilities, DEFAULT_STATE, resetState, state, State } from '../../../../../src'

describe('reset state', () => {
	it('returns the state to defaults, except for changing the pattern ref to a new random number', () => {
		state.patternRef = 4
		resetState.default(state)

		const expectedState: State = codeUtilities.deepClone(DEFAULT_STATE)
		expectedState.patternRef = 5

		expect(state).toEqual(expectedState)
	})
})
