import { from } from '../../utilities'
import { appState } from '../appState'

const getCurrentContext: () => CanvasRenderingContext2D =
	(): CanvasRenderingContext2D => appState.canvas.contexts[ from.Layer(appState.execute.currentLayer) ]

export default getCurrentContext
