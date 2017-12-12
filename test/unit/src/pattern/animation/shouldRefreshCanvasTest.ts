import { ConditionFunction, shouldRefreshCanvas } from '../../../../../src/indexForTest'
import { setPatternSettingForTest } from '../../../helpers'


describe('should refresh canvas', () => {
	it('reports if the current pattern asks for the canvas to be refreshed between animation frames', () => {
		const subject: ConditionFunction = shouldRefreshCanvas.default
		setPatternSettingForTest('refreshCanvas', false)
		expect(subject()).toBe(false)

		setPatternSettingForTest('refreshCanvas', true)
		expect(subject()).toBe(true)
	})
})
