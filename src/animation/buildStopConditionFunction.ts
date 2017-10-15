import state from '../state'

type BuildStopConditionFunction = { ({}: { endAnimationFrame: number }): () => boolean }
const buildStopConditionFunction: BuildStopConditionFunction = ({ endAnimationFrame }) => () =>
	state.currentAnimationFrame > endAnimationFrame

export default buildStopConditionFunction
