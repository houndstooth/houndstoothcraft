import { globalWrapper, NullarySideEffector } from '../../utilities'
import { appState } from '../appState'
import buildAnimationIntervalFunction from './buildAnimationIntervalFunction'
import { AnimationParams } from './types'

const FRAME_RATE: number = 30

const animator: (_: AnimationParams) => void =
	({ animationFunction, resolveAnimation }: AnimationParams): void => {
		const intervalFunction: NullarySideEffector = buildAnimationIntervalFunction({
			animationFunction,
			resolveAnimation,
		})

		appState.execute.animationInterval = globalWrapper.window.setInterval(intervalFunction, FRAME_RATE)
	}

export default animator
