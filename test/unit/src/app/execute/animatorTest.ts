import {
	AnimationParams,
	animator,
	appState,
	buildAnimationIntervalFunction,
	globalWrapper,
} from '../../../../../src/indexForTest'
import { noop } from '../../../helpers'

describe('animator', () => {
	let subject: (_: AnimationParams) => void
	const FRAME_RATE: number = 30
	let intervalFunction: (p: number) => number
	const animationFunction: () => void = noop
	const resolveAnimation: () => void = noop
	const animationInterval: number = 34987
	beforeEach(() => {
		subject = animator.default
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
