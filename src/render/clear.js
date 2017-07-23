import context from './context'
import stateUtilities from '../utilities/stateUtilities'
import settingsPaths from '../state/settingsPaths'

export default () => {
	const canvasSize = stateUtilities.getFromMainHoundstoothOrDefault(settingsPaths.CANVAS_SIZE)
	context.clearRect(0, 0, canvasSize, canvasSize)
}
