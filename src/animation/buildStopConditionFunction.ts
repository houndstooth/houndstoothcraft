import state from '../state'

const buildStopConditionFunction: {
	({}: { endAnimationFrame: number }): () => boolean,
} = ({ endAnimationFrame }) => () =>
	state.currentAnimationFrame > endAnimationFrame

export default buildStopConditionFunction
