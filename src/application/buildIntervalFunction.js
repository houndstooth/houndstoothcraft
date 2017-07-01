export default ({ animationFunction, stopCondition }) => () => {
	animationFunction()
	if (stopCondition()) clearInterval(current.interval)
}
