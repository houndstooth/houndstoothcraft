import { Frame } from './types'
import { state } from '../state'

const buildStopConditionFunction: (_: { endAnimationFrame: Frame }) => () => boolean = ({ endAnimationFrame }) => () =>
	state.currentAnimationFrame > endAnimationFrame

export { buildStopConditionFunction }
