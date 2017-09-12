import state from '../../state'

export default ({ animationFunction, stopConditionFunction }) => () => {
	animationFunction()
	if (stopConditionFunction()) window.clearInterval(state.interval)
}
