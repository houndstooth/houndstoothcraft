import { ConditionFunction, shouldRefreshCanvas } from '../../../../../src'
import { setPatternStateForTest } from '../../../helpers'

const subject: ConditionFunction = shouldRefreshCanvas.default

describe('should refresh canvas', () => {
	it('reports if the current pattern asks for the canvas to be refreshed between animation frames', () => {
		setPatternStateForTest('refreshCanvas', false)
		expect(subject()).toBe(false)

		setPatternStateForTest('refreshCanvas', true)
		expect(subject()).toBe(true)
	})
})
