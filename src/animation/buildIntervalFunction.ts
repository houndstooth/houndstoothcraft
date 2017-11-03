import { state } from '../state'
import { getFromBaseOrDefaultPattern } from '../store/getFromBaseOrDefaultPattern'
import { NullarySideEffector } from '../utilities/types'
import { windowWrapper } from '../utilities/windowWrapper'
import { BuildIntervalFunctionParams, ConditionFunction } from './types'

const buildIntervalFunction: (_: BuildIntervalFunctionParams) => NullarySideEffector =
	({ animationFunction, stopConditionFunction, resolveAnimation }: BuildIntervalFunctionParams): NullarySideEffector =>
		(): void => {
			if (!isAnimating()) {
				return
			}

			if (state.currentFrame === getFromBaseOrDefaultPattern('endFrame')) {
				resolveAnimation()
			}

			animationFunction()

			if (stopConditionFunction()) {
				// tslint:disable-next-line:no-unsafe-any
				windowWrapper.clearInterval(state.interval)
			}
		}

const isAnimating: ConditionFunction = (): boolean => state.animating

export { buildIntervalFunction }
