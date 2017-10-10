import state from '../state'

const getCurrentContext: { (): any } = () => state.contexts[ state.currentLayer ]

export default getCurrentContext
