import { animator, buildAnimationFunction, buildStopConditionFunction, ConditionFunction } from '../animation'
import { state } from '../state'
import { AnimationSettings, getFromBaseOrDefaultPattern } from '../store'
import { NullarySideEffector } from '../utilities/types'
import { ExecuteAnimationParams } from './types'

const executeAnimation: (_: ExecuteAnimationParams) => void =
	({ animationFunctionObjects, layerFunctionObjects }: ExecuteAnimationParams): void => {
		const {
			frameRate,
			endFrame,
			startFrame,
		}: AnimationSettings = getFromBaseOrDefaultPattern('animationSettings')

		state.lastSavedFrame = startFrame

		const animationFunction: NullarySideEffector = buildAnimationFunction({
			animationFunctionObjects,
			layerFunctionObjects,
		})
		const stopConditionFunction: ConditionFunction = buildStopConditionFunction({ endFrame })

		animator({ animationFunction, frameRate, stopConditionFunction })
	}

export { executeAnimation }
