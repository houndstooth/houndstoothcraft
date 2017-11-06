import { state } from '../../../../src/state'
import { DEFAULT_STATE } from '../../../../src/store/defaults'
import { resetState } from '../../../../src/store/resetState'
import { State } from '../../../../src/store/types'
import { deepClone } from '../../../../src/utilities/codeUtilities'

describe('reset state', () => {
	it('returns the state to defaults, except for changing the pattern ref to a new random number', () => {
		state.patternRef = 4
		resetState(state)

		const expectedState: State = deepClone(DEFAULT_STATE)
		expectedState.patternRef = 5

		expect(state).toEqual(expectedState)
	})
})
