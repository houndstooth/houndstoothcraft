import canvas from './canvas'

export default () => {
	const canvasSize = current.settings.initial.viewSettings.canvasSize
	canvas.width = canvasSize
	canvas.height = canvasSize
}
