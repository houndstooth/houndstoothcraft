import buildIntervalFunction from './buildIntervalFunction'

export default ({ animationFunction, frameRate, stopCondition }) => {
	const intervalFunction = buildIntervalFunction({ animationFunction, stopCondition })
	current.interval = setInterval(intervalFunction, frameRate)
}
