import { state } from '../state'
import { ConditionFunction, Frame } from './types'

const buildStopConditionFunction: (_: {
	endFrame: Frame,
}) => ConditionFunction = ({ endFrame }) => () =>
	state.currentFrame > endFrame

export { buildStopConditionFunction }
