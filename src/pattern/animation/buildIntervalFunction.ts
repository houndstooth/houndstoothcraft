import { state } from '../../state'
import * as to from '../../to'
import { NullarySideEffector, windowWrapper } from '../../utilities'
import { AnimationParams, ConditionFunction } from './types'

const buildIntervalFunction: (_: AnimationParams) => NullarySideEffector =
	({ animationFunction, resolveAnimation }: AnimationParams): NullarySideEffector =>
		(): void => {
			if (isPaused()) {
				return
			}

			animationFunction()

			if (state.endFrame !== to.Frame(0) && state.currentFrame > state.endFrame) {
				resolveAnimation()
				// tslint:disable-next-line:no-unsafe-any
				windowWrapper.clearInterval(state.interval)
			}
		}

const isPaused: ConditionFunction = (): boolean => !state.animating

export default buildIntervalFunction
