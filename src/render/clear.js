import context from './context'
import settingsUtilities from '../utilities/settingsUtilities'
import settingsPaths from '../state/settingsPaths'

export default () => {
	const canvasSize = settingsUtilities.getFromSettingsOrDefault(settingsPaths.CANVAS_SIZE)
	context.clearRect(0, 0, canvasSize, canvasSize)
}
