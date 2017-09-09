import state from '../../state'

export default ({ animationFunction, stopCondition }) => () => {
	animationFunction()
	if (stopCondition()) clearInterval(state.interval)
}
