import testContext from './testMarkersContext'
import settingsUtilities from '../../src/utilities/settingsUtilities'
import settingsPaths from '../../src/settings/settingsPaths'

export default () => {
	const canvasSize = settingsUtilities.getFromSettingsOrDefault(settingsPaths.CANVAS_SIZE)
	testContext.clearRect(0, 0, canvasSize, canvasSize)
}
