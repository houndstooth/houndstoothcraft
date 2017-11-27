import {
	animator,
	buildIntervalFunction,
	ConditionFunction,
	noop,
	NullarySideEffector,
	state,
	windowWrapper,
} from '../../../../../src'

describe('animator', () => {
	let intervalFunction: (p: number) => number
	const animationFunction: NullarySideEffector = noop.default
	const frameRate: number = 3
	const resolveAnimation: NullarySideEffector = noop.default
	const stopConditionFunction: ConditionFunction = (): boolean => false
	const interval: NullarySideEffector = noop.default
	beforeEach(() => {
		spyOn(windowWrapper, 'setInterval').and.returnValue(interval)
		intervalFunction = (p: number): number => p * 20
		spyOn(buildIntervalFunction, 'default').and.returnValue(intervalFunction)

		animator.default({ animationFunction, resolveAnimation, frameRate, stopConditionFunction })
	})

	it('assembles the animation, resolution, and stop condition functions together', () => {
		expect(buildIntervalFunction.default).toHaveBeenCalledWith(jasmine.objectContaining({
			animationFunction,
			resolveAnimation,
			stopConditionFunction,
		}))
	})

	it('schedules this assembled function to be run at the frame rate', () => {
		// tslint:disable-next-line:no-unsafe-any
		expect(windowWrapper.setInterval).toHaveBeenCalledWith(intervalFunction, frameRate)
	})

	it('saves this interval-repeating function where it can be found to be stopped later', () => {
		expect(state.interval).toBe(interval)
	})
})
