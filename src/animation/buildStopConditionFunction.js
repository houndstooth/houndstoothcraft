import state from '../../state'

export default ({ endAnimationFrame }) => () => state.currentAnimationFrame > endAnimationFrame
