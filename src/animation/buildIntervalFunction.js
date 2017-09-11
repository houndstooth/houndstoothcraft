import state from '../../state'

export default ({ animationFunction, stopConditionFunction }) => () => {
	animationFunction()
	if (stopConditionFunction()) clearInterval(state.interval)
}
