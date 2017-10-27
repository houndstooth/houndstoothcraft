import animator from '../../../../src/animation/animator'
import * as buildIntervalFunction from '../../../../src/animation/buildIntervalFunction'
import { ConditionFunction } from '../../../../src/animation/types/ConditionFunction'
import { state } from '../../../../src/state'
import { NullarySideEffector } from '../../../../src/utilities/types/NullarySideEffector'
import { windowWrapper } from '../../../../src/utilities/windowWrapper'
import { noop } from '../../../helpers/noop'

describe('animator', () => {
	let intervalFunction: (p: number) => number
	const animationFunction: NullarySideEffector = noop
	const frameRate: number = 3
	const stopConditionFunction: ConditionFunction = (): boolean => false
	const interval: NullarySideEffector = noop
	beforeEach(() => {
		spyOn(windowWrapper, 'setInterval').and.returnValue(interval)
		intervalFunction = (p: number): number => p * 20
		spyOn(buildIntervalFunction, 'buildIntervalFunction').and.returnValue(intervalFunction)

		animator({ animationFunction, frameRate, stopConditionFunction })
	})

	it('augments the function to be scheduled with a stop condition so it can cancel itself', () => {
		expect(buildIntervalFunction.buildIntervalFunction).toHaveBeenCalledWith(jasmine.objectContaining({
			animationFunction,
			stopConditionFunction,
		}))
	})

	it('schedules this augmented function to be run at the frame rate', () => {
		expect(windowWrapper.setInterval).toHaveBeenCalledWith(intervalFunction, frameRate)
	})

	it('saves this interval-repeating function where it can be found to be stopped later', () => {
		expect(state.interval).toBe(interval)
	})
})
