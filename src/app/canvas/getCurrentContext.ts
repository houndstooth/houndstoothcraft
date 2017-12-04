import * as from from '../../from'
import { state } from '../../state'
import { Context } from '../dom'

const getCurrentContext: () => Context =
	(): Context => state.canvas.contexts[ from.Layer(state.execute.currentLayer) ]

export default getCurrentContext
