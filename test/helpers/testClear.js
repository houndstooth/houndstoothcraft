import testContext from './testContext'
import { CANVAS_SIZE } from '../../src/defaults'

export default () => {
	const canvasSize = current.settings.initial.viewSettings && current.settings.initial.viewSettings.canvasSize || CANVAS_SIZE
	testContext.clearRect(0, 0, canvasSize, canvasSize)
}
