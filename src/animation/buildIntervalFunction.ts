import state from '../state'
import windowWrapper from '../utilities/windowWrapper'

type BuildIntervalFunction = {
	({}: { animationFunction(): void, stopConditionFunction(): boolean }): () => void,
}
const buildIntervalFunction: BuildIntervalFunction = ({ animationFunction, stopConditionFunction }) => () => {
	animationFunction()
	if (stopConditionFunction()) {
		windowWrapper.clearInterval(state.interval)
	}
}

export default buildIntervalFunction
