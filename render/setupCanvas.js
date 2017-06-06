import state from '../state/state'
import canvas from './canvas'

export default () => {
	const canvasSize = state.viewConfig.canvasSize
	canvas.width = canvasSize
	canvas.height = canvasSize
}
