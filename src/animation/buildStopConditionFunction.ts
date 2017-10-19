import { Frame } from '../execute'
import { state } from '../state'

const buildStopConditionFunction: (_: { endAnimationFrame: Frame }) => () => boolean = ({ endAnimationFrame }) => () =>
	state.currentAnimationFrame > endAnimationFrame

export { buildStopConditionFunction }
