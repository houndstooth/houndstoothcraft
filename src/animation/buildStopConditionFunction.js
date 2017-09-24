import state from '../state'

const buildStopConditionFunction = ({ endAnimationFrame }) => () => state.currentAnimationFrame > endAnimationFrame

export default buildStopConditionFunction
