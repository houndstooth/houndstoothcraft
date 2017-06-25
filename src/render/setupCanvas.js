import state from '../state/state'
import canvas from './canvas'

export default () => {
	const canvasSize = state.viewConfig && state.viewConfig.canvasSize || 800
	canvas.width = canvasSize
	canvas.height = canvasSize
}
