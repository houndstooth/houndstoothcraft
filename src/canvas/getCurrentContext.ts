import * as from from '../from'
import { Context } from '../page'
import { state } from '../state'

const getCurrentContext: () => Context = () => state.contexts[ from.Layer(state.currentLayer) ]

export { getCurrentContext }
