import { ConditionFunction, patternState, shouldRefreshCanvas } from '../../../../../src/indexForTest'

describe('should refresh canvas', () => {
	it('reports if the current pattern asks for the canvas to be refreshed between animation frames', () => {
		const subject: ConditionFunction = shouldRefreshCanvas.default

		patternState.animationSettings.refreshCanvas = false
		expect(subject()).toBe(false)

		patternState.animationSettings.refreshCanvas = true
		expect(subject()).toBe(true)
	})
})
