import { state, to } from '../../../../src'
import { buildStopConditionFunction } from '../../../../src/animation/buildStopConditionFunction'
import { ConditionFunction } from '../../../../src/animation/types'

describe('build stop condition function', () => {
	// tslint:disable-next-line:max-line-length
	it('returns a function that evaluates to true once the current animation frame on the state is greater than the requested end animation frame', () => {
		const stopConditionFunction: ConditionFunction = buildStopConditionFunction({ endFrame: to.Frame(3) })

		state.currentFrame = to.Frame(0)
		expect(stopConditionFunction()).toBe(false)

		state.currentFrame = to.Frame(1)
		expect(stopConditionFunction()).toBe(false)

		state.currentFrame = to.Frame(2)
		expect(stopConditionFunction()).toBe(false)

		state.currentFrame = to.Frame(3)
		expect(stopConditionFunction()).toBe(false)

		state.currentFrame = to.Frame(4)
		expect(stopConditionFunction()).toBe(true)

		state.currentFrame = to.Frame(5)
		expect(stopConditionFunction()).toBe(true)

		state.currentFrame = to.Frame(6)
		expect(stopConditionFunction()).toBe(true)

		state.currentFrame = to.Frame(7)
		expect(stopConditionFunction()).toBe(true)
	})
})
