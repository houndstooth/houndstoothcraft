import { NullaryVoidPromise } from '../../utilities'
import * as animator from './animator'
import buildAnimationFunction from './buildAnimationFunction'
import { ExecuteParams } from './types'

const executeAnimation: (_: ExecuteParams) => Promise<(resolveAnimation: () => void) => void> =
	// tslint:disable-next-line:max-line-length
	async ({ animationFunctionObjects, layerFunctionObjects }: ExecuteParams): Promise<(resolveAnimation: () => void) => void> => {
		const animationFunction: NullaryVoidPromise = buildAnimationFunction({
			animationFunctionObjects,
			layerFunctionObjects,
		})

		const animationExecutor: (resolveAnimation: () => void) => void =
			(resolveAnimation: () => void): void => {
				animator.default({
					animationFunction,
					resolveAnimation,
				})
			}

		return new Promise<(resolveAnimation: () => void) => void>(animationExecutor)
	}

export default executeAnimation
