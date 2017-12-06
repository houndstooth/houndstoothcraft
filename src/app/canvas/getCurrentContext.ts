import { from } from '../../utilities'
import { Context } from '../dom'
import { state } from '../state'

const getCurrentContext: () => Context =
	(): Context => state.canvas.contexts[ from.Layer(state.execute.currentLayer) ]

export default getCurrentContext
