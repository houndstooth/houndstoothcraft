import animator from '../../../../src/animation/animator'
import state from '../../../../src/state'
import * as buildIntervalFunction from '../../../../src/animation/buildIntervalFunction'
import window from '../../../../src/utilities/windowWrapper'
import noop from '../../../helpers/noop'

describe('animator', () => {
	let intervalFunction
	let animationFunction
	let frameRate
	let stopConditionFunction
	let interval
	beforeEach(() => {
		interval = noop
		spyOn(window, 'setInterval').and.returnValue(interval)
		intervalFunction = p => p * 20
		spyOn(buildIntervalFunction, 'default').and.returnValue(intervalFunction)

		animationFunction = noop
		frameRate = 3
		stopConditionFunction = noop

		animator({ animationFunction, frameRate, stopConditionFunction })
	})

	it('augments the function to be scheduled with a stop condition so it can cancel itself', () => {
		expect(buildIntervalFunction.default).toHaveBeenCalledWith(jasmine.objectContaining({
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
