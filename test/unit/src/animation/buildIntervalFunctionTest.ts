import buildIntervalFunction from '../../../../src/animation/buildIntervalFunction'
import state from '../../../../src/state'
import window from '../../../../src/utilities/windowWrapper'

describe('build animation function', () => {
	let intervalFunction
	let animationFunctionSpy, stopConditionFunctionSpy
	beforeEach(() => {
		spyOn(window, 'clearInterval')
		animationFunctionSpy = jasmine.createSpy()
		stopConditionFunctionSpy = jasmine.createSpy()
		intervalFunction = buildIntervalFunction({
			animationFunction: animationFunctionSpy,
			stopConditionFunction: stopConditionFunctionSpy,
		})
	})

	it('returns a function which calls the animation function it was built from', () => {
		stopConditionFunctionSpy.and.returnValue(false)

		intervalFunction()

		expect(animationFunctionSpy).toHaveBeenCalled()
		expect(stopConditionFunctionSpy).toHaveBeenCalled()
		expect(window.clearInterval).not.toHaveBeenCalled()
	})

	it('returns a function which calls clear interval on the current interval if the stop condition is met', () => {
		stopConditionFunctionSpy.and.returnValue(true)

		intervalFunction()

		expect(animationFunctionSpy).toHaveBeenCalled()
		expect(stopConditionFunctionSpy).toHaveBeenCalled()
		expect(window.clearInterval).toHaveBeenCalledWith(state.interval)
	})
})
