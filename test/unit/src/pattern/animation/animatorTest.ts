import animator from '../../../../../src/pattern/animation/animator'
import * as buildIntervalFunction from '../../../../../src/pattern/animation/buildIntervalFunction'
import { ConditionFunction } from '../../../../../src/pattern/animation/types'
import { state } from '../../../../../src/state'
import { windowWrapper } from '../../../../../src/utilities'
import { noop } from '../../../../../src/utilities/noop'
import { NullarySideEffector } from '../../../../../src/utilities/types'

describe('animator', () => {
	let intervalFunction: (p: number) => number
	const animationFunction: NullarySideEffector = noop
	const frameRate: number = 3
	const resolveAnimation: NullarySideEffector = noop
	const stopConditionFunction: ConditionFunction = (): boolean => false
	const interval: NullarySideEffector = noop
	beforeEach(() => {
		spyOn(windowWrapper, 'setInterval').and.returnValue(interval)
		intervalFunction = (p: number): number => p * 20
		spyOn(buildIntervalFunction, 'buildIntervalFunction').and.returnValue(intervalFunction)

		animator({ animationFunction, resolveAnimation, frameRate, stopConditionFunction })
	})

	it('assembles the animation, resolution, and stop condition functions together', () => {
		expect(buildIntervalFunction.buildIntervalFunction).toHaveBeenCalledWith(jasmine.objectContaining({
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
