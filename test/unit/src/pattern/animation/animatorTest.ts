import {
	animator,
	buildAnimationIntervalFunction,
	noop,
	NullarySideEffector,
	setSetting,
	state,
	windowWrapper,
} from '../../../../../src'

describe('animator', () => {
	let intervalFunction: (p: number) => number
	const animationFunction: NullarySideEffector = noop.default
	const frameRate: number = 3
	const resolveAnimation: NullarySideEffector = noop.default
	const animationInterval: number = 34987
	beforeEach(() => {
		setSetting.default('frameRate', frameRate)
		spyOn(windowWrapper, 'setInterval').and.returnValue(animationInterval)
		intervalFunction = (p: number): number => p * 20
		spyOn(buildAnimationIntervalFunction, 'default').and.returnValue(intervalFunction)

		animator.default({ animationFunction, resolveAnimation })
	})

	it('assembles the animation, resolution, and stop condition functions together', () => {
		expect(buildAnimationIntervalFunction.default).toHaveBeenCalledWith(jasmine.objectContaining({
			animationFunction,
			resolveAnimation,
		}))
	})

	it('schedules this assembled function to be run at the frame rate', () => {
		// tslint:disable-next-line:no-unsafe-any
		expect(windowWrapper.setInterval).toHaveBeenCalledWith(intervalFunction, frameRate)
	})

	it('saves this interval-repeating function where it can be found to be stopped later', () => {
		expect(state.execute.animationInterval).toBe(animationInterval)
	})
})
