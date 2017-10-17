import { Context } from '../page'
import state from '../state'

const getCurrentContext: { (): Context } = () => state.contexts[ state.currentLayer ]

export default getCurrentContext
