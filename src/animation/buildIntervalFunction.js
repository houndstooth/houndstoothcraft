import state from '../../state'

const buildIntervalFunction = ({ animationFunction, stopConditionFunction }) => () => {
	animationFunction()
	if (stopConditionFunction()) window.clearInterval(state.interval)
}

export default buildIntervalFunction
