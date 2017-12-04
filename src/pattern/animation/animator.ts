import { getSetting } from '../../app'
import { state } from '../../state'
import { NullarySideEffector, windowWrapper } from '../../utilities'
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
