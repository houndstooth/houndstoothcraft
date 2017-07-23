import buildIntervalFunction from '../../../src/application/buildIntervalFunction'
import store from '../../../store'
import codeUtilities from '../../../src/utilities/codeUtilities'
import initialState from '../../../src/state/initialState'

describe('build animation function', () => {
	let intervalFunction
	let animationFunctionSpy, stopConditionSpy
	beforeEach(() => {
		store.currentState = codeUtilities.deepClone(initialState.INITIAL_STATE)
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
		expect(window.clearInterval).toHaveBeenCalledWith(store.currentState.interval)
	})
})
