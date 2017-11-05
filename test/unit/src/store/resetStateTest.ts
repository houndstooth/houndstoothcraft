import { resetState } from '../../../../src/store/resetState'
import { state } from '../../../../src/state'
import { DEFAULT_STATE } from '../../../../src/store/defaults'
import { deepClone } from '../../../../src/utilities/codeUtilities'

describe('reset state', () => {
	it('returns the state to defaults, except for changing the pattern ref to a new random number', () => {
		const newPatternRef: number = 0.42398572398759
		spyOn(Math, 'random').and.returnValue(newPatternRef)

		resetState(state)

		const expectedState = deepClone(DEFAULT_STATE)
		expectedState.patternRef = newPatternRef

		expect(state).toEqual(expectedState)
	})
})
