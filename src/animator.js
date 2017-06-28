export default ({ animationFunction, frameRate, stopCondition }) => {
	const interval = setInterval(() => {
		animationFunction()
		if (stopCondition()) clearInterval(interval)
	}, frameRate)
}
