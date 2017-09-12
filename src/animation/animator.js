import buildIntervalFunction from './buildIntervalFunction'
import state from '../../state'

export default ({ animationFunction, frameRate, stopConditionFunction }) => {
	const intervalFunction = buildIntervalFunction({ animationFunction, stopConditionFunction })
	state.interval = window.setInterval(intervalFunction, frameRate)
}
