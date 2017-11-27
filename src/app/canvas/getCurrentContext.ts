import * as from from '../../from'
import { state } from '../../state'
import { Context } from '../page'

const getCurrentContext: () => Context =
	(): Context => state.contexts[ from.Layer(state.currentLayer) ]

export default getCurrentContext
