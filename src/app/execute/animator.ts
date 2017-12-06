import { NullarySideEffector } from '../../utilities'
import { windowWrapper } from '../dom'
import { state } from '../state'
import buildAnimationIntervalFunction from './buildAnimationIntervalFunction'
import { AnimationParams } from './types'

const FRAME_RATE: number = 30

const animator: (_: AnimationParams) => void =
	({ animationFunction, resolveAnimation }: AnimationParams): void => {
		const intervalFunction: NullarySideEffector = buildAnimationIntervalFunction({
			animationFunction,
			resolveAnimation,
		})

		state.execute.animationInterval = windowWrapper.setInterval(intervalFunction, FRAME_RATE)
	}

export default animator
