import canvas from './canvas'

export default () => {
	const canvasSize = currentState.builtPattern.base.viewSettings.canvasSize
	canvas.width = canvasSize
	canvas.height = canvasSize
}
