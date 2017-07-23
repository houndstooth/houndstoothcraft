import testContext from './testMarkersContext'
import stateUtilities from '../../../src/utilities/stateUtilities'
import settingsPaths from '../../helpers/settingsPaths'
import getFromBasePatternOrDefault from '../../helpers/getFromBasePatternOrDefault'

export default () => {
	const canvasSize = getFromBasePatternOrDefault(settingsPaths.CANVAS_SIZE)
	testContext.clearRect(0, 0, canvasSize, canvasSize)
}
