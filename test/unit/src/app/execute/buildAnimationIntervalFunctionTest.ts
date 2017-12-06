import { buildAnimationIntervalFunction, clearInterval, NullarySideEffector, state, to } from '../../../../../src'
import Spy = jasmine.Spy

describe('build animation interval function returns a function which', () => {
	let intervalFunction: NullarySideEffector
	let animationFunctionSpy: Spy
	let resolveAnimationSpy: Spy
	beforeEach(() => {
		state.controls.animating = true
		spyOn(clearInterval, 'default')
		animationFunctionSpy = jasmine.createSpy('animationFunction')
		resolveAnimationSpy = jasmine.createSpy('resolveAnimation')
		intervalFunction = buildAnimationIntervalFunction.default({
			animationFunction: animationFunctionSpy,
			resolveAnimation: resolveAnimationSpy,
		})
	})

	it('calls the animation function it was built from', () => {
		intervalFunction()

		expect(animationFunctionSpy).toHaveBeenCalled()
	})

	it('does not animate when paused', () => {
		state.controls.animating = false

		intervalFunction()

		expect(animationFunctionSpy).not.toHaveBeenCalled()
	})

	describe('coming to an end', () => {
		it('when end frame is 0, it never ends', () => {
			state.controls.endFrame = to.Frame(0)
			state.controls.currentFrame = to.Frame(12)

			intervalFunction()

			expect(resolveAnimationSpy).not.toHaveBeenCalled()
			expect(clearInterval.default).not.toHaveBeenCalled()
		})

		it('when end frame is nonzero, but current frame is not yet past it, do not end', () => {
			state.controls.endFrame = to.Frame(15)
			state.controls.currentFrame = to.Frame(12)

			intervalFunction()

			expect(resolveAnimationSpy).not.toHaveBeenCalled()
			expect(clearInterval.default).not.toHaveBeenCalled()
		})

		it('when end frame is nonzero, and current frame is past it, end', () => {
			state.controls.endFrame = to.Frame(15)
			state.controls.currentFrame = to.Frame(16)

			intervalFunction()

			expect(resolveAnimationSpy).toHaveBeenCalled()
			expect(clearInterval.default).toHaveBeenCalledWith('animationInterval')
		})
	})
})
