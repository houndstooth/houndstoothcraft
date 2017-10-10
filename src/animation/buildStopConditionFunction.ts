import state from '../state'

type BuildStopConditionFunction = { ({}: { endAnimationFrame: number }): () => boolean }
const buildStopConditionFunction: BuildStopConditionFunction = ({ endAnimationFrame }) => () => {
	return state.currentAnimationFrame > endAnimationFrame
}

export default buildStopConditionFunction
