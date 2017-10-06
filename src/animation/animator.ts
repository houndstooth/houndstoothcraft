import state from '../state'
import window from '../utilities/windowWrapper'
import buildIntervalFunction from './buildIntervalFunction'

const animator = ({ animationFunction, frameRate, stopConditionFunction }) => {
	const intervalFunction = buildIntervalFunction({ animationFunction, stopConditionFunction })
	state.interval = window.setInterval(intervalFunction, frameRate)
}

export default animator
