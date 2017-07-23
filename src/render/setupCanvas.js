import canvas from './canvas'
import stateUtilities from '../utilities/stateUtilities'
import settingsPaths from '../state/settingsPaths'

export default () => {
	const canvasSize = stateUtilities.getFromMainHoundstoothOrDefault(settingsPaths.CANVAS_SIZE)
	canvas.width = canvasSize
	canvas.height = canvasSize
}
