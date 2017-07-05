import ctx from './ctx'
import { CANVAS_SIZE } from '../defaults'

export default () => {
	const canvasSize = current.settings.initial.viewSettings && current.settings.initial.viewSettings.canvasSize || CANVAS_SIZE
	ctx.clearRect(0, 0, canvasSize, canvasSize)
}
