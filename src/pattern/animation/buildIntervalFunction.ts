import { getFromBaseOrDefaultPattern } from '../../app'
import { state } from '../../state'
import { NullarySideEffector, windowWrapper } from '../../utilities'
import { BuildIntervalFunctionParams, ConditionFunction } from './types'

const buildIntervalFunction: (_: BuildIntervalFunctionParams) => NullarySideEffector =
	({ animationFunction, stopConditionFunction, resolveAnimation }: BuildIntervalFunctionParams): NullarySideEffector =>
		(): void => {
			if (!isAnimating()) {
				return
			}

			if (state.currentFrame === getFromBaseOrDefaultPattern.main('endFrame')) {
				resolveAnimation()
			}

			animationFunction()

			if (stopConditionFunction()) {
				// tslint:disable-next-line:no-unsafe-any
				windowWrapper.clearInterval(state.interval)
			}
		}

const isAnimating: ConditionFunction = (): boolean => state.animating

export { buildIntervalFunction as main }
