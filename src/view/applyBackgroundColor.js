import render from '../render'
import state from '../../state'
import display from '../display'

export default () => {
	const colorSettings = state.mainHoundstooth.basePattern.colorSettings
	const backgroundColor = colorSettings && colorSettings.backgroundColor
	if (!backgroundColor) return

	const canvasSize = display.getCanvasSize()

	const context = display.getCurrentContext()
	context.fillStyle = render.parseColor(backgroundColor)
	context.fillRect(0, 0, canvasSize[ 0 ], canvasSize[ 1 ])
}
