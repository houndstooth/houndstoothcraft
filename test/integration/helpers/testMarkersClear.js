import testContext from './testMarkersContext'
import stateUtilities from '../../../src/utilities/stateUtilities'
import settingsPaths from '../../../src/state/settingsPaths'

export default () => {
	const canvasSize = stateUtilities.getFromBuiltPatternOrDefault(settingsPaths.CANVAS_SIZE)
	testContext.clearRect(0, 0, canvasSize, canvasSize)
}
