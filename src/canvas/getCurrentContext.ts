import { Context } from '../page'
import { state } from '../state'
import * as from from '../utilities/from'

const getCurrentContext: () => Context =
	(): Context => state.contexts[ from.Layer(state.currentLayer) ]

export { getCurrentContext }
