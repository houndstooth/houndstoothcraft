import state from '../state'
import window from '../utilities/windowWrapper'

type BuildIntervalFunction = {
	({}: { animationFunction(): void, stopConditionFunction(): boolean }): () => void,
}
const buildIntervalFunction: BuildIntervalFunction = ({ animationFunction, stopConditionFunction }) => () => {
	animationFunction()
	if (stopConditionFunction()) {
		window.clearInterval(state.interval)
	}
}

export default buildIntervalFunction
