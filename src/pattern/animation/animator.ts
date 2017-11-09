import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'
import { windowWrapper } from '../../utilities'
import { buildIntervalFunction } from './buildIntervalFunction'
import { AnimatorParams } from './types'

const animator: (_: AnimatorParams) => void =
	({ frameRate, animationFunction, resolveAnimation, stopConditionFunction }: AnimatorParams): void => {
		const intervalFunction: NullarySideEffector = buildIntervalFunction({
			animationFunction,
			resolveAnimation,
			stopConditionFunction,
		})
		// tslint:disable-next-line:no-unsafe-any
		state.interval = windowWrapper.setInterval(intervalFunction, frameRate)
	}

// tslint:disable-next-line:no-default-export
export default animator
