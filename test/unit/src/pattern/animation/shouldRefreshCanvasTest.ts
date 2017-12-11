import { ConditionFunction, shouldRefreshCanvas } from '../../../../../src/indexForTest'
import { setPatternSettingForTest } from '../../../helpers'

const subject: ConditionFunction = shouldRefreshCanvas.default

describe('should refresh canvas', () => {
	it('reports if the current pattern asks for the canvas to be refreshed between animation frames', () => {
		setPatternSettingForTest('refreshCanvas', false)
		expect(subject()).toBe(false)

		setPatternSettingForTest('refreshCanvas', true)
		expect(subject()).toBe(true)
	})
})
