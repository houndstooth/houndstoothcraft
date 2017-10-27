import { state } from '../state'
import { Frame } from './types'
import { ConditionFunction } from './types/ConditionFunction'

const buildStopConditionFunction: (_: {
	endFrame: Frame,
}) => ConditionFunction = ({ endFrame }) => () =>
	state.currentFrame > endFrame

export { buildStopConditionFunction }
