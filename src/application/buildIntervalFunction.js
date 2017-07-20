export default ({ animationFunction, stopCondition }) => () => {
	animationFunction()
	if (stopCondition()) clearInterval(currentState.interval)
}
