import { state } from '../../state'
import { ConditionFunction, Frame } from './types'

const buildStopConditionFunction: (_: { endFrame: Frame }) => ConditionFunction =
	({ endFrame }: { endFrame: Frame }): ConditionFunction =>
		(): boolean => state.currentFrame > endFrame

export default buildStopConditionFunction
