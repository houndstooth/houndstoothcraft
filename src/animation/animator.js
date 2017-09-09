import buildIntervalFunction from './buildIntervalFunction'
import state from '../../state'

export default ({ animationFunction, frameRate, stopCondition }) => {
	const intervalFunction = buildIntervalFunction({ animationFunction, stopCondition })
	state.interval = setInterval(intervalFunction, frameRate)
}
