import buildIntervalFunction from './buildIntervalFunction'
import store from '../../store'

export default ({ animationFunction, frameRate, stopCondition }) => {
	const intervalFunction = buildIntervalFunction({ animationFunction, stopCondition })
	store.interval = setInterval(intervalFunction, frameRate)
}
