import { state } from '../state'
import { NullarySideEffector } from '../utilities/types'
import { windowWrapper } from '../utilities/windowWrapper'
import { BuildIntervalFunctionParams } from './types'

const buildIntervalFunction: (_: BuildIntervalFunctionParams) => NullarySideEffector =
	({ animationFunction, stopConditionFunction }: BuildIntervalFunctionParams): NullarySideEffector =>
		(): void => {
			animationFunction()
			if (stopConditionFunction()) {
				windowWrapper.clearInterval(state.interval)
			}
		}

export { buildIntervalFunction }
