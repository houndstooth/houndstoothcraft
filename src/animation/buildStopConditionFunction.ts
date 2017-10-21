import { state } from '../state'
import { Frame } from './types'

const buildStopConditionFunction: (_: { endAnimationFrame: Frame }) => () => boolean = ({ endAnimationFrame }) => () =>
	state.currentAnimationFrame > endAnimationFrame

export { buildStopConditionFunction }
