import { clearInterval } from '../../app'
import { state } from '../../state'
import * as to from '../../to'
import { NullarySideEffector } from '../../utilities'
import { AnimationParams, ConditionFunction } from './types'

const buildAnimationIntervalFunction: (_: AnimationParams) => NullarySideEffector =
	({ animationFunction, resolveAnimation }: AnimationParams): NullarySideEffector =>
		(): void => {
			if (isPaused()) {
				return
			}

			animationFunction()

			if (state.endFrame !== to.Frame(0) && state.currentFrame > state.endFrame) {
				resolveAnimation()
				clearInterval.default('animationInterval')
			}
		}

const isPaused: ConditionFunction = (): boolean => !state.animating

export default buildAnimationIntervalFunction
