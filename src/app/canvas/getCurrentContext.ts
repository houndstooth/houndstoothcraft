import * as from from '../../from'
import { state } from '../../state'
import { Context } from '../dom'

const getCurrentContext: () => Context =
	(): Context => state.contexts[ from.Layer(state.currentLayer) ]

export default getCurrentContext
