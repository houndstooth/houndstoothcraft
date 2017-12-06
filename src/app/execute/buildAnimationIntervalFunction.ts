import { NullarySideEffector, to } from '../../utilities'
import { state } from '../state'
import clearInterval from './clearInterval'
import { AnimationParams, ConditionFunction } from './types'

const buildAnimationIntervalFunction: (_: AnimationParams) => NullarySideEffector =
	({ animationFunction, resolveAnimation }: AnimationParams): NullarySideEffector =>
		(): void => {
			if (isPaused()) {
				return
			}

			animationFunction()

			if (state.controls.endFrame !== to.Frame(0) && state.controls.currentFrame > state.controls.endFrame) {
				resolveAnimation()
				clearInterval('animationInterval')
			}
		}

const isPaused: ConditionFunction = (): boolean => !state.controls.animating

export default buildAnimationIntervalFunction
