import canvas from './canvas'
import { CANVAS_SIZE } from '../defaults'

export default () => {
	const canvasSize = state.viewConfig && state.viewConfig.canvasSize || CANVAS_SIZE
	canvas.width = canvasSize
	canvas.height = canvasSize
}
