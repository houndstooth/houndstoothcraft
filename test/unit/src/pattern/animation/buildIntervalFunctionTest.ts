import { buildIntervalFunction, clearInterval, NullarySideEffector, state, to, windowWrapper } from '../../../../../src'
import Spy = jasmine.Spy

describe('build interval function returns a function which', () => {
	let intervalFunction: NullarySideEffector
	let animationFunctionSpy: Spy
	let resolveAnimationSpy: Spy
	beforeEach(() => {
		state.animating = true
		spyOn(clearInterval, 'default')
		animationFunctionSpy = jasmine.createSpy('animationFunction')
		resolveAnimationSpy = jasmine.createSpy('resolveAnimation')
		intervalFunction = buildIntervalFunction.default({
			animationFunction: animationFunctionSpy,
			resolveAnimation: resolveAnimationSpy,
		})
	})

	it('calls the animation function it was built from', () => {
		intervalFunction()

		expect(animationFunctionSpy).toHaveBeenCalled()
	})

	it('does not animate when paused', () => {
		state.animating = false

		intervalFunction()

		expect(animationFunctionSpy).not.toHaveBeenCalled()
	})

	describe('coming to an end', () => {
		it('when end frame is 0, it never ends', () => {
			state.endFrame = to.Frame(0)
			state.currentFrame = to.Frame(12)

			intervalFunction()

			expect(resolveAnimationSpy).not.toHaveBeenCalled()
			expect(clearInterval.default).not.toHaveBeenCalled()
		})

		it('when end frame is nonzero, but current frame is not yet past it, do not end', () => {
			state.endFrame = to.Frame(15)
			state.currentFrame = to.Frame(12)

			intervalFunction()

			expect(resolveAnimationSpy).not.toHaveBeenCalled()
			expect(clearInterval.default).not.toHaveBeenCalled()
		})

		it('when end frame is nonzero, and current frame is past it, end', () => {
			state.endFrame = to.Frame(15)
			state.currentFrame = to.Frame(16)

			intervalFunction()

			expect(resolveAnimationSpy).toHaveBeenCalled()
			expect(clearInterval.default).toHaveBeenCalledWith('interval')
		})
	})
})
