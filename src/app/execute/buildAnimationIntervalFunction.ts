import { ConditionFunction, NullarySideEffector, to } from '../../utilities'
import { appState } from '../appState'
import clearIntervalAndRemoveFromState from './clearIntervalAndRemoveFromState'
import { AnimationParams } from './types'

const buildAnimationIntervalFunction: (_: AnimationParams) => NullarySideEffector =
	({ animationFunction, resolveAnimation }: AnimationParams): NullarySideEffector =>
		(): void => {
			if (isPaused()) {
				return
			}

			animationFunction()

			if (appState.controls.endFrame !== to.Frame(0) && appState.controls.currentFrame > appState.controls.endFrame) {
				resolveAnimation()
				clearIntervalAndRemoveFromState('animationInterval')
			}
		}

const isPaused: ConditionFunction = (): boolean => !appState.controls.animating

export default buildAnimationIntervalFunction
