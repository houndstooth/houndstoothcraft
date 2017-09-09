import buildIntervalFunction from '../../../src/animation/buildIntervalFunction'
import state from '../../../state'
import resetState from '../../../src/store/resetState'

describe('build animation function', () => {
	let intervalFunction
	let animationFunctionSpy, stopConditionSpy
	beforeEach(() => {
		resetState(state)
		spyOn(window, 'clearInterval')
		animationFunctionSpy = jasmine.createSpy()
		stopConditionSpy = jasmine.createSpy()
		intervalFunction = buildIntervalFunction({
			animationFunction: animationFunctionSpy,
			stopCondition: stopConditionSpy,
		})
	})

	it('returns a function which calls the animation function it was built from', () => {
		stopConditionSpy.and.returnValue(false)

		intervalFunction()

		expect(animationFunctionSpy).toHaveBeenCalled()
		expect(stopConditionSpy).toHaveBeenCalled()
		expect(window.clearInterval).not.toHaveBeenCalled()
	})

	it('returns a function which calls clear interval on the current interval if the stop condition is met', () => {
		stopConditionSpy.and.returnValue(true)

		intervalFunction()

		expect(animationFunctionSpy).toHaveBeenCalled()
		expect(stopConditionSpy).toHaveBeenCalled()
		expect(window.clearInterval).toHaveBeenCalledWith(state.interval)
	})
})
