import state from '../../state'

const getCurrentContext = () => state.contexts[ state.currentLayer ]

export default getCurrentContext
