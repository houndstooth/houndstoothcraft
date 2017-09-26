import buildStopConditionFunction from '../../../../src/animation/buildStopConditionFunction'
import state from '../../../../src/state'

describe('build stop condition function', () => {
	it('returns a function that evaluates to true once the current animation frame on the state is greater than the requested end animation frame', () => {
		const stopConditionFunction = buildStopConditionFunction({ endAnimationFrame: 3 })

		state.currentAnimationFrame = 0
		expect(stopConditionFunction()).toBe(false)

		state.currentAnimationFrame = 1
		expect(stopConditionFunction()).toBe(false)

		state.currentAnimationFrame = 2
		expect(stopConditionFunction()).toBe(false)

		state.currentAnimationFrame = 3
		expect(stopConditionFunction()).toBe(false)

		state.currentAnimationFrame = 4
		expect(stopConditionFunction()).toBe(true)

		state.currentAnimationFrame = 5
		expect(stopConditionFunction()).toBe(true)

		state.currentAnimationFrame = 6
		expect(stopConditionFunction()).toBe(true)

		state.currentAnimationFrame = 7
		expect(stopConditionFunction()).toBe(true)
	})
})
