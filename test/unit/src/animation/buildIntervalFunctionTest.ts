import { buildIntervalFunction } from '../../../../src/animation/buildIntervalFunction'
import { state } from '../../../../src/state'
import Spy = jasmine.Spy
import { NullarySideEffector } from '../../../../src/utilities/types'
import { windowWrapper } from '../../../../src/utilities/windowWrapper'

describe('build animation function returns a function which ', () => {
	let intervalFunction: NullarySideEffector
	let animationFunctionSpy: Spy
	let stopConditionFunctionSpy: Spy
	beforeEach(() => {
		state.animating = true
		spyOn(windowWrapper, 'clearInterval')
		animationFunctionSpy = jasmine.createSpy('animationFunction')
		stopConditionFunctionSpy = jasmine.createSpy('stopConditionFunction')
		intervalFunction = buildIntervalFunction({
			animationFunction: animationFunctionSpy,
			stopConditionFunction: stopConditionFunctionSpy,
		})
	})

	it('calls the animation function it was built from', () => {
		stopConditionFunctionSpy.and.returnValue(false)

		intervalFunction()

		expect(animationFunctionSpy).toHaveBeenCalled()
		expect(stopConditionFunctionSpy).toHaveBeenCalled()
		// tslint:disable-next-line:no-unsafe-any
		expect(windowWrapper.clearInterval).not.toHaveBeenCalled()
	})

	it('calls clear interval on the current interval if the stop condition is met', () => {
		stopConditionFunctionSpy.and.returnValue(true)

		intervalFunction()

		expect(animationFunctionSpy).toHaveBeenCalled()
		expect(stopConditionFunctionSpy).toHaveBeenCalled()
		// tslint:disable-next-line:no-unsafe-any
		expect(windowWrapper.clearInterval).toHaveBeenCalledWith(state.interval)
	})

	it('does not call the animation or stop condition functions if animation has been paused', () => {
		state.animating = false

		intervalFunction()

		expect(animationFunctionSpy).not.toHaveBeenCalled()
		expect(stopConditionFunctionSpy).not.toHaveBeenCalled()
	})
})
