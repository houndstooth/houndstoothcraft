import canvas from './canvas'

export default () => {
	const canvasSize = currentState.settings.base.viewSettings.canvasSize
	canvas.width = canvasSize
	canvas.height = canvasSize
}
