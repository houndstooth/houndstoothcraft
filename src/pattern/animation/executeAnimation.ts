import { getSetting } from '../../app'
import { NullarySideEffector, NullaryVoidPromise } from '../../utilities'
import { AnimationSettings } from './animationSettings'
import * as animator from './animator'
import buildAnimationFunction from './buildAnimationFunction'
import buildStopConditionFunction from './buildStopConditionFunction'
import { ConditionFunction, ExecuteAnimationParams } from './types'

const executeAnimation: (_: ExecuteAnimationParams) => Promise<(resolveAnimation: NullarySideEffector) => void> =
	// tslint:disable-next-line:max-line-length
	async ({ animationFunctionObjects, layerFunctionObjects }: ExecuteAnimationParams): Promise<(resolveAnimation: NullarySideEffector) => void> => {
		const {
			frameRate,
			endFrame,
		}: AnimationSettings = getSetting.default('animationSettings')

		const animationFunction: NullaryVoidPromise = buildAnimationFunction({
			animationFunctionObjects,
			layerFunctionObjects,
		})
		const stopConditionFunction: ConditionFunction = buildStopConditionFunction({ endFrame })

		const animationExecutor: (resolveAnimation: NullarySideEffector) => void =
			(resolveAnimation: NullarySideEffector): void => {
				animator.default({
					animationFunction,
					frameRate,
					resolveAnimation,
					stopConditionFunction,
				})
			}

		return new Promise<(resolveAnimation: NullarySideEffector) => void>(animationExecutor)
	}

export default executeAnimation
