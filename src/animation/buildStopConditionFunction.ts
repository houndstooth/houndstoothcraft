import { state } from '../state'

const buildStopConditionFunction: (_: { endAnimationFrame: number }) => () => boolean = ({ endAnimationFrame }) => () =>
	state.currentAnimationFrame > endAnimationFrame

export { buildStopConditionFunction }
