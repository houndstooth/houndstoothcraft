import state from '../state/state'
import canvas from './canvas'

export default () => {
	const canvasSize = state.canvasSize
	canvas.width = canvasSize
	canvas.height = canvasSize
}