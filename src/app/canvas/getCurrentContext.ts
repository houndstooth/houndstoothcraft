import { from } from '../../utilities'
import { appState } from '../appState'
import { Context } from '../dom'

const getCurrentContext: () => Context =
	(): Context => appState.canvas.contexts[ from.Layer(appState.execute.currentLayer) ]

export default getCurrentContext
