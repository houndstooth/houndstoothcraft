import state from '../state'
import windowWrapper from '../utilities/windowWrapper'
import buildIntervalFunction from './buildIntervalFunction'

type Animator = {
	({}: {
		animationFunction(): void,
		stopConditionFunction(): boolean,
		frameRate: number,
	}): void,
}
const animator: Animator = ({ animationFunction, frameRate, stopConditionFunction }) => {
	const intervalFunction = buildIntervalFunction({ animationFunction, stopConditionFunction })
	state.interval = windowWrapper.setInterval(intervalFunction, frameRate)
}

export default animator
