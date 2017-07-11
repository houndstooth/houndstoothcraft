import testCtx from './testCtx'
import { CANVAS_SIZE } from '../../src/defaults'

export default () => {
	const canvasSize = current.settings.initial.viewSettings && current.settings.initial.viewSettings.canvasSize || CANVAS_SIZE
	testCtx.clearRect(0, 0, canvasSize, canvasSize)
}
