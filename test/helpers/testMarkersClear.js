import testContext from './testMarkersContext'
import settingsUtilities from '../../src/utilities/settingsUtilities'
import settingsPaths from '../../src/state/settingsPaths'

export default () => {
	const canvasSize = settingsUtilities.getFromBuiltPatternOrDefault(settingsPaths.CANVAS_SIZE)
	testContext.clearRect(0, 0, canvasSize, canvasSize)
}
