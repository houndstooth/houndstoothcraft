import state from '../../state'
import canvas from './canvas'

export default () => {
	const canvasSize = state.shared.canvasSize
	canvas.width = canvasSize
	canvas.height = canvasSize
}