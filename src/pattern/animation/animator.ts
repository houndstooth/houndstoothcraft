import { getSetting, windowWrapper } from '../../app'
import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'
import buildAnimationIntervalFunction from './buildAnimationIntervalFunction'
import { AnimationParams } from './types'

const animator: (_: AnimationParams) => void =
	({ animationFunction, resolveAnimation }: AnimationParams): void => {
		const intervalFunction: NullarySideEffector = buildAnimationIntervalFunction({
			animationFunction,
			resolveAnimation,
		})

		state.execute.animationInterval = windowWrapper.setInterval(intervalFunction, getSetting.default('frameRate'))
	}

export default animator
