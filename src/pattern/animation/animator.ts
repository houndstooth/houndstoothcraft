import { getSetting } from '../../app'
import { state } from '../../state'
import { NullarySideEffector, windowWrapper } from '../../utilities'
import buildIntervalFunction from './buildIntervalFunction'
import { AnimationParams } from './types'

const animator: (_: AnimationParams) => void =
	({ animationFunction, resolveAnimation }: AnimationParams): void => {
		const intervalFunction: NullarySideEffector = buildIntervalFunction({
			animationFunction,
			resolveAnimation,
		})
		// tslint:disable-next-line:no-unsafe-any
		state.interval = windowWrapper.setInterval(intervalFunction, getSetting.default('frameRate'))
	}

export default animator
