import state from '../state'
import windowWrapper from '../utilities/windowWrapper'
import buildIntervalFunction from './buildIntervalFunction'

const animator: {
	({}: {
		animationFunction(): void,
		stopConditionFunction(): boolean,
		frameRate: number,
	}): void,
} = ({ animationFunction, frameRate, stopConditionFunction }) => {
	const intervalFunction = buildIntervalFunction({ animationFunction, stopConditionFunction })
	state.interval = windowWrapper.setInterval(intervalFunction, frameRate)
}

export default animator
