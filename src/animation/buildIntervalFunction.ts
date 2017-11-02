import { state } from '../state'
import { NullarySideEffector } from '../utilities/types'
import { windowWrapper } from '../utilities/windowWrapper'
import { BuildIntervalFunctionParams, ConditionFunction } from './types'

const buildIntervalFunction: (_: BuildIntervalFunctionParams) => NullarySideEffector =
	({ animationFunction, stopConditionFunction }: BuildIntervalFunctionParams): NullarySideEffector =>
		(): void => {
			if (!isAnimating()) {
				return
			}
			animationFunction()
			if (stopConditionFunction()) {
				// tslint:disable-next-line:no-unsafe-any
				windowWrapper.clearInterval(state.interval)
			}
		}

const isAnimating: ConditionFunction = (): boolean => state.animating

export { buildIntervalFunction }
