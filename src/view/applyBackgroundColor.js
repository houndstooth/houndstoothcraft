import render from '../render'
import state from '../../state'
import canvas from '../canvas'

export default () => {
	const colorSettings = state.mainHoundstooth.basePattern.colorSettings
	const backgroundColor = colorSettings && colorSettings.backgroundColor
	if (!backgroundColor) return

	const canvasSize = canvas.getCanvasSize()

	const context = canvas.getCurrentContext()
	context.fillStyle = render.parseColor(backgroundColor)
	context.fillRect(0, 0, canvasSize[ 0 ], canvasSize[ 1 ])
}
