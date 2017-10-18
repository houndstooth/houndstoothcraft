import { state } from '../state'
import { windowWrapper } from '../utilities/windowWrapper'
import { buildIntervalFunction } from './buildIntervalFunction'

const animator: (_: {
	frameRate: number,
	animationFunction(): void,
	stopConditionFunction(): boolean,
}) => void = ({ frameRate, animationFunction, stopConditionFunction }) => {
	const intervalFunction = buildIntervalFunction({ animationFunction, stopConditionFunction })
	state.interval = windowWrapper.setInterval(intervalFunction, frameRate)
}

// tslint:disable-next-line:no-default-export
export default animator
