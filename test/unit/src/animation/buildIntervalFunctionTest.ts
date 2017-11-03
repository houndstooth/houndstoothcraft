import { buildIntervalFunction } from '../../../../src/animation/buildIntervalFunction'
import { state } from '../../../../src/state'
import { setSetting } from '../../../../src/store/setSetting'
import * as to from '../../../../src/utilities/to'
import Spy = jasmine.Spy
import { NullarySideEffector } from '../../../../src/utilities/types'
import { windowWrapper } from '../../../../src/utilities/windowWrapper'

describe('build interval function returns a function which', () => {
	let intervalFunction: NullarySideEffector
	let animationFunctionSpy: Spy
	let stopConditionFunctionSpy: Spy
	let resolveAnimationSpy: Spy
	beforeEach(() => {
		state.animating = true
		spyOn(windowWrapper, 'clearInterval')
		animationFunctionSpy = jasmine.createSpy('animationFunction')
		stopConditionFunctionSpy = jasmine.createSpy('stopConditionFunction')
		resolveAnimationSpy = jasmine.createSpy('resolveAnimation')
		intervalFunction = buildIntervalFunction({
			animationFunction: animationFunctionSpy,
			resolveAnimation: resolveAnimationSpy,
			stopConditionFunction: stopConditionFunctionSpy,
		})
	})

	it('calls the animation function it was built from (and does not clear the interval)', () => {
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

	describe('resolving the animation promise', () => {
		it('resolveAnimations if the end frame is reached', () => {
			setSetting('endFrame', to.Frame(12))
			state.currentFrame = to.Frame(12)

			intervalFunction()

			expect(resolveAnimationSpy).toHaveBeenCalled()
		})

		it('does not resolveAnimation if the end frame is not reached', () => {
			setSetting('endFrame', to.Frame(12))
			state.currentFrame = to.Frame(11)

			intervalFunction()

			expect(resolveAnimationSpy).not.toHaveBeenCalled()
		})
	})
})
