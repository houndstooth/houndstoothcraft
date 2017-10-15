import state from '../state'
import { Context } from '../page'

const getCurrentContext: { (): Context } = () => state.contexts[ state.currentLayer ]

export default getCurrentContext
