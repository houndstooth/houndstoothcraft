import { animator, buildAnimationFunction, buildStopConditionFunction, ConditionFunction } from '../animation'
import { state } from '../state'
import { AnimationSettings, getFromBaseOrDefaultPattern } from '../store'
import { NullarySideEffector, NullaryVoidPromise } from '../utilities/types'
import { ExecuteAnimationParams } from './types'

const executeAnimation: (_: ExecuteAnimationParams) => Promise<(resolveAnimation: NullarySideEffector) => void> =
	// tslint:disable-next-line:max-line-length
	async ({ animationFunctionObjects, layerFunctionObjects }: ExecuteAnimationParams): Promise<(resolveAnimation: NullarySideEffector) => void> => {
		const {
			frameRate,
			endFrame,
			startFrame,
		}: AnimationSettings = getFromBaseOrDefaultPattern('animationSettings')

		state.lastSavedFrame = startFrame

		const animationFunction: NullaryVoidPromise = buildAnimationFunction({
			animationFunctionObjects,
			layerFunctionObjects,
		})
		const stopConditionFunction: ConditionFunction = buildStopConditionFunction({ endFrame })

		const animationExecutor: (resolveAnimation: NullarySideEffector) => void =
			(resolveAnimation: NullarySideEffector): void => {
				animator({
					animationFunction,
					frameRate,
					resolveAnimation,
					stopConditionFunction,
				})
			}

		return new Promise<(resolveAnimation: NullarySideEffector) => void>(animationExecutor)
	}

export { executeAnimation }
