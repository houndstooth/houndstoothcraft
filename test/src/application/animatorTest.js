import animator from '../../../src/application/animator'

describe('animator', () => {
	let buildIntervalFunctionSpy
	let intervalFunction
	let animationFunction, frameRate, stopCondition
	let interval
	beforeEach(() => {
		interval = () => {
		}
		spyOn(window, 'setInterval').and.returnValue(interval)
		intervalFunction = p => p * 20
		buildIntervalFunctionSpy = jasmine.createSpy().and.returnValue(intervalFunction)
		animator.__Rewire__('buildIntervalFunction', buildIntervalFunctionSpy)

		animationFunction = () => {
		}
		frameRate = 3
		stopCondition = () => {
		}

		animator({ animationFunction, frameRate, stopCondition })
	})

	it('augments the function to be scheduled with a stop condition so it can cancel itself', () => {
		expect(buildIntervalFunctionSpy).toHaveBeenCalledWith(jasmine.objectContaining({
			animationFunction,
			stopCondition,
		}))
	})

	it('schedules this augmented function to be run at the frame rate', () => {
		expect(window.setInterval).toHaveBeenCalledWith(intervalFunction, frameRate)
	})

	it('saves this interval-repeating function where it can be found to be stopped later', () => {
		expect(current.interval).toBe(interval)
	})
})
