import {
	AnimationParams,
	animator,
	appState,
	buildAnimationIntervalFunction,
	globalWrapper,
	NullarySideEffector,
} from '../../../../../src'
import { noop } from '../../../helpers'

const subject: (_: AnimationParams) => void = animator.default

describe('animator', () => {
	const FRAME_RATE: number = 30
	let intervalFunction: (p: number) => number
	const animationFunction: NullarySideEffector = noop
	const resolveAnimation: NullarySideEffector = noop
	const animationInterval: number = 34987
	beforeEach(() => {
		spyOn(globalWrapper.window, 'setInterval').and.returnValue(animationInterval)
		intervalFunction = (p: number): number => p * 20
		spyOn(buildAnimationIntervalFunction, 'default').and.returnValue(intervalFunction)

		subject({ animationFunction, resolveAnimation })
	})

	it('assembles the animation, resolution, and stop condition functions together', () => {
		expect(buildAnimationIntervalFunction.default).toHaveBeenCalledWith(jasmine.objectContaining({
			animationFunction,
			resolveAnimation,
		}))
	})

	it('schedules this assembled function to be run at the frame rate', () => {
		// tslint:disable-next-line:no-unsafe-any
		expect(globalWrapper.window.setInterval).toHaveBeenCalledWith(intervalFunction, FRAME_RATE)
	})

	it('saves this interval-repeating function where it can be found to be stopped later', () => {
		expect(appState.execute.animationInterval).toBe(animationInterval)
	})
})
