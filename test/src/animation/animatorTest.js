import animator from '../../../src/animation/animator'
import state from '../../../state'
import resetState from '../../../src/store/resetState'

describe('animator', () => {
	let buildIntervalFunctionSpy
	let intervalFunction
	let animationFunction, frameRate, stopConditionFunction
	let interval
	beforeEach(() => {
		resetState(state)

		interval = () => {
		}
		spyOn(window, 'setInterval').and.returnValue(interval)
		intervalFunction = p => p * 20
		buildIntervalFunctionSpy = jasmine.createSpy().and.returnValue(intervalFunction)
		animator.__Rewire__('buildIntervalFunction', buildIntervalFunctionSpy)

		animationFunction = () => {
		}
		frameRate = 3
		stopConditionFunction = () => {
		}

		animator({ animationFunction, frameRate, stopConditionFunction })
	})

	it('augments the function to be scheduled with a stop condition so it can cancel itself', () => {
		expect(buildIntervalFunctionSpy).toHaveBeenCalledWith(jasmine.objectContaining({
			animationFunction,
			stopConditionFunction,
		}))
	})

	it('schedules this augmented function to be run at the frame rate', () => {
		expect(window.setInterval).toHaveBeenCalledWith(intervalFunction, frameRate)
	})

	it('saves this interval-repeating function where it can be found to be stopped later', () => {
		expect(state.interval).toBe(interval)
	})
})
