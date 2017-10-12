import state from '../state'

const getCurrentContext: { (): CanvasRenderingContext2D } = () => state.contexts[ state.currentLayer ]

export default getCurrentContext
