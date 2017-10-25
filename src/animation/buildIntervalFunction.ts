import { state } from '../state'
import { NullarySideEffector } from '../utilities/types/NullarySideEffector'
import { windowWrapper } from '../utilities/windowWrapper'

const buildIntervalFunction: (_: {
	animationFunction(): void, stopConditionFunction(): boolean,
}) => NullarySideEffector = ({ animationFunction, stopConditionFunction }) => () => {
	animationFunction()
	if (stopConditionFunction()) {
		windowWrapper.clearInterval(state.interval)
	}
}

export { buildIntervalFunction }
