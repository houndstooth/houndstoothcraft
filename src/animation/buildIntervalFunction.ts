import state from '../state'
import window from '../utilities/windowWrapper'

const buildIntervalFunction = ({ animationFunction, stopConditionFunction }) => () => {
	animationFunction()
	if (stopConditionFunction()) {
		window.clearInterval(state.interval)
	}
}

export default buildIntervalFunction
