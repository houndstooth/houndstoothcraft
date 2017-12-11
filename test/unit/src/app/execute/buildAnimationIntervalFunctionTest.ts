import {
	AnimationParams,
	appState,
	buildAnimationIntervalFunction,
	clearInterval,
	NullarySideEffector,
	to,
} from '../../../../../src/indexForTest'
import Spy = jasmine.Spy

const subject: (_: AnimationParams) => NullarySideEffector = buildAnimationIntervalFunction.default

describe('build animation interval function returns a function which', () => {
	let intervalFunction: NullarySideEffector
	let animationFunctionSpy: Spy
	let resolveAnimationSpy: Spy
	beforeEach(() => {
		appState.controls.animating = true
		spyOn(clearInterval, 'default')
		animationFunctionSpy = jasmine.createSpy('animationFunction')
		resolveAnimationSpy = jasmine.createSpy('resolveAnimation')

		intervalFunction = subject({
			animationFunction: animationFunctionSpy,
			resolveAnimation: resolveAnimationSpy,
		})
	})

	it('calls the animation function it was built from', () => {
		intervalFunction()

		expect(animationFunctionSpy).toHaveBeenCalled()
	})

	it('does not animate when paused', () => {
		appState.controls.animating = false

		intervalFunction()

		expect(animationFunctionSpy).not.toHaveBeenCalled()
	})

	describe('coming to an end', () => {
		it('when end frame is 0, it never ends', () => {
			appState.controls.endFrame = to.Frame(0)
			appState.controls.currentFrame = to.Frame(12)

			intervalFunction()

			expect(resolveAnimationSpy).not.toHaveBeenCalled()
			expect(clearInterval.default).not.toHaveBeenCalled()
		})

		it('when end frame is nonzero, but current frame is not yet past it, do not end', () => {
			appState.controls.endFrame = to.Frame(15)
			appState.controls.currentFrame = to.Frame(12)

			intervalFunction()

			expect(resolveAnimationSpy).not.toHaveBeenCalled()
			expect(clearInterval.default).not.toHaveBeenCalled()
		})

		it('when end frame is nonzero, and current frame is past it, end', () => {
			appState.controls.endFrame = to.Frame(15)
			appState.controls.currentFrame = to.Frame(16)

			intervalFunction()

			expect(resolveAnimationSpy).toHaveBeenCalled()
			expect(clearInterval.default).toHaveBeenCalledWith('animationInterval')
		})
	})
})
