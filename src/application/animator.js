import buildIntervalFunction from './buildIntervalFunction'

export default ({ animationFunction, frameRate, stopCondition }) => {
	const intervalFunction = buildIntervalFunction({ animationFunction, stopCondition })
	currentState.interval = setInterval(intervalFunction, frameRate)
}
