import context from './context'
import { CANVAS_SIZE } from '../defaults'

export default () => {
	const canvasSize = current.settings.initial.viewSettings && current.settings.initial.viewSettings.canvasSize || CANVAS_SIZE
	context.clearRect(0, 0, canvasSize, canvasSize)
}
