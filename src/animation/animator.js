import buildIntervalFunction from './buildIntervalFunction'
import state from '../../state'

const animator = ({ animationFunction, frameRate, stopConditionFunction }) => {
	const intervalFunction = buildIntervalFunction({ animationFunction, stopConditionFunction })
	state.interval = window.setInterval(intervalFunction, frameRate)
}

export default animator
